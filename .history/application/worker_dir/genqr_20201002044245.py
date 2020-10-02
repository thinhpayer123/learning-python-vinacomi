import uuid
import time
import re
import ujson
from datetime import datetime, timedelta
from sqlalchemy import desc
from application.database import db
from application.models.model import QRworker,QRUser
import pandas as pd
from sqlalchemy import create_engine
from application.config import Config
import psycopg2
import qrcode
import shutil
from sqlalchemy.orm import Session

config = Config()

def process_data():
    pass
def do_work(from_time, to_time, id):
    fsroot = config.FS_ROOT
    url = config.FILE_SERVICE_URL

    print(id)
    if id is None:
        while True:
        # apps = QRworker.query.all()
        # print(apps)
            try:
                q = db.session.query(QRworker).with_for_update(nowait=True, of=QRworker)
                job = db.session.query(QRworker).filter(QRworker.status == "PENDING").with_for_update().first()

        # this row is now locked

                job.status = "PROCESSING"

                db.session.commit()


        # # while True:
        #         link_local = job.saveDirectory
        #         print(link_local)
        #         data = pd.read_excel(link_local)
        #         df = pd.DataFrame(data, columns=['masv', 'tensv', 'malop', 'namsinh', 'gioitinh'])
        #         alchemyEngine = create_engine('postgresql://genqr_user:123456abcA@localhost:5432/genqr', pool_recycle=3600);
        #         postgreSQLConnection = alchemyEngine.connect();
        #         postgreSQLTable = 'sinhvien';
        #         df.to_sql(postgreSQLTable, alchemyEngine, if_exists='append', index=False)
        # # query data and qrcode
                sinhvien = alchemyEngine.execute('SELECT * FROM sinhvien;').fetchall()
            # linkQR = config.QR_ARCHIVE


                for sv in sinhvien:
                    img = qrcode.make(sv.masv + '-' + sv.tensv + '-' + sv.malop + '-' + sv.namsinh + '-' + sv.gioitinh)
                    name_img = sv.masv + '-' + sv.tensv + '-' + sv.malop + '.png'
                    link_img = fsroot + 'qrcode/' + name_img
                    img.save(link_img)
                    qr = QRUser()
                    qr.nameqr = sv.masv + '-' + sv.tensv + '-' + sv.malop
                    qr.saveDirectory = link_img
                    db.session.add(qr)
                    db.session.commit()
                # a_string = str(job.namefile)
                # split_string = a_string.split(".", 1)
                # substring = split_string[0]

                # print(substring)
        # archive (full_duong_dan, kieu nen , thumuc truoc dan , file name)
                shutil.make_archive(fsroot+substring, 'zip', fsroot, 'qrcode/')

        # print(linkQR)
        # print(name_zip)

                ret = {
                    "link": url + substring+'.zip'
                }
                print(ret)
                return json({
                ret
                })
    #             q = db.session.query(QRworker).with_for_update(nowait=True, of=QRworker)

    #             job = db.session.query(QRworker).filter(QRworker.status == "PROCESSING").with_for_update().first()
    # # this row is now locked

    #             job.status = "SUCCESS"
    #             job.linkdowload = url +substring+'.zip'
    #         # db.session.add(foo)

    #             db.session.commit()
    #         except:
    #             pass
            # print("no status pending")
            # time.sleep(60)

