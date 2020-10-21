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


def send_transaction():
    url = app.config.get("HEOVANG_WALLET_API_URL") + "/wallet/api/v1/privilege_send_point_transaction"
    app_id = app.config.get("HEOVANG_APP_ID")
    # app_secret = app.config.get("HEOVANG_APP_SECRET")
    transactions = db.session.query(Transaction).filter(Transaction.status_worker == "PENDING").all()
    list_change_transaction = []
    for transaction in transactions:
        company_id = transaction.company_id
        brand_id = transaction.brand_id
        store_id = transaction.store_id
        if company_id is not None:
                company = Company.query.filter(Company.company_id == company_id).first()
                point_name = company.point_name if company is not None else None
        print(company_id)
        print(point_name)
        # if company_id is not None:
        #     brand = db.session.query(Brand).filter(Brand.company_id== company_id).first()
        #     brand_id = brand.brand_id
        # if brand_id is not None:
        # store = db.session.query(Store).filter(Store.brand_id == brand_id).first()
        #     store_id = store.store_id
        # store_name = store.store_name
        tran_id = transaction.tran_id
        membercard_id = transaction.membercard_id
        from_wallet_id = transaction.from_wallet_id
        to_wallet_id   = transaction.to_wallet_id
        # app_id = 
        main_value = transaction.main_value
        # print("==========="+type(main_value))
        sub_value = 0
        value = main_value + sub_value
        # point_name = point_name
        data = {
            "from": from_wallet_id,
            "to": to_wallet_id,
            "point_name": point_name,
            "company_id": company_id,
            "app_id" : app_id,
            "value": main_value,
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
                "value": value,
                "point_name": point_name,
                "tran_id": tran_id,
                "message": "Thanh toán đơn hàng " + str(tran_id) + " tại địa điểm "
            }
        }

        headers = {
            "Content-Type": "application/json",
        }
        # print(data)
        # print("param data", param)
        async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
            async with session.post(url, json=data) as response:
                # print(response.status, await response.text())
                if response.status == 200:
                    resp = await response.json()
                    ihub_transaction_hash = resp.get("transaction_hash")
                    if ihub_transaction_hash is not None:
                        # icanteen_transaction_hash = transaction.transaction_hash
                        transaction.transaction_hash = ihub_transaction_hash
                        transaction.status_worker = "DONE"
                        list_change_transaction.append({ "icanteen_transaction_hash": transaction.transaction_hash,
                                                        "ihub_transaction_hash":ihub_transaction_hash,
                                                        "pos_parent": brand_id,
                                                        "pos_id": store_id,
                                                        "user_code": membercard_id,
                                                        "state": "SUCCESS",
                                                        "response_message": "Thành công",
                                                        "tran_id": tran_id,
                                                        "paid_amount": value,
                                                        "paid_discount": 0
                                                        })

                        # transaction_hash = ''.join(random.choice(string.ascii_letters) for i in range(16))

                        

                        # resp_data_json = ujson.loads(resp_data)
                        # print(resp_data_json + type(resp_data_json))
                        #luu lai don vao bang transaction 
                        # charge_historys = resp_data.get("charge_history")
                        # print(charge_historys)
                        # db.session.query(Transaction).with_for_update(nowait=True, of=User)

                        # update_trans = db.session.query(Transaction).filter(Transaction.transaction_hash == icanteen_transaction_hash ).first()
                        # this row is now locked

                        # db.session.add(update_trans)
                        
                    # else:

    db.session.commit()
    print("transaction save successfully")
    return  list_change_transaction;

# def init_schedulers(app):
#     @task(timedelta(seconds=100000000000))
#     async def notify(app):
#         print("notify init_schedulers")
#         try:
#             send_transaction()
#         except Exception:
#             exept_txt = traceback.format_exc()
#             print("exept_txt", exept_txt)
