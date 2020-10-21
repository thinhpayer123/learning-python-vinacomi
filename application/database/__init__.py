from gatco_sqlalchemy import SQLAlchemy
import redis

db = SQLAlchemy()


redisdb = redis.StrictRedis(host='0.0.0.0', port=6379)
# redisdb = redis.StrictRedis(host='192.168.165.128', port=6379)

def init_database(app):
    db.init_app(app)