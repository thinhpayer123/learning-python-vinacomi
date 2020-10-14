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
import requests





def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass
apimanager.create_api(collection_name='membercard', model=MemberCard,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )

@app.route('/api/v1/create_wallet_user', methods =['GET', 'POST'])
def create_wallet_user(request):
    userWallet = db.session.query(WalletUser).all()
    for item in userWallet:
        extra_userWallet =  item.extra_data
        dataSent = {}

        dataSent['user_id'] = str(extra_userWallet['student_id'])
        dataSent['company_id'] = extra_userWallet['company_id']
        dataSent['user_fullname'] = extra_userWallet['student_name']
        dataSent['user_token'] = ''.join(random.choice(string.ascii_letters) for i in range(128))
        dataSent['point_name'] = "HEOXU"
        print(ujson.dumps(dataSent))

        url_sent = "https://app.heovang.vn/merchant/api/v1/app_login"
        headers = {'content-type': 'application/json','X-APP-KEY': 'TestCanteenApp'}
        response = requests.post(url_sent,data=ujson.dumps(dataSent), headers = headers)
        # response = {
#     "_id": "wallet_point_HEOXU_AE00651265",
#     "wallet_id": "AE00651265",
#     "wallet_fullname": "",
#     "wallet_phone": null,
#     "point_name": "HEOXU",
#     "point_logo_url": null,
#     "user_id": "TESTID2",
#     "user_fullname": "Test User 1",
#     "role": null,
#     "description": null,
#     "doc_type": "wallet_point",
#     "created_at": 1602101546,
#     "created_by": null,
#     "updated_at": 1602101546,
#     "updated_by": null,
#     "deleted": null,
#     "deleted_by": null,
#     "deleted_at": null,
#     "wallet_type": "user",
#     "app_id": "TestCanteenApp",
#     "company_id": "HEOVANG",
#     "_rev": "1-a73c14404ffb66f41c3b62b0100cc52e",
#     "wallet_token": {
#         "value": "db9de920b51c433682602ff37e9013db"
#     },
#     "points": [
#         "HEOXU"
#     ]
# }

        if response.status_code == 200 :
            data_receiver = response.json()
            # membercard = MemberCard()
            userno = data_receiver['user_id']
            walletid = data_receiver['wallet_id']
            MemberCard.query.filter_by(user_no = userno).update(dict(wallet_id = walletid))
            WalletUser.query.filter_by(user_no = userno).update(dict(wallet_id = walletid))

            # db.session.add(membercard)
            db.session.commit()
        else:
            # response.text()
            pass

        
    return json({"notify":"Get data success.Please reload page."})