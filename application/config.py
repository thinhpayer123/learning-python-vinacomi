class Config(object):
    DEBUG = True
<<<<<<< HEAD
    STATIC_URL = "/static"
    SQLALCHEMY_DATABASE_URI = 'postgresql://canteenusr:123456abcA@localhost:5432/canteendb'
=======
    STATIC_URL = "static"
    SQLALCHEMY_DATABASE_URI = 'postgresql://icangteen_user:123456abcA@localhost:5432/icangteen'
>>>>>>> 1e48fad0f2edd1c0ef19b0968f9dd5fed4502a32
    AUTH_LOGIN_ENDPOINT = 'login'
    AUTH_PASSWORD_HASH = 'sha512_crypt'
    AUTH_PASSWORD_SALT = 'ruewhndjsa17heaw'
    SECRET_KEY = 'e2q8dhaushdauwd7qye'
    SESSION_COOKIE_SALT = 'dhuasud819wubadhysagd'
    FS_ROOT = "static/upload/"
    IMAGE_SERVICE_URL = "http://0.0.0.0:8090/static/upload/"
    FILE_SERVICE_URL = "http://0.0.0.0:8090/static/upload.zip"
    QR_SERVICE_URL = "http://0.0.0.0:8090/"
    QR_ARCHIVE = "static/"