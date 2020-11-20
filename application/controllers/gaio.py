from application.extensions import apimanager
from application.models.model import User, GAIO
from application.extensions import auth
from gatco.exceptions import ServerError

def auth_func(request=None, **kw):
    pass

apimanager.create_api(collection_name='gaio', model=GAIO,
                      methods=['GET', 'POST', 'DELETE', 'PUT'],
                      url_prefix='/api/v1',
                      preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )




