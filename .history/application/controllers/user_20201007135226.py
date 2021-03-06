from gatco.response import json, text
from application.server import app
from application.database import db
from application.extensions import auth

from application.models.model import User, Role

@app.route("/user_test")
async def user_test(request):
    return text("user_test api")

# @app.route("/user/login", methods=["POST", "GET"])
# async def user_login(request):
#     param = request.json
#     user_name = param.get("user_name")
#     password = param.get("password")
#     print(user_name, password)
#     if (user_name is not None) and (password is not None):
#         user = db.session.query(User).filter(User.user_name == user_name).first()
#         if (user is not None) and auth.verify_password(password, user.password, user.salt):
#             auth.login_user(request, user)
#             return json({"id": user.id, "user_name": user.user_name, "full_name": user.full_name})
#         return json({"error_code":"LOGIN_FAILED","error_message":"user does not exist or incorrect password"}, status=520)
#
#     else:
#         return json({"error_code": "PARAM_ERROR", "error_message": "param error"}, status=520)
#     return text("user_login api")
#
# @app.route("/user/logout", methods=["GET"])
# async def user_logout(request):
#     auth.logout_user(request)
#     return json({})

@app.route("/user/login", methods=["POST", "GET"])
async def user_login(request):
    param = request.json
    user_name = param.get("user_name")
    password = param.get("password")
    print(user_name, password)
    if (user_name is not None) and (password is not None):
        user = db.session.query(User).filter(User.user_name == user_name).first()
        if (user is not None) and auth.verify_password(password, user.password, user.salt):
            auth.login_user(request, user)
            return json({"id": user.id, "user_name": user.user_name})
        return json({"error_code":"LOGIN_FAILED","error_message":"user does not exist or incorrect password"}, status=520)

    else:
        return json({"error_code": "PARAM_ERROR", "error_message": "param error"}, status=520)
    return text("user_login api")

@app.route("/user/logout", methods=["GET"])
async def user_logout(request):
    auth.logout_user(request)
    return text("user_logout api")

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