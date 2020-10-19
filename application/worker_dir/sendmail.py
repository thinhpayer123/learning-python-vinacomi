import copy
import email
import smtplib
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from application.server import app
from gatco.response import json, text, html
from application.config import Config
config = Config()
import os
import random
import string
import aiofiles
import time
MAIL_LIST = [
    {
        "id": "trunganhact@gmail.com",
        "password": "Abc@1234"
    }
]
MAIL_LIST_TMP = []
@app.route('/api/email/send', methods=["POST", "OPTIONS"])
async def send_mail(request):
    global MAIL_LIST
    global MAIL_LIST_TMP
    data = request.json
    message = data.get('message', None)
    body_html = data.get('body_html', None)
    msg = MIMEMultipart()
    # setup the parameters of the message
    receiver = ''
    if 'to' in data and isinstance(data['to'], list):
        i = 0
        for _ in data['to']:
            if i == 0:
                receiver += _
            else:
                receiver += "," + _
            i += 1
    else:
        receiver = data['to']
    if receiver is None or receiver == '':
        return json({
            "ok": False,
            "error_code": "PARAMS_ERROR",
            "error_message": "Unknown Receiver"
        }, status=520)
    fromId = None
    password = None
    if data.get('from', None) is not None and data["from"].get('id', None) is not None:
        fromId = data["from"]["id"]
        if data.get('from', None) is not None and data["from"].get('password', None) is not None:
            password = data["from"]["password"]
    if fromId is None and password is None:
        if len(MAIL_LIST_TMP) == 0:
            MAIL_LIST_TMP = copy.deepcopy(MAIL_LIST)
            used_mail = MAIL_LIST_TMP.pop(0)
            fromId = used_mail.get('id', None)
            password = used_mail.get('password', None)
        elif fromId is None or fromId == '' or password is None or password == '':
            return json({
                "ok": False,
                "error_code": "PARAMS_ERROR",
                "error_message": "Email ID & password must be required"
            }, status=520)
        msg['From'] = fromId
        msg['To'] = receiver
        msg['Subject'] = data["subject"]
        if message is not None:
            msg.attach(MIMEText(message, 'plain'))
        if body_html is not None:
            msg.attach(MIMEText(body_html, 'html'))
        print("msg: ", msg)
        try:
            server = smtplib.SMTP("smtp.gmail.com", 587)
            # server.ehlo()
            server.starttls()
            server.login(msg['From'], password)
            server.sendmail(msg['From'], msg['To'], msg.as_string())
            server.quit()
            print('successfully sent email to %s:" % msg["To"]')
        except:
            return json({
                "ok": False,
                "error_code": 502,
                "error_message": "Send Error"
            })
        return json({
            "ok": True
        })