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
    # current_user = auth.current_user(request)
    # current_info = db.session.query(User).filter(User.id == current_user).first()
    # print(current_info)
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
        r = requests.post(url_sent,data=ujson.dumps(dataSent), headers = headers)

        
    return json({"r":"r"})