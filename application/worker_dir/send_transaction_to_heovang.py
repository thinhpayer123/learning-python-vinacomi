import aiohttp
from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction, Order
from application.extensions import auth
from gatco.exceptions import ServerError
# from application.extensions import scheduler
# import json
from application.database import db, redisdb
# from sanic_scheduler import task
from gatco.response import json
import sqlalchemy
from application.server import app
import ujson
import random
import string
import traceback
from datetime import datetime, timedelta
import datetime, time
import hashlib

async def send_transaction():
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
        
        tran_id = transaction.tran_id
        membercard_id = transaction.membercard_id
        from_wallet_id = transaction.from_wallet_id
        to_wallet_id   = transaction.to_wallet_id
        main_value = transaction.main_value
        sub_value = 0
        value = main_value + sub_value
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
                        transaction.trans_hash_icanteen = transaction.transaction_hash
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
                    else:
                        print("ihub_transaction_hash is None ")    
                else:
                    print("response ihub status: ", response.status)

    db.session.commit()
    print("transaction save successfully",list_change_transaction)

    return  list_change_transaction;
@app.route('/api/v1/check_transaction_exist', methods=['GET'])
async def check_transaction_exist(request):
    
    if request.method == 'GET':
        list_trand_id = []
        transactions = db.session.query(Transaction).all()
        for transaction in transactions:
            tran_id = transaction.tran_id
            date = transaction.created_at # datetime.datetime 
            # print(date.tzinfo)
            print(date)

            datecheck = date.strftime('%m/%d/%y')
            datesent = int(time.mktime(datetime.datetime.strptime(datecheck, "%m/%d/%y").timetuple())) -25200
            print(tran_id,datesent)
            print(datesent, type(datesent))
            url = app.config.get("GET_SALE_MANAGER") + "/api/v1/partners/get-sales"
            private_key = app.config.get("ACCESS_PRIVATE_KEY_SALE_MANAGER_ITEM")
            access_token = app.config.get("ACCESS_TOKEN_SALE_MANAGER_ITEM")
            key = access_token + private_key 
            secret_key  = hashlib.md5(key.encode())
            secret_key_sent=  secret_key.hexdigest()


            headers = {
                "access-token": access_token,
                "secret-key": secret_key_sent
            }
            param = {
                # "sale_id": sale_id,
                "brand-id": "BRAND-YHXD" ,
                "tran-date": datesent,
                "sale-id": tran_id
            }
            async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
                async with session.get(url, params=param) as response:
                    print(response.status, await response.text())
                    if response.status == 200:
                        resp = await response.json()
                        data = resp.get("data")
                        if data is None:
                            list_trand_id.append(tran_id)
            # return json({"listran":list_trand_id})


        return json({"listran":list_trand_id})