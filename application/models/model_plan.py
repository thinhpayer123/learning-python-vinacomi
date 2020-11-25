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
    __tablename__ = 'plan' #ke hoach #cong doan sx
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
    __tablename__ = 'plan_product' #kế hoạch sản phẩm
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
    quantity = db.Column(FLOAT(25,8), default=0) #ddinh luong
    total_amount = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())


#
class PlanItem(CommonModel):
    __tablename__ = 'plan_item' # muc ke hoach
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
    __tablename__ = 'plan_fuel_item' #Kế Hoạch Nhiên Liệu Tiêu Hao
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
    __tablename__ = 'plan_other_cost' #ke hoach chi phi khac
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
    __tablename__ = 'plan_salary' #Kế hoạch lương
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

class PlanItemCategory(CommonModel):
    __tablename__ = 'plan_item_category' 
    type = db.Column(String(100), nullable=True) #1: item; 2#fuel_item #3: salary; #4:other_cost
    category_group_id = db.Column(String(100), nullable=True)
    category_group_name = db.Column(String(100), index=True, nullable=True)
    category_group_name_1 = db.Column(String(100), index=True, nullable=True)
    category_no = db.Column(String(100), nullable=True)
    category_name = db.Column(String(150), nullable=False)
    description = db.Column(String(50))
    thumbnail = db.Column(Text())
    sort = db.Column(Integer(), default=100)
    status = db.Column(String(20), default="active")
    items = db.relationship("Item", secondary='plan_item_categorie_rel', lazy='dynamic')
    department_id = db.Column(UUID(as_uuid=True), db.ForeignKey("department.id"), index=True)
    department = db.relationship("Department")


class PlanItemCategoryRelation(CommonModel):
    __tablename__ = 'plan_item_categorie_rel'
    item_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'))
    category_id = db.Column(UUID(as_uuid=True), db.ForeignKey('plan_item_category.id', ondelete='cascade'))

class Settlement(CommonModel):
    __tablename__ = 'settlement' #quyet toan
    settlement_no =  db.Column(String(255),nullable = False)
    settlement_name =  db.Column(String(255),nullable = True)
    settlement_type = db.Column(Integer()) # 1: thang, 2: quy, 3: nam

    department_id = db.Column(UUID(as_uuid=True))
    department_no = db.Column(String(255),nullable = False)
    department_name = db.Column(String(255),nullable = False)

    from_time = db.Column(BigInteger(), index=True)
    to_time = db.Column(BigInteger(), index=True)
    
    active = db.Column(SmallInteger(), default=1)

    # braziers = db.Column(JSONB())

class SettlementBrazier(CommonModel):
    __tablename__ = 'settlement_brazier' # quyết toán công đoạn
    settlement_id = db.Column(UUID(as_uuid=True), db.ForeignKey('settlement.id', ondelete='cascade'))
    # type = db.Column(String(40), index=True, nullable=True)
    settlement_quantity = db.Column(FLOAT(25,8), default=0) #khối lượng
    #lò
    brazier_id = db.Column(UUID(as_uuid=True), index=True)
    brazier_no = db.Column(String(40), index=True, nullable=True)
    brazier_name = db.Column(String(150), nullable=True)
    brazier_type = db.Column(db.String, nullable=True)
    brazier_diameter = db.Column(FLOAT(25,8), nullable=True)
    
    #công đoạn
    stage_id = db.Column(UUID(as_uuid=True))
    stage_no = db.Column(String(255),nullable = True)
    stage_name = db.Column(String(255),nullable = True)


    product_id = db.Column(UUID(as_uuid=True), index=True)
    product_no = db.Column(String())
    product_name = db.Column(String()) #tấn than, mét lò...

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    list_price = db.Column(FLOAT(25,8), default=0) #đơn giá
    # amount = db.Column(FLOAT(25,8), default=0)
    total_amount = db.Column(FLOAT(25,8), default=0) #tổng chi phí

    #vat lieu
    item_list_price = db.Column(FLOAT(25,8), default=0)
    item_amount = db.Column(FLOAT(25,8), default=0)
    #nhien lieu
    fuel_item_list_price = db.Column(FLOAT(25,8), default=0)
    fuel_item_amount = db.Column(FLOAT(25,8), default=0)

    #tien luong
    salary_list_price = db.Column(FLOAT(25,8), default=0)
    salary_amount = db.Column(FLOAT(25,8), default=0)

    #BHXH
    insurance_list_price = db.Column(FLOAT(25,8), default=0)
    insurance_amount = db.Column(FLOAT(25,8), default=0)

    # KHTS
    depreciation_list_price = db.Column(FLOAT(25,8), default=0)
    depreciation_amount = db.Column(FLOAT(25,8), default=0)

    #chi khac
    other_cost_list_price = db.Column(FLOAT(25,8), default=0)
    other_cost_amount = db.Column(FLOAT(25,8), default=0)

    note = db.Column(Text())