""" Module represents a User. """

from sqlalchemy import (
    Column, String, Integer,
    DateTime, Date, Boolean,
    ForeignKey,BigInteger,SmallInteger
)

from sqlalchemy import (
    Column, String, Integer, DateTime, Date, Boolean, DECIMAL, ForeignKey, Text, SmallInteger ,Float ,BigInteger
)
from sqlalchemy.dialects.postgresql import UUID,JSON, JSONB,FLOAT

from sqlalchemy.orm import relationship, backref

from application.database import db
from application.database.model import CommonModel, default_uuid



roles_users = db.Table('roles_users',
                       db.Column('user_id', String, db.ForeignKey('users.id', ondelete='cascade'), primary_key=True),
                       db.Column('role_id', String, db.ForeignKey('role.id', onupdate='cascade'), primary_key=True))


# class Role(CommonModel):
#     __tablename__ = 'role'
#     id = db.Column(String, primary_key=True, default=default_uuid)
#     name = db.Column(String(100), index=True, nullable=False, unique=True)
#     display_name = db.Column(String(255), nullable=False)
#     description = db.Column(String(255))

# class User(CommonModel):
#     __tablename__ = 'users'
#     id = db.Column(String, primary_key=True, default=default_uuid)
#     user_name = db.Column(String(255), nullable=False, index=True)
#     full_name = db.Column(String(255), nullable=True)
#     email = db.Column(String(255), index=True)
#     password = db.Column(String(255), nullable=False,default=123456)
#     # token = db.Column(String(63))
#     salt = db.Column(String(255), nullable=False)

#     # Permission Based Attributes.
#     active = db.Column(Boolean, default=True)
#     roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))
    
#     # company_id = db.Column(String(), index=True, nullable=False)
#     extra_data = db.Column(JSONB())

#     department_id = db.Column(UUID(as_uuid=True), db.ForeignKey('department.id', ondelete='RESTRICT'))

#     # Methods
#     def __repr__(self):
#         """ Show user object info. """
#         return '<User: {}>'.format(self.id)

class SalaryItem(CommonModel):
    __tablename__ = 'salary_item'
    item_exid = db.Column(String(100), index=True) #id tich hop tu he thong khac
    item_no = db.Column(String(40), index=True, nullable=False)
    item_name = db.Column(String(150), nullable=False)
   
    description = db.Column(Text())

    unit_id = db.Column(String(200))
    unit_name = db.Column(String(200))
    unit_no = db.Column(String())
    # tax_class = db.Column(String(200))
    # true False doi 5 dong duoi default thành nullable
    
    sort = db.Column(Integer(), default=100)

    active = db.Column(Boolean(), nullable=True)


class Plan(CommonModel):
    __tablename__ = 'plan' #dinh muc
    plan_no =  db.Column(String(255),nullable = False)
    plan_name =  db.Column(String(255),nullable = True)
    plan_type = db.Column(Integer(), default=100) # 1: thang, 2: quy, 3: nam

    # plan_template_id = db.Column(UUID(as_uuid=True))
    # plan_template_no = db.Column(String(255),nullable = True)
    
    from_time = db.Column(BigInteger(), index=True)
    to_time = db.Column(BigInteger(), index=True)
    
    active = db.Column(SmallInteger(), default=1)

    working_days = db.Column(FLOAT(25,8), default=0)

    items = db.relationship("PlanItem")
    other_costs = db.relationship("PlanOtherCost")
    salaries = db.relationship("PlanSalary")
    
class PlanProduct(CommonModel):
    __tablename__ = 'plan_product' #dinh muc
    plan_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan.id', ondelete='cascade'))
    type = db.Column(String(40), index=True, nullable=True)
    item_id = db.Column(UUID(as_uuid=True), index=True)
    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)

    brazier_id = db.Column(UUID(as_uuid=True), index=True)
    brazier_no = db.Column(String(40), index=True, nullable=True)
    brazier_name = db.Column(String(150), nullable=True)

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    list_price = db.Column(FLOAT(25,8), default=0)
    quantity = db.Column(FLOAT(25,8), default=0)
    total_amount = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())


class PlanItem(CommonModel):
    __tablename__ = 'plan_item' #dinh muc
    plan_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan.id', ondelete='cascade'))
    type = db.Column(String(40), index=True, nullable=True)
    item_id = db.Column(UUID(as_uuid=True), index=True)
    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)

    brazier_id = db.Column(UUID(as_uuid=True), index=True)
    brazier_no = db.Column(String(40), index=True, nullable=True)
    brazier_name = db.Column(String(150), nullable=True)

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    list_price = db.Column(FLOAT(25,8), default=0)
    quantity = db.Column(FLOAT(25,8), default=0)
    total_amount = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())


    #
class PlanOtherCost(CommonModel):
    __tablename__ = 'plan_other_cost' #dinh muc
    plan_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan.id', ondelete='cascade'))
    type = db.Column(String(40), index=True, nullable=True)
    item_id = db.Column(UUID(as_uuid=True), index=True)
    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    working_days = db.Column(FLOAT(25,8), default=0)
    list_price = db.Column(FLOAT(25,8), default=0)

    quantity_per_day = db.Column(FLOAT(25,8), default=0)
    quantity = db.Column(FLOAT(25,8), default=0)
    total_amount = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())

class PlanSalary(CommonModel):
    __tablename__ = 'plan_salary' #dinh muc
    plan_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan.id', ondelete='cascade'))
    type = db.Column(String(40), index=True, nullable=True) #
    #item nay la cua bang salary, du lieu gom co lo_id, SalaryItem
    salary_item_id = db.Column(UUID(as_uuid=True), index=True)
    salary_item_no = db.Column(String(40), index=True, nullable=True)
    salary_item_name = db.Column(String(150), nullable=True)

    brazier_id = db.Column(UUID(as_uuid=True), index=True)
    brazier_no = db.Column(String(40), index=True, nullable=True)
    brazier_name = db.Column(String(150), nullable=True)

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    quantity = db.Column(FLOAT(25,8), default=0)

    list_salary_price = db.Column(FLOAT(25,8), default=0)
    list_insurance_price = db.Column(FLOAT(25,8), default=0)
    
    salary_amount = db.Column(FLOAT(25,8), default=0)
    insurance_amount = db.Column(FLOAT(25,8), default=0)

    total_amount = db.Column(FLOAT(25,8), default=0) #salary_amount + insurance_amount

    factor = db.Column(FLOAT(25,8), default=0)
    working_days = db.Column(FLOAT(25,8), default=0)

    average_salary = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())