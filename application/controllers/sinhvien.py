from application.extensions import apimanager
from application.models.model import    User, WalletUser , MemberCard
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
            df = pd.DataFrame(data, columns=['company_id', 'student_id', 'student_name', 'birthday', 'gender','email'])
            a =df.get(["company_id", "student_id",'student_name','birthday','gender',]) 
            result = a.to_json(orient='records')
            print(result)
            print('---------------------------------------------')
            result_ujson = ujson.loads(result)
            print(result_ujson)
            print(type(result_ujson))
            for item in result_ujson: 
                user_no = item.get("student_id")
                company_id = item.get("company_id")
                checkexist=db.session.query(WalletUser).filter(WalletUser.user_no == str(user_no)).first()
                print(checkexist)
                if checkexist is None:
                    extra_data = result
                    # print('------------------'+extra_data)
                    extra_data = item
                    user_wallets = WalletUser()
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
@app.route('/api/v1/genqr', methods=['GET' , 'POST'])
async def genqr(request):
    fsroot = config.FS_ROOT
    url = config.FILE_SERVICE_URL
    qr = config.QR_ARCHIVE
    ret = None

    if request.method == 'GET':
        path = request.args.get('')
        
        userWallets = db.session.query(WalletUser).all()
        for user in userWallets:
            info_user = user.extra_data
            student_id = info_user['student_id']

            company_id = info_user['company_id']
            student_name = info_user['student_name']
            birthday = info_user['birthday']
            membercard_id = str(student_id)
            print(membercard_id)
            # status = 1

            img = qrcode.make(membercard_id)

            name_img =    student_name + str(student_id) + '-' +   '.png'
            # draw.text((100, 100), name_img)

            link_img = fsroot + 'qrcode/' + name_img
            img.save(link_img)
            # image.save('greeting_card.png')
            memcard = MemberCard()
            memcard.save_dir =  link_img
            memcard.company_id = company_id
            memcard.user_no = student_id
            memcard.user_name = student_name
            memcard.membercard_id = membercard_id
            # memcard.status = status

            db.session.add(memcard)
            db.session.commit()

        shutil.make_archive(fsroot, 'zip', fsroot, 'qrcode/')
    return json({
        "link": url
    })
