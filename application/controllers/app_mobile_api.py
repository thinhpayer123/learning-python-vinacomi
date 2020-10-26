from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction, Order
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
        token = request.headers.get("token")
        wallet_id = params.get("wallet_id")
        print(token)
        uid = redisdb.get("sessions:"+str(token))
        print(uid, type(uid))
        # user_subcribe = db.session.query(User).filter(User.id == uid).first()
        wallet  = db.session.query(WalletUser).filter(WalletUser.wallet_id == wallet_id).first()
        if wallet is not None: 
            print(uid)
            uuid = uid.decode("utf-8")
            print(uuid)
            wallet.relationship = uid.decode("utf-8")
            db.session.commit()
            return json({
                "message":"Đã thêm ví thành công vào tài khoản"
            })
        else:
            return({"error_massage":"Thêm ví thất bại"})

@app.route("/api/v1/list_wallet_subcriber", methods=['GET'])
async def list_wallet_subcriber(request):
    if request.method == 'GET':
        token = request.headers.get("token")
        uid = redisdb.get("sessions:"+str(token))
        listwallets  = db.session.query(WalletUser).filter(WalletUser.relationship == uid.decode("utf-8")).all()
        listcard= []
        for listwallet in listwallets:
            company_id = listwallet.company_id
            print(listwallet)
            if company_id is not None:
                company = db.session.query(Company).filter(Company.company_id == company_id).first()
                name_company = company.name
                point_name = company.point_name if company is not None else None

            wallet_id = listwallet.wallet_id
            checkwalletname = db.session.query(MemberCard).filter(MemberCard.wallet_id == wallet_id).first()
            wallet_name = checkwalletname.user_name  
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
                        value =  resp.get("main")
                        print(value)
            datasent = {
                    "name_company": name_company,
                    "wallet_id": wallet_id,
                    "wallet_name": wallet_name,
                    "point": value
            }
            listcard.append(datasent)
            return json({
                "list_card_subcriber": listcard
            }, status=200)


@app.route("/api/v1/transaction_history", methods=['POST'])
def transaction_history(request):
    if request.method == 'POST':
    #    data = {
    #         "date": "",
    #          "wallet_id":"wallet_id"
    #     }
        list_order = []
        params = request.json
        datecheck = params.get("date")
        wallet_id = params.get("wallet_id")
        if datecheck is None:
            if wallet_id is not None: 
                orders = db.session.query(Order).filter(Order.wallet_id == wallet_id).all()
                for order in orders:
                    wallet = order.wallet_id 
                    trans_date = order.tran_date
                    payment = order.total_amount
                    tran_id = order.tran_id
                
                    data = {
                        "transaction_date": trans_date,
                        "wallet": wallet,
                        "total_amount": payment,
                        "transaction_id": tran_id
                    }    
                    list_order.append(data)    
                datasent = {
                        "data": list_order,
                        "wallet_id": wallet_id
                    }
                return json({"data":datasent})
            else:
                return ({"ERROR_MESSAGE":"KHÔNG TÌM THẤY GIAO DỊCH"})
        else:
            orders_by_times = db.session.query(Order).filter(Order.wallet_id == wallet_id).filter(Order.tran_date == datecheck).all()
            if orders_by_times is not None:
                for orders_by_time in orders_by_times:
                    wallet = orders_by_time.wallet_id 
                    trans_date = orders_by_time.tran_date
                    payment = orders_by_time.total_amount
                    tran_id = orders_by_time.tran_id
                    data = {
                        "transaction_date": trans_date,
                        "wallet": wallet,
                        "total_amount": payment, 
                        "transaction_id": tran_id
                    }    
                    list_order.append(data)

                return json({"data":list_order})
            else:
                return json({"MESSAGE":"Không có giao dịch thời gian này."})
    return json({"ERROR_MESSAGE":"UNKNOWN_ERROR"},status=520)



@app.route('/api/v1/details_transaction', methods=['POST'])
async def details_transaction(request):
    if request.method == 'POST':
        params = request.json
        transaction_id = params.get("transaction_id")
        trandate = params.get("trans_id")
        brand_id = "BRAND-YHXD"
        # trandate = int(datetime.datetime.strptime(time.strftime('%m/%d/%Y'), '%m/%d/%Y').strftime("%s"))
        print(brand_id,trandate)
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
            "brand-id": brand_id ,
            "tran-date": trandate,
            "sale-id": transaction_id
        }
        async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
            async with session.get(url, params=param) as response:
                print(response.status, await response.text())
                if response.status == 200:
                    resp = response.json()
                    #################################
                    #           Debugging           # 
                    #################################   
                    print(resp)
            return  json({"notify":"success"})
            