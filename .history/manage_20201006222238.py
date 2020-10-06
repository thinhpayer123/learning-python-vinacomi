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

from manager import Manager
from datetime import datetime, timedelta
from application import run_app
from application.database import db

from application.extensions import auth
from application.models.model import User, Role, Company
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
def add_company(name="KMA"):
    init_app()
    company = db.session.query(Company).filter(Company.name == name).first()
    print(name)
    if company is None:
        cpny = Company(name=name,description='don vi '+ name,company_type='education',company_no=name+'1',email='trunganhact@gmail.com',active= True)
        print(cpny)
        db.session.add(cpny)
    # company1 = db.session.query(Company).filter(Company.name == company_name).first()
    # if company1 is None:
    #     company1 = Company(company_type='education',company_no,name,)





@manager.command
def run():
    """ Starts server on port 8000. """
    run_app(host="0.0.0.0", port=8090)

@manager.command
def genqr(from_date=None, to_date=None, id=None):
    init_app()

    from_time = None
    to_time = None

    if from_date is None:
        from_date = (datetime.now() + timedelta(days=-1)).strftime("%Y-%m-%d")
        # from_date = datetime.strptime(from_date, "%Y-%m-%d")
    if to_date is None:
        to_date = datetime.now().strftime("%Y-%m-%d")
        # to_date = datetime.strptime(to_date, "%Y-%m-%d")

    if (from_date is not None) and (to_date is not None):
        from_date = datetime.strptime(from_date, "%Y-%m-%d")
        from_time = datetime.timestamp(from_date)

        to_date = datetime.strptime(to_date, "%Y-%m-%d")
        to_time = datetime.timestamp(to_date)

        print("timestamp =", from_time, to_time)

    from application.worker_dir.genqr import do_work
    do_work(from_time=from_time, to_time=to_time, id= id)
    print("test_logs", from_date, to_date, id)

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
            if col_type in ['INTEGER','SMALLINT', 'FLOAT' ]:
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
    company = Company.query.filter(Company.id == "ICANTEEN").first()
    if(company is None):
        company = Company(id='ICANTEEN', name="iCanteen", company_no="ICT")
        company.company_type = "education"
        db.session.add(company)
        db.session.flush()

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

    company = Company()

    company.id = "1"
    company.company_type = "TEST"
    company.name = "GonStack"

    db.session.add(company)
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
        user.company_id = company.id
        
        db.session.add(user)
 
    db.session.commit()

    return

if __name__ == '__main__':
    manager.main()