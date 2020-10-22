from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction
from application.extensions import auth
from gatco.exceptions import ServerError
from application.server import app
from gatco.response import json
from application.database import db,redisdb
from gatco.exceptions import ServerError
from sqlalchemy import create_engine
import os
import random
import string
import aiofiles
import time
from application.config import Config
import psycopg2
config = Config()
import pandas as pd
import xlrd
import qrcode
import shutil
import asyncio
import datetime
import ujson
import hashlib
import requests
import aiohttp
import redis 
# import async


@app.route("/api/v1/add_membercard",methods = ['POST'])
async def add_membercard(request):
    if request.method == 'POST':
        params = request.json
        membercard_id_owner = params.get("membercard_id")
        company_id = params.get("company_id")        
        if company_id is not None:
            company = db.session.query(Company).filter(Company.company_id == company_id).first()
            name_company = company.name
            point_name = company.point_name if company is not None else None

        if membercard_id_owner is not None:
            getWallet_id = db.session.query(MemberCard).filter(MemberCard.membercard_id == membercard_id_owner).first()
            wallet_id = getWallet_id.wallet_id
            wallet_name  = getWallet_id.user_name
            url = app.config.get("HEOVANG_WALLET_API_URL") + "/wallet/api/v1/get_point_balance_by_uid"
            x_wallet_user_token = ''.join(random.choice(string.ascii_letters) for i in range(16))
            headers = {
                "Content-Type": "application/ecmascript",
                "X-WALLET-USER-TOKEN": x_wallet_user_token

            }
            data  = {
                "point_name": point_name,
                "wallet_id": wallet_id
            }
            async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
                async with session.post(url, json=data) as response:
                    print(response.status, await response.text())
                    if response.status == 200:
                        resp = await response.json()
                        #                         {
                        #     "main": 500725000,
                        #     "sub": 0,
                        #     "value": 500725000,
                        #     "main_value": 500725000,
                        #     "sub_value": 0
                        # }
                        value =  resp.get("main")
                        print(value)

        return json({
                    "name_company": name_company,
                    "wallet_id": wallet_id,
                    "wallet_name": wallet_name,
                    "point": value
                })
            # truyen wallet 
        
        
@app.route("/api/v1/add_subcribe", methods =['POST'])
def add_subcribe(request):
    if request.method == 'POST':
        params = request.json
        token = request.args.get("token", None)
        wallet_id = params.get("wallet_id")
        print(token)
        uid = redisdb.get("sessions:"+str(token))
        print(uid, type(uid))
        # user_subcribe = db.session.query(User).filter(User.id == uid).first()
        wallet  = db.session.query(WalletUser).filter(WalletUser.wallet_id == wallet_id).first()
        if wallet is not None: 
            print(uid)
            wallet.relationship = str(uid)
            db.session.commit()
            return json({
                "message":"Đã thêm ví thành công vào tài khoản"
            })
        else:
            return({"ERROR_MASSAGE":"Thêm ví thất bại"})






# @app.route('/api/v1/get_item_by_day', methods=['GET'])
# async def get_all_item_by_day(request):
#     if request.method == 'GET':
#         brand_id = "BRAND-YHXD"
#         trandate = int(datetime.datetime.strptime(time.strftime('%m/%d/%Y'), '%m/%d/%Y').strftime("%s"))
#         print(brand_id,trandate)
#         url = app.config.get("GET_SALE_MANAGER") + "/api/v1/partners/get-sales"
#         private_key = app.config.get("ACCESS_PRIVATE_KEY_SALE_MANAGER_ITEM")
#         access_token = app.config.get("ACCESS_TOKEN_SALE_MANAGER_ITEM")
#         key = access_token + private_key 
#         secret_key  = hashlib.md5(key.encode())
#         secret_key_sent=  secret_key.hexdigest()


#         headers = {
#             "access-token": access_token,
#             "secret-key": secret_key_sent
#         }
#         param = {
#             # "sale_id": sale_id,
#             "brand-id": brand_id ,
#             "tran-date": trandate
#         }
#         async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
#             async with session.get(url, params=param) as response:
#                 print(response.status, await response.text())
#                 if response.status == 200:
#                     resp = response.json()
#                     print(resp)
#             return  json({"notify":"success"})



    # {
    #   "id": "8a935478-0c2b-41fb-97a2-a0aae2453e6a",
    #   "created_at": 1603327764,
    #   "updated_at": 1603327764,
    #   "sale_id": "6ZBN9264QMVEHMVIK07K9N", // tran_id trong bang transaction 
    #   "origin_sale_id": "",
    #   "tran_date": 1603299600,
    #   "sale": {
    #     "vat": 0,
    #     "note": "",
    #     "status": 1,
    #     "area_id": null,
    #     "is_temp": null,
    #     "room_id": "",
    #     "sale_id": "6ZBN9264QMVEHMVIK07K9N",
    #     "tran_id": "TA",
    #     "tran_no": "S2400004",
    #     "user_id": "SO 2 (S.O)",
    #     "shift_id": "SOO1941919841HMVIL5H6BF",
    #     "store_id": "PVV6ABM1ZEKQ",
    #     "vat_sign": null,
    #     "date_last": 1603299600,
    #     "hour_last": 7,
    #     "sale_sign": null,
    #     "source_id": "10000134",
    #     "tran_date": 1603299600,
    #     "get_amount": 0,
    #     "session_id": 0,
    #     "store_name": "MAYA SCHOOL - THẠCH THẤT",
    #     "customer_id": null,
    #     "device_code": "6ZBN9264QMVE",
    #     "minute_last": 49,
    #     "number_male": null,
    #     "print_count": 0,
    #     "vat_content": null,
    #     "vat_tran_no": null,
    #     "amount_point": 0,
    #     "coupon_count": null,
    #     "last_version": "1.1.12",
    #     "shift_charge": 0,
    #     "source_fb_id": "0",
    #     "station_code": null,
    #     "tran_no_temp": "S2400004",
    #     "vat_tax_code": null,
    #     "coupon_amount": 0,
    #     "exchange_rate": 1,
    #     "membership_id": null,
    #     "number_female": null,
    #     "number_people": 1,
    #     "return_amount": 0,
    #     "store_address": null,
    #     "card_info_code": null,
    #     "deposit_amount": 0,
    #     "discount_extra": 0,
    #     "origin_sale_id": "",
    #     "payment_status": null,
    #     "service_charge": 0,
    #     "store_latitude": null,
    #     "tran_date_orig": 1603299600,
    #     "dinner_table_id": null,
    #     "pr_key_bookings": 0,
    #     "store_longitude": null,
    #     "address_delivery": null,
    #     "currency_type_id": "VND",
    #     "vat_company_name": null,
    #     "membership_id_new": null,
    #     "source_voucher_id": null,
    #     "vat_customer_name": null,
    #     "membership_type_id": "",
    #     "membership_voucher": 0,
    #     "vat_payment_method": null,
    #     "membership_birthday": "",
    #     "vat_customer_address": null,
    #     "amount_discount_extra2": 0
    #   },
    #   "sale_detail": [
    #     {
    #       "fix": 0,
    #       "tax": 0,
    #       "note": "",
    #       "is_fc": 0,
    #       "amount": 25000,
    #       "is_kit": 1,
    #       "is_set": 0,
    #       "number": 1,
    #       "ots_ta": 0,
    #       "is_gift": 0,
    #       "item_id": "CHAO2",
    #       "payment": 0,
    #       "printed": 0,
    #       "sale_id": "6ZBN9264QMVEHMVIK07K9N",
    #       "tran_id": "TA",
    #       "unit_id": "SUAT",
    #       "user_id": "SO 2 (S.O)",
    #       "discount": 0,
    #       "end_date": 1603299600,
    #       "hour_end": 7,
    #       "quantity": 1,
    #       "shift_id": "SOO1941919841HMVIL5H6BF",
    #       "price_org": 25000,
    #       "sale_date": 1603299600,
    #       "cost_price": 0,
    #       "hour_start": 7,
    #       "is_invoice": 1,
    #       "is_service": 0,
    #       "list_order": 0,
    #       "minute_end": 49,
    #       "package_id": "",
    #       "price_sale": 25000,
    #       "description": "Cháo sườn",
    #       "is_eat_with": 0,
    #       "amount_point": 0,
    #       "minute_start": 49,
    #       "payment_type": "HEOVANGSCAN",
    #       "pr_key_order": 0,
    #       "promotion_id": null,
    #       "source_fb_id": "0",
    #       "stop_service": 0,
    #       "printed_label": 0,
    #       "is_print_label": 0,
    #       "parent_item_id": "",
    #       "promotion_name": null,
    #       "sale_detail_id": null,
    #       "temp_calculate": 0,
    #       "item_id_mapping": "",
    #       "quantity_at_temp": 0,
    #       "distribute_discount_extra2": 0
    #     }
    #   ],
    #   "sale_payment_method": [
    #     {
    #       "amount": 25000,
    #       "sale_id": "6ZBN9264QMVEHMVIK07K9N",
    #       "user_id": "SO 2 (S.O)",
    #       "shift_id": "SOO1941919841HMVIL5H6BF",
    #       "trace_no": "6ZBN9264QMVEHMVIK07K9N",
    #       "tran_date": 1603299600,
    #       "tran_hour": 7,
    #       "list_order": 0,
    #       "amount_orig": 25000,
    #       "tran_minute": 49,
    #       "source_fb_id": "0",
    #       "exchange_rate": 1,
    #       "amount_orig_get": 0,
    #       "currency_type_id": "VND",
    #       "payment_method_id": "HEOVANGSCAN",
    #       "amount_orig_return": 0,
    #       "exchange_rate_return": 1,
    #       "sale_payment_method_id": null,
    #       "currency_type_id_return": "VND"
    #     }
    #   ],
    #   "is_web": false,
    #   "is_group_bill": false,
    #   "source_fb_id": "",
    #   "check_sum": "",
    #   "amount_org": 25000,
    #   "amount": 25000,
    #   "amount_discount_price": 0,
    #   "amount_discount_detail": 0,
    #   "amount_discount_extra": 0,
    #   "amount_service_charge": 0,
    #   "amount_vat": 0,
    #   "coupon_amount": 0,
    #   "coupon_amount_paid": 0,
    #   "ship_charge": 0,
    #   "pos_type": "POS_FABI",
    #   "store_id": "PVV6ABM1ZEKQ",
    #   "brand_id": "BRAND-YHXD",
    #   "company_id": "KORJBAZGV629"
    # },


    

