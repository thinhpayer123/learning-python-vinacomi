""" Module for managing tasks through a simple cli interface. """
# Libraries

import sys
import json
import random
import string
import uuid
from os.path import abspath, dirname
sys.path.insert(0, dirname(abspath(__file__)))
import sqlalchemy
from sqlalchemy.inspection import inspect
import json
import traceback
import asyncio
from manager import Manager
from datetime import datetime, timedelta
from application import run_app
from application.database import db

from application.extensions import auth
from application.models.model import User, Role
# from application.

def generator_salt():
    data = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(24))
    return data

def init_app():
    from application.config import Config
    from application.server import app
    from application.database import init_database

    app.config.from_object(Config)
    init_database(app)
# Constants.
manager = Manager()

@manager.command
def add_user():
    init_app()
    role1 = db.session.query(Role).filter(Role.name == 'admin').first()
    if role1 is None:
        role1 = Role(name='admin', display_name='Admin')
        db.session.add(role1)

    user1 = db.session.query(User).filter(User.user_name == 'admin').first()
    if user1 is None:
        salt = str(generator_salt())
        user1 = User(user_name='admin', full_name='Admin', email='admin@heonvang.vn', password=auth.encrypt_password('123456',salt), active=True, salt = salt)
        user1.roles.append(role1)
        db.session.add(user1)
    db.session.commit()


@manager.command
def run():
    """ Starts server on port 8000. """
    run_app(host="0.0.0.0", port=7001)


@manager.command
def generate_schema(path = "static/js/schema", exclude = None, prettyprint = True):
    """ Generate javascript schema"""
    exclude_list = None
    if path is None:
        print("Path is required")
        return
    
    if exclude is not None:
        exclude_list = exclude.split(",")
        
    for cls in [cls for cls in db.Model._decl_class_registry.values() if isinstance(cls, type) and issubclass(cls, db.Model)]:
        classname = cls.__name__
        if (exclude_list is not None) and (classname in exclude_list):
            continue
        schema = {}
        for col in cls.__table__.c:
            col_type = str(col.type)
            schema_type = ''
            if 'DECIMAL' in col_type:
                schema_type = 'number'
            if col_type in ['INTEGER','SMALLINT', 'FLOAT', 'BIGINT' ]:
                schema_type = 'number'
            if col_type == 'DATETIME':
                schema_type = 'datetime'
            if col_type == 'DATE':
                schema_type = 'datetime'
            if 'VARCHAR' in col_type:
                schema_type = 'string'
            if col_type in ['VARCHAR', 'UUID', 'TEXT']:
                schema_type = 'string'
            if col_type in ['JSON', 'JSONB']:
                schema_type = 'json'
            if 'BOOLEAN' in col_type:
                schema_type = 'boolean'
            
            schema[col.name] = {"type": schema_type}
            
            if col.primary_key:
                schema[col.name]["primary"] = True
            #nullabel
            if (not col.nullable) and (not col.primary_key):
                schema[col.name]["required"] = True
                
            if hasattr(col.type, "length") and (col.type.length is not None):
                schema[col.name]["length"] = col.type.length
            
            #default
            if (col.default is not None) and (col.default.arg is not None) \
                and (not callable(col.default.arg)) and not isinstance(col.default.arg, sqlalchemy.sql.functions.GenericFunction):
                #print(col.default, col.default.arg, callable(col.default.arg))
                schema[col.name]["default"] = col.default.arg
                
            #User confirm_password
            if (classname == "User") and ("password" in col.name):
                schema["confirm_password"] = {"type": schema_type}
                schema["confirm_password"]["length"] = col.type.length
                
                
        
        relations = inspect(cls).relationships
        for rel in relations:
            if rel.direction.name in ['MANYTOMANY', 'ONETOMANY']:
                schema[rel.key] = {"type": "list"}
            if rel.direction.name in ['MANYTOONE']:
                schema[rel.key] = {"type": "dict"}
        
        if prettyprint:
            with open(path + '/' + classname + 'Schema.json', 'w') as outfile:
                json.dump(schema,  outfile, indent=4,)
        else:
            with open(path + '/' + classname + 'Schema.json', 'w') as outfile:
                json.dump(schema,  outfile,)




@manager.command
def update_admin(password='123456'):
    user = User.query.filter(User.user_name == "admin").first()
    if user is not None:
        
        # create user password
        user_password=auth.encrypt_password(password, user.salt)
        user.password = user_password
        db.session.commit()
        
@manager.command
def create_admin(password='123456'):
    """ Create default data. """
   

    role_admin = Role.query.filter(Role.name == "admin").first()
    if(role_admin is None):
        role_admin = Role(name='admin', display_name="Admin")
        db.session.add(role_admin)
        db.session.flush()
    
    role_user = Role.query.filter(Role.name == "user").first()
    if(role_user is None):
        role_user = Role(name='user', display_name="User")
        db.session.add(role_user)
        db.session.flush() 

    

    user = User.query.filter(User.user_name == "admin").first()
    if user is None:
        # create salt
        letters = string.ascii_lowercase
        user_salt = ''.join(random.choice(letters) for i in range(64))
        print("user_salt", user_salt)
        # create user password
        user_password=auth.encrypt_password(password, user_salt)

        #create user
        user = User(user_name='admin', full_name="Admin User", email="admin@gonrin.com",\
            password=user_password, salt=user_salt)
    
        
        db.session.add(user)
 
    db.session.commit()

    return

@manager.command
def create_user(user_name=None, password='123456', department_no=None):
    from application.models.model import Department
    role_user = Role.query.filter(Role.name == "user").first()
    if(role_user is None):
        role_user = Role(name='user', display_name="User")
        db.session.add(role_user)
        db.session.flush() 
    if (user_name is None) or (department_no is None):
        print("parram not correct")
    department = Department.query.filter(Department.department_no == department_no).first()
    if department is None:
        print("parram not correct")

    # create salt
    letters = string.ascii_lowercase
    user_salt = ''.join(random.choice(letters) for i in range(64))

    user_password=auth.encrypt_password(password, user_salt)
    user = User(user_name=user_name, full_name="user_name", email=user_name + "@gonrin.com",\
            password=user_password, salt=user_salt, department_id= department.id)

    db.session.add(user)
    db.session.commit()

if __name__ == '__main__':
    manager.main()
