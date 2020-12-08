import uuid
from datetime import datetime
from gatco.response import json, text
from application.server import app
from application.extensions import apimanager
from application.models.model_plan import Settlement, SettlementBrazier
from application.extensions import auth
from gatco.exceptions import ServerError
from gatco_apimanager.views.sqlalchemy.helpers import to_dict


def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass

apimanager.create_api(collection_name='settlement', model=Settlement,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )
