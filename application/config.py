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
    FILE_SERVICE_URL = "http://icanteen.vn/static/upload.zip"
    # FILE_SERVICE_URL = "http://icanteen.vn/static/"
    QR_SERVICE_URL = "http://icanteen.vn/"
    QR_ARCHIVE = "static/"
    API_SEND_MAIL = "http://0.0.0.0:8090"
    HEOVANG_WALLET_API_URL = 'https://app.heovang.vn'
    HEOVANG_APP_ID = '2fb7a27f-ccda-4855-be02-9dd31bb6acf6'
    HEOVANG_APP_SECRET = 'ipostest123456abcA'