import aiohttp
from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction, Order
from application.extensions import auth
from gatco.exceptions import ServerError
# from application.extensions import scheduler
# import json
from application.database import db, redisdb
# from sanic_scheduler import task
from gatco.response import json
import sqlalchemy
from application.server import app
import ujson
import random
import string
import traceback
from datetime import datetime, timedelta
async def fix_username_trans():
    transactions = db.session.query(Transaction).all()
    listwallet_id =[]
    
    if transactions is not None:
        for transaction in transactions:
            wallet_id = transaction.from_wallet_id
            name_userfix = db.session.query(MemberCard).filter(MemberCard.wallet_id == wallet_id).first()
            if name_userfix is not None:
                transaction.username = name_userfix.user_name
                transaction.status_worker = "PENDING"
            
        db.session.commit()
    return(listwallet_id)
