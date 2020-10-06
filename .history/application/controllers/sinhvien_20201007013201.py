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
            print(data)
            df = pd.DataFrame(data, columns=['student_school_year', 'student_class', 'student_id', 'student_name', 'birthday', 'gender','email'])
            # print('122112'+df)
            # company_id =  request.args.get("company_id")
            # company_id = 'TEST'
            # print(company_id)
            # result = []
            # a =df.get(["student_school_year", "student_class", "student_id",'student_name','birthday','gender','email']) 
            result = df.to_json(orient='records')
            result_ujson = ujson.loads(result)
            print(result_ujson)
            item_result = []
            current_user_id = auth.current_user(request)
            user_info =  db.session.query(User).filter(User.id == current_user_id).first()
            # company_id = 
            print(user_info.company_id)
            for item in result_ujson: 

                user_no = item.get("student_id",{})
                # extra_data = item
                
                print(extra_data+'12221')
                new_entry = UserWallet(user_no=user_no,\
                               company_id=company_id,\
                               extra_data=extra_data)

                item_result.append(new_entry)
            print(item_result)

            db.session.add_all(item_result)
            db.session.commit()
            




            




            
            # print(result)
            # q = db.session.query(User).with_for_update(nowait=Tre, of=User)
            # user_name = 
            # full_name
            # email
            # companyid


            


#             alchemyEngine = create_engine('postgresql://icangteen_user:123456abcA@localhost:5432/icangteen', pool_recycle=3600);
#             postgreSQLConnection = alchemyEngine.connect();
#             postgreSQLTable = 'student';
#             df.to_sql(postgreSQLTable, alchemyEngine, if_exists='append', index=False)
# #


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
    if request.method == 'POST':
        path = request.args.get('')
        
        userWallets = db.session.query(UserWallet).all()
        for user in userWallets:
            # format_data = ujson.loads
            info_user = user.extra_data
            print(info_user)
            if info_user is None:
                return json({"a":"aaaaa"})
            else:
                current_user_id = auth.current_user(request)
                user_info =  db.session.query(User).filter(User.id == current_user_id).first()
                company_id = user_info.company_id
                # membercard_id = company_id+


                student_id = info_user['student_id']
                print(student_id)
                print(type(student_id))
                student_school_year = info_user['student_school_year']
                student_class = info_user['student_class']
                student_name = info_user['student_name']
                birthday = info_user['birthday']
                membercard_id = company_id + random.choice('122esadasdaqfdada')
                wallet_id = '123456'
                status = 'active'


                img = qrcode.make(str(student_school_year) + '-' + str(student_class) + '-' + str(student_id) + '-' + str(student_name) + '-' + str(birthday))
                name_img =  student_class + '-' +  student_id + '-' +  student_name + '.png'
                link_img = fsroot + 'qrcode/' + name_img
                img.save(link_img)
                memcard = MemberCard()
                # qr.nameqr =  student_class + '-' +  student_id + '-' +  student_name
                membercard.company_id = company_id
                memcard.student_id = student_id
                memcard.membercard_id = membercard_id
                memcard.wallet_id = wallet_id
                memcard.status = status

                db.session.add(memcard)
                db.session.commit()

            zipfile = shutil.make_archive(fsroot, 'zip', fsroot, 'qrcode/')
            returna = None
            # returna = {
            #     "link": url
            # }
    return json({
        "link": url
    })



# apimanager.create_api(collection_name='qrworker', model=QRworker,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
#     )


