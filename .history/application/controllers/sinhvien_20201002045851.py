from application.extensions import apimanager
from application.models.model import Student, QRUser, QRworker
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
            df = pd.DataFrame(data, columns=['student_school_year', 'student_class', 'student_id', 'student_name', 'birthday', 'gender'])
            print(df)
            alchemyEngine = create_engine('postgresql://icangteen_user:123456abcA@localhost:5432/icangteen', pool_recycle=3600);
            postgreSQLConnection = alchemyEngine.connect();
            postgreSQLTable = 'student';
            df.to_sql(postgreSQLTable, alchemyEngine, if_exists='append', index=False)
#


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

    # print(id)
    if request.method == 'POST':
        path = request.args.get('')
        
        students =Student.query.order_by(Student.id).all()


        for sv in students:
            img = qrcode.make(sv.student_school_year + '-' + sv.student_class + '-' + sv.student_id + '-' + sv.student_name + '-' + sv.birthday)
            name_img = sv.student_class + '-' + sv.student_id + '-' + sv.student_name + '.png'
            link_img+dateime.days = fsroot + 'qrcode/' + name_img
            img.save(link_img)
            qr = QRUser()
            qr.nameqr = sv.student_class + '-' + sv.student_id + '-' + sv.student_name
            qr.saveDirectory = link_img
            db.session.add(qr)
            db.session.commit()

            zipfile = shutil.make_archive(fsroot, 'zip', fsroot, 'qrcode/')

            # print(zipfile)

        ret = {
            "link": url + 
        }
        print(ret)
    return json(ret)




apimanager.create_api(collection_name='qrworker', model=QRworker,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )


