from gatco.response import json, text
from application.server import app
from application.database import db, redisdb
from application.extensions import auth
from application.extensions import apimanager
# from gatco_restapi.helpers import to_dict
import string
import random
import redis 
import uuid 
import binascii
from application.models.model import User, Role

# from application.models.model import User, Role

def current_user(request):
    user_id = auth.current_user(request)
    if user_id is not None:
        user = db.session.query(User).filter(User.id == user_id).first()
        return user
    return None

def generate_user_token(uid, expire_time=86400):
    token = binascii.hexlify(uuid.uuid4().bytes).decode()
    session_key = "sessions:" + token
    redisdb.set(session_key, str(uid), ex=expire_time)
    return token

@app.route("/user/login", methods=["POST"])
async def user_login(request):
    param = request.json
    user_name = param.get("user_name")
    password = param.get("password")
    expire_time = request.args.get("expire_time")
    print(user_name, password)
    # token = ''
    if (user_name is not None) and (password is not None):
        user = db.session.query(User).filter(User.user_name == user_name).first()
        if (user is not None) and auth.verify_password(password, user.password, user.salt):
            auth.login_user(request, user)
            dict_user = {"id": user.id, "user_name": user.user_name}
            dict_user["token"] = generate_user_token(dict_user['id'], expire_time)

            dict_user["fullname"] = user.full_name

            return json(dict_user)
        return json({"error_code":"LOGIN_FAILED","error_message":"user does not exist or incorrect password"}, status=520)

    else:
        return json({"error_code": "PARAM_ERROR", "error_message": "param error"}, status=520)
    return text("user_login api")

@app.route("/user/logout", methods=["GET"])
async def user_logout(request):
    auth.logout_user(request)
    return json({})

@app.route("/user/current_user", methods=["GET"])
async def user_current_user(request):
    user_id = auth.current_user(request)
    if user_id is not None:
        user = db.session.query(User).filter(User.id == user_id).first()
        return json({"id": user.id, "user_name": user.user_name})
    return text("current_user")


def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass
apimanager.create_api(collection_name='users', model=User,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )