from application.extensions import apimanager
from application.models.model import  QRUser,  User, UserWallet , MemberCard
from application.extensions import auth
from application.database import db
from gatco.exceptions import ServerError
from sqlalchemy import create_engine
import os
import random
import string
import aiofiles
import time
from gatco.response import json
from application.server import app
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

def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    pass


@app.route('/api/v1/file/upload', methods=['GET', 'POST'])
async def file_load(request):
    path = request.args.get("path", None)
    ret = None

    # url_qr = config.QR_SERVICE_URL
    # url = config.FILE_SERVICE_URL
    fsroot = config.FS_ROOT

    if request.method == 'POST':


        file = request.files.get('file', None)
        if file:

            extname = request.files.get('file').name
            if not os.path.exists(fsroot):
                os.makedirs(fsroot)
            subPath = ""
            if path is not None:
                subPath = path + "/"
                if not os.path.exists(fsroot + subPath):
                    os.makedirs(fsroot + subPath)
            async with aiofiles.open(fsroot + subPath + extname, 'wb+') as f:
                await f.write(file.body)
            link_local = fsroot + subPath + extname
            print(link_local)
            data = pd.read_excel(link_local)
            # print(data)
            # df = pd.DataFrame(data, columns=['student_school_year', 'student_class', 'student_id', 'student_name', 'birthday', 'gender','email'])
            df = pd.DataFrame(data, columns=['student_class', 'student_id', 'student_name', 'birthday', 'gender','email'])

            # print('122112'+df)
            # company_id =  request.args.get("company_id")
            # company_id = 'TEST'
            # print(company_id)
            # result = []
            a =df.get(["student_class", "student_id",'student_name','birthday','gender',]) 
            result = a.to_json(orient='records')
            print(result)
            print('---------------------------------------------')
            result_ujson = ujson.loads(result)
            print(result_ujson)
            item_result = []
            current_user_id = auth.current_user(request)
            user_info =  db.session.query(User).filter(User.id == current_user_id).first()
            company_id = user_info.company_id
            # print(user_info.company_id)
            for item in result_ujson: 

                user_no = item.get("student_id",{})
                print(user_no)
                extra_data = result
                print('------------------'+extra_data)
                extra_data = item
                user_wallets = UserWallet()
                user_wallets.user_no = user_no
                user_wallets.company_id = company_id
                user_wallets.extra_data = extra_data
                db.session.add(user_wallets)
                db.session.commit()


            ret = {
                "notify":"upload file success ",
                # "id": id

            }
    return json(ret)
@app.route('/api/v1/Genqr', methods=['GET' , 'POST'])
async def genqr(request):
    fsroot = config.FS_ROOT
    url = config.FILE_SERVICE_URL
    qr = config.QR_ARCHIVE
    ret = None
    # userWallets =[]
    # print(id)
    if request.method == 'GET':
        path = request.args.get('')
        
        userWallets = db.session.query(UserWallet).all()
        for user in userWallets:
            # format_data = ujson.loads
            info_user = user.extra_data
            # print(info_user)
            # print(type(info_user))
            # current_user_id = auth.current_user(request)
            # user_info =  db.session.query(User).filter(User.id == current_user_id).first()
            # company_id = user_info.company_id
            # print(company_id)
                # membercard_id = company_id+

            user_info = ujson.dumps(info_user)
            student_id = info_user['student_id']
            company_id = user_info['company_id']
            # print(student_id)
            # print(type(student_id))
            # student_school_year = info_user['student_school_year']
            # student_class = info_user['student_class']
            student_name = info_user['student_name']
            birthday = info_user['birthday']
            # user_name = info_user['']
            membercard_id = company_id + random.choice('122esadasdaqfdada')+student_id
            wallet_id = '123456'
            status = 1
            # print(student_school_year)
            # print(student_class)
            # print(student_name)
            # print(birthday)
            # print(membercard_id)

            # img = qrcode.make(student_school_year + '-' + student_class + '-' + student_id + '-' + student_name + '-' + birthday)
            img = qrcode.make(student_id + '-' + student_name + '-' + birthday)

            name_img =  company_id + '-' +  student_id + '-' +  student_name + '.png'
            link_img = fsroot + 'qrcode/' + name_img
            img.save(link_img)
            memcard = MemberCard()
            memcard.save_dir =  link_img
            memcard.company_id = company_id
            memcard.user_no = student_id
            memcard.user_name = student_name
            memcard.membercard_id = membercard_id
            memcard.wallet_id = wallet_id
            memcard.status = status

            db.session.add(memcard)
            db.session.commit()

        shutil.make_archive(fsroot, 'zip', fsroot, 'qrcode/')
            # returna = None
            # returna = {
            #     "link": url
            # }
    return json({
        "link": url
    })



