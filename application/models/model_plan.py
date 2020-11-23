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




# class SalaryItem(CommonModel):
#     __tablename__ = 'salary_item'
#     item_exid = db.Column(String(100), index=True) #id tich hop tu he thong khac
#     item_no = db.Column(String(40), index=True, nullable=False)
#     item_name = db.Column(String(150), nullable=False)
   
#     description = db.Column(Text())

#     unit_id = db.Column(String(200))
#     unit_name = db.Column(String(200))
#     unit_no = db.Column(String())
#     # tax_class = db.Column(String(200))
#     # true False doi 5 dong duoi default thành nullable
    
#     sort = db.Column(Integer(), default=100)

#     active = db.Column(Boolean(), nullable=True)


class Plan(CommonModel):
    __tablename__ = 'plan' #dinh muc
    plan_no =  db.Column(String(255),nullable = False)
    plan_name =  db.Column(String(255),nullable = True)
    plan_type = db.Column(Integer()) # 1: thang, 2: quy, 3: nam

    department_id = db.Column(UUID(as_uuid=True))
    department_no = db.Column(String(255),nullable = False)
    department_name = db.Column(String(255),nullable = False)

    # plan_template_id = db.Column(UUID(as_uuid=True))
    # plan_template_no = db.Column(String(255),nullable = True)
    
    from_time = db.Column(BigInteger(), index=True)
    to_time = db.Column(BigInteger(), index=True)
    
    active = db.Column(SmallInteger(), default=1)

    working_days = db.Column(FLOAT(25,8), default=0)

    braziers = db.Column(JSONB())
    products = db.relationship("PlanProduct")
    items = db.relationship("PlanItem")
    other_costs = db.relationship("PlanOtherCost")
    salaries = db.relationship("PlanSalary")
    fuel_items = db.relationship("PlanFuelItem")
    
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


#
class PlanItem(CommonModel):
    __tablename__ = 'plan_item' #dinh muc
    plan_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan.id', ondelete='cascade'))
    # type = db.Column(String(40), index=True, nullable=True) #''fuel_materials, materials

    item_id = db.Column(UUID(as_uuid=True), index=True)
    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)

    brazier_id = db.Column(UUID(as_uuid=True), index=True)
    brazier_no = db.Column(String(40), index=True, nullable=True)
    brazier_name = db.Column(String(150), nullable=True)
    category_id = db.Column(UUID(as_uuid=True), index=True)

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    list_price = db.Column(FLOAT(25,8), default=0)
    quantity = db.Column(FLOAT(25,8), default=0)
    total_amount = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())


class PlanFuelItem(CommonModel):
    __tablename__ = 'plan_fuel_item' #dinh muc
    plan_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan.id', ondelete='cascade'))
    # type = db.Column(String(40), index=True, nullable=True) #''fuel_materials, materials
    item_id = db.Column(UUID(as_uuid=True), index=True)
    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)
    type = db.Column(String(40), index=True, nullable=True)
    working_days = db.Column(FLOAT(25,8), default=0)
    list_price = db.Column(FLOAT(25,8), default=0)
    quantity_per_day = db.Column(FLOAT(25,8), default=0)
    total_amount = db.Column(FLOAT(25,8), default=0)

    brazier_id = db.Column(UUID(as_uuid=True), index=True)
    brazier_no = db.Column(String(40), index=True, nullable=True)
    brazier_name = db.Column(String(150), nullable=True)

    category_id = db.Column(UUID(as_uuid=True), index=True)
    
    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    norm_quantity = db.Column(FLOAT(25,8), default=0)
    quantity = db.Column(FLOAT(25,8), default=0)
    factor = db.Column(FLOAT(25,8), default=0)
    
    approved_quantity = db.Column(FLOAT(25,8), default=0)
    demand_quantity = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())

    #
class PlanOtherCost(CommonModel):
    __tablename__ = 'plan_other_cost' #dinh muc
    plan_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan.id', ondelete='cascade'))
    type = db.Column(String(40), index=True, nullable=True)
    item_id = db.Column(UUID(as_uuid=True), index=True)
    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)
    category_id = db.Column(UUID(as_uuid=True), index=True)

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
    item_id = db.Column(UUID(as_uuid=True), index=True)
    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)
    category_id = db.Column(UUID(as_uuid=True), index=True)

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

class PlanFuelItemCategory(CommonModel):
    __tablename__ = 'plan_fuel_item_category' 
    type = db.Column(String(100), nullable=True) #1: item; 2#fuel_item #3: salary; #4:other_cost
    category_type_id = db.Column(String(100), nullable=True)
    category_type_name = db.Column(String(100), index=True, nullable=True)
    category_type_name_1 = db.Column(String(100), index=True, nullable=True)
    category_no = db.Column(String(100), nullable=True)
    category_name = db.Column(String(150), nullable=False)
    description = db.Column(String(50))
    thumbnail = db.Column(Text())
    sort = db.Column(Integer(), default=100)
    status = db.Column(String(20), default="active")
    items = db.relationship("Item", secondary='fuelitems_categories', lazy='dynamic')
    department_id = db.Column(UUID(as_uuid=True), db.ForeignKey("department.id"), index=True)
    department = db.relationship("Department")


class FuelItemCategoryRelation(CommonModel):
    __tablename__ = 'fuelitems_categories'
    item_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'))
    category_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan_fuel_item_category.id', ondelete='cascade'))