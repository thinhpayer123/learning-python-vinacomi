CELERY_IMPORTS = ('sinhvien')
CELERY_IGNORE_RESULT = False
BROKER_HOST = "localhost" #IP address of the server running RabbitMQ and Celery
BROKER_PORT = 5672
BROKER_URL = 'amqp://admin:admin@'

from datetime import timedelta

CELERYBEAT_SCHEDULE = {
    'doctor-every-10-seconds': {
        'task': 'tasks.fav_doctor',
        'schedule': timedelta(seconds=10),
    },
}