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
            print(transaction.from_wallet_id)
            listwallet_id.append(transaction.from_wallet_id)
