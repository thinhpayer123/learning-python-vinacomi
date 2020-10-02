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


                sinhvien = alchemyEngine.execute('SELECT * FROM sinhvien;').fetchall()


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

                shutil.make_archive(fsroot+substring, 'zip', fsroot, 'qrcode/')

                ret = {
                    "link": url + substring+'.zip'
                }
                print(ret)
                return json(ret)


