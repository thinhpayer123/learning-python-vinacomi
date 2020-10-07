class Config(object):
    DEBUG = True
    STATIC_URL = "/static"
    SQLALCHEMY_DATABASE_URI = 'postgresql://canteenusr:123456abcA@localhost:5432/canteendb'
    AUTH_LOGIN_ENDPOINT = 'login'
    AUTH_PASSWORD_HASH = 'sha512_crypt'
    AUTH_PASSWORD_SALT = 'ruewhndjsa17heaw'
    SECRET_KEY = 'e2q8dhaushdauwd7qye'
    SESSION_COOKIE_SALT = 'dhuasud819wubadhysagd'

    AUTH_EXPIRE_TIME = 86400
    TOKEN_EXPIRED = 86400

    FS_ROOT = "static/upload/"
    IMAGE_SERVICE_URL = "http://icanteen.vn:8090/static/upload/"
    FILE_SERVICE_URL = "http://icanteen.vn:8090/static/upload.zip"
    QR_SERVICE_URL = "http://icanteen.vn:8090/"
    QR_ARCHIVE = "static/"