import aiohttp
from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction, Order
from application.extensions import auth
from gatco.exceptions import ServerError
# from application.extensions import scheduler
# import json
from application.database import db, redisdb
from sanic_scheduler import task
from gatco.response import json
import sqlalchemy
from application.server import app
import ujson
import random
import string
import traceback
from datetime import datetime, timedelta










async def send_transaction():
    url = app.config.get("HEOVANG_WALLET_API_URL") + "/wallet/api/v1/privilege_send_point_transaction"
    app_id = app.config.get("HEOVANG_APP_ID")
    app_secret = app.config.get("HEOVANG_APP_SECRET")
    checkdata = db.session.query(Transaction).filter(Transaction.status_worker == "PENDING").first()
    print(checkdata)
    if checkdata is not None:
        company_id = checkdata.company_id
        brand_id = checkdata.brand_id
        store_id = checkdata.store_id
        if company_id is not None:
                company = Company.query.filter(Company.company_id == company_id).first()
                point_name = company.point_name if company is not None else None
        # if company_id is not None:
        #     brand = db.session.query(Brand).filter(Brand.company_id== company_id).first()
        #     brand_id = brand.brand_id
        # if brand_id is not None:
        # store = db.session.query(Store).filter(Store.brand_id == brand_id).first()
        #     store_id = store.store_id
        # store_name = store.store_name
        tran_id = checkdata.tran_id
        membercard_id = checkdata.membercard_id
        from_wallet_id = checkdata.from_wallet_id
        to_wallet_id   = checkdata.to_wallet_id
        # app_id = 
        main_value = checkdata.main_value
        sub_value = 0 
        value = main_value+ sub_value
        # point_name = point_name
        data = {
            "from": from_wallet_id,
            "to": to_wallet_id,
            "point_name": point_name,
            "company_id": company_id,
            "app_id" : app_id,
            "value": main_value + sub_value,
            "data": {
                "standard": "HEOVANG",
                "type": "payment",
                "from": from_wallet_id,
                "sender": from_wallet_id,
                "to": to_wallet_id,
                "brand_id": brand_id,
                "store_id": str(store_id),
                "main_value": main_value,
                "sub_value": sub_value,
                "value": main_value + sub_value,
                "point_name": point_name,
                "tran_id": tran_id,
                "message": "Thanh toán đơn hàng " + str(tran_id) + " tại địa điểm "
            }
        }


        headers = {
            "Content-Type": "application/json",
        }



        print(data)
        # print("param data", param)
        async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
            async with session.post(url, json=data) as response:
                print(response.status, await response.text())
                if response.status == 200:
                    resp = await response.json()
                    transaction_hash_update = resp.get("transaction_hash")
                    transaction_hash = checkdata.get("transaction_hash")
                    # transaction_hash = ''.join(random.choice(string.ascii_letters) for i in range(16))

                    print("transaction_hash", transaction_hash)

                    resp_data = {
                        "charge_history": {
                            "pos_parent": brand_id,
                            "pos_id": store_id,
                            "user_code": membercard_id,
                            "state": "SUCCESS",
                            "response_message": "Thành công",
                            "tran_id": tran_id,
                            "tran_id_of_parner": transaction_hash_update,
                            "paid_amount": value,
                            "paid_discount": 0
                        }
                    }
                    # resp_data_json = ujson.loads(resp_data)
                    # print(resp_data_json + type(resp_data_json))
                    #luu lai don vao bang transaction 
                    charge_historys = resp_data.get("charge_history")
                    print(charge_historys)
                    # db.session.query(Transaction).with_for_update(nowait=True, of=User)

                    update_trans = db.session.query(Transaction).filter(Transaction.transaction_hash == transaction_hash ).with_for_update().one()
                    # this row is now locked

                    update_trans.transaction_hash = transaction_hash_update
                    update_trans.status_worker = "DONE"
                    db.session.add(update_trans)
                    db.session.commit()
                    print("transac save successfully")

                    return json(resp_data)
                    # else:
                        

# def init_schedulers(app):
#     @task(timedelta(seconds=100000000000))
#     async def notify(app):
#         print("notify init_schedulers")
#         try:
#             send_transaction()
#         except Exception:
#             exept_txt = traceback.format_exc()
#             print("exept_txt", exept_txt)
