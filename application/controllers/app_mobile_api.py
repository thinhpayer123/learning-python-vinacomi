from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction
from application.extensions import auth
from gatco.exceptions import ServerError
from application.server import app
from gatco.response import json
from application.database import db
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




@app.route('/api/v1/get_item_by_day', methods=['GET'])
async def get_all_item_by_day(request):
    if request.method == 'GET':
        brand_id = "BRAND-YHXD"
        trandate = int(datetime.datetime.strptime(time.strftime('%m/%d/%Y'), '%m/%d/%Y').strftime("%s"))
        print(brand_id,trandate)
        url = app.config.get("GET_SALE_MANAGER") + "/api/v1/partners/get-sales"
        private_key = app.config.get("ACCESS_PRIVATE_KEY_SALE_MANAGER_ITEM")
        access_token = app.config.get("ACCESS_TOKEN_SALE_MANAGER_ITEM")
        key = access_token + private_key 
        print(key)
        secret_key  = hashlib.md5(key.encode())
        secret_key_sent=  secret_key.hexdigest()
        print(secret_key_sent)



        headers = {
            "access-token": access_token,
            "secret-key": secret_key_sent
        }
        param = {
            "brand-id": brand_id ,
            "tran-date": trandate
        }
        async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
            async with session.get(url, params=param) as response:
                print(response.status, await response.text())
                if response.status == 200:
                    resp = response.json()
                    print(resp)
            return  json({"notify":"success"})
    


    
# https://apidwtest.ipos.vn/api/v1/partners/get-sales?sale-id=RMYZ8ZKV8YMZ4VR6KH68J2P&brand-id=BRAND-8FDR&tran-date=1603213200

# {
#   "data": {
#     "id": "de07a794-1fb3-4116-8957-8ad3127b0bd9",
#     "created_at": 1603250759,
#     "updated_at": 1603250759,
#     "sale_id": "RMYZ8ZKV8YMZ4VR6KH68J2P",
#     "origin_sale_id": "",
#     "tran_date": 1603213200,
#     "sale": {
#       "vat": 0,
#       "note": "",
#       "status": 1,
#       "area_id": null,
#       "is_temp": null,
#       "room_id": "",
#       "sale_id": "RMYZ8ZKV8YMZ4VR6KH68J2P",
#       "tran_id": "TA",
#       "tran_no": "2100026",
#       "user_id": "Nguyễn Đức Trường",
#       "shift_id": "21194332090HKPUWKP8Z1",
#       "store_id": "93ARMVPE4V20",
#       "vat_sign": null,
#       "date_last": 1603213200,
#       "hour_last": 10,
#       "sale_sign": null,
#       "source_id": "10000171",
#       "tran_date": 1603213200,
#       "get_amount": 39600,
#       "session_id": 0,
#       "store_name": "NDT6896 Brand 1 Store 1 | HN",
#       "customer_id": null,
#       "device_code": "RMYZ8ZKV8YMZ",
#       "minute_last": 25,
#       "number_male": null,
#       "print_count": 0,
#       "vat_content": null,
#       "vat_tran_no": null,
#       "amount_point": 0,
#       "coupon_count": null,
#       "last_version": "1.12.6",
#       "shift_charge": 0,
#       "source_fb_id": "0",
#       "station_code": null,
#       "tran_no_temp": "2100026",
#       "vat_tax_code": null,
#       "coupon_amount": 0,
#       "exchange_rate": 1,
#       "membership_id": null,
#       "number_female": null,
#       "number_people": 1,
#       "return_amount": 0,
#       "store_address": {
#         "store_latitude": 100,
#         "store_longitude": 200
#       },
#       "card_info_code": null,
#       "deposit_amount": 0,
#       "discount_extra": 0,
#       "origin_sale_id": "",
#       "payment_status": null,
#       "service_charge": 0.1,
#       "store_latitude": 100,
#       "tran_date_orig": 1603213200,
#       "dinner_table_id": null,
#       "pr_key_bookings": 0,
#       "store_longitude": 200,
#       "address_delivery": null,
#       "currency_type_id": "VND",
#       "vat_company_name": null,
#       "membership_id_new": null,
#       "source_voucher_id": null,
#       "vat_customer_name": null,
#       "membership_type_id": "",
#       "membership_voucher": 0,
#       "vat_payment_method": null,
#       "membership_birthday": "",
#       "vat_customer_address": null,
#       "amount_discount_extra2": 0
#     },
#     "sale_detail": [
#       {
#         "fix": 0,
#         "tax": 0,
#         "note": "",
#         "is_fc": 0,
#         "amount": 36000,
#         "is_kit": 1,
#         "is_set": 0,
#         "number": 4,
#         "ots_ta": 0,
#         "is_gift": 0,
#         "item_id": "ITEM-MWDE",
#         "payment": 0,
#         "printed": 0,
#         "sale_id": "RMYZ8ZKV8YMZ4VR6KH68J2P",
#         "tran_id": "TA",
#         "unit_id": "MON",
#         "user_id": "Nguyễn Đức Trường",
#         "discount": 0.1,
#         "end_date": 1603213200,
#         "hour_end": 10,
#         "quantity": 4,
#         "shift_id": "21194332090HKPUWKP8Z1",
#         "price_org": 10000,
#         "sale_date": 1603213200,
#         "cost_price": 0,
#         "hour_start": 10,
#         "is_invoice": 1,
#         "is_service": 0,
#         "list_order": 0,
#         "minute_end": 25,
#         "package_id": "",
#         "price_sale": 10000,
#         "description": "Bánh mì 1",
#         "is_eat_with": 0,
#         "amount_point": 0,
#         "minute_start": 25,
#         "payment_type": "COD",
#         "pr_key_order": 0,
#         "promotion_id": "PROMOTION-V2ZN",
#         "source_fb_id": "0",
#         "stop_service": 0,
#         "printed_label": 0,
#         "is_print_label": 0,
#         "parent_item_id": "",
#         "promotion_name": "PROMOTION-V2ZN",
#         "sale_detail_id": null,
#         "temp_calculate": 0,
#         "item_id_mapping": "",
#         "quantity_at_temp": 0,
#         "distribute_discount_extra2": 0
#       }
#     ],
#     "sale_payment_method": [
#       {
#         "amount": 39600,
#         "sale_id": "RMYZ8ZKV8YMZ4VR6KH68J2P",
#         "user_id": "Nguyễn Đức Trường",
#         "shift_id": "21194332090HKPUWKP8Z1",
#         "trace_no": "RMYZ8ZKV8YMZ4VR6KH68J2P",
#         "tran_date": 1603213200,
#         "tran_hour": 10,
#         "list_order": 0,
#         "amount_orig": 39600,
#         "tran_minute": 25,
#         "source_fb_id": "0",
#         "exchange_rate": 1,
#         "amount_orig_get": 39600,
#         "currency_type_id": "VND",
#         "payment_method_id": "COD",
#         "amount_orig_return": 0,
#         "exchange_rate_return": 1,
#         "sale_payment_method_id": null,
#         "currency_type_id_return": "VND"
#       }
#     ],
#     "is_web": false,
#     "is_group_bill": false,
#     "source_fb_id": "",
#     "check_sum": "",
#     "amount_org": 40000,
#     "amount": 39600,
#     "amount_discount_price": 0,
#     "amount_discount_detail": 4000,
#     "amount_discount_extra": 0,
#     "amount_service_charge": 3600,
#     "amount_vat": 0,
#     "coupon_amount": 0,
#     "coupon_amount_paid": 0,
#     "ship_charge": 0,
#     "pos_type": "POS_FABI",
#     "store_id": "93ARMVPE4V20",
#     "brand_id": "BRAND-8FDR",
#     "company_id": "GRWV8ZW2XD0X"
#   }
# }




    
