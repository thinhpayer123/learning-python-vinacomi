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


class Role(CommonModel):
    __tablename__ = 'role'
    id = db.Column(String, primary_key=True, default=default_uuid)
    name = db.Column(String(100), index=True, nullable=False, unique=True)
    display_name = db.Column(String(255), nullable=False)
    description = db.Column(String(255))

class User(CommonModel):
    __tablename__ = 'users'
    id = db.Column(String, primary_key=True, default=default_uuid)
    user_name = db.Column(String(255), nullable=False, index=True)
    full_name = db.Column(String(255), nullable=True)
    email = db.Column(String(255), index=True)
    password = db.Column(String(255), nullable=False,default=123456)
    # token = db.Column(String(63))
    salt = db.Column(String(255), nullable=False)

    # Permission Based Attributes.
    active = db.Column(Boolean, default=True)
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))
    
    # company_id = db.Column(String(), index=True, nullable=False)
    extra_data = db.Column(JSONB())

    # Methods
    def __repr__(self):
        """ Show user object info. """
        return '<User: {}>'.format(self.id)



# code moi 


class Unit(CommonModel):
    __tablename__ = 'unit'
    name = db.Column(db.String, nullable=True)
    unit_no = db.Column(db.String(63), nullable=False)
    description = db.Column(db.String)
    # tenant_id = db.Column(String(), nullable=False)


class ItemCategoryRelation(CommonModel):
    __tablename__ = 'items_categories'
    item_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'))
    category_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item_category.id', ondelete='cascade'))
    # item_id = db.Column(String(), db.ForeignKey('item.id', ondelete='cascade'))
    # category_id = db.Column(String(), db.ForeignKey('item_category.id', ondelete='cascade'))
    # tenant_id = db.Column(String(), ForeignKey("tenant.id", onupdate="RESTRICT", ondelete="RESTRICT"), nullable=True)


class ItemCategory(CommonModel):
    __tablename__ = 'item_category'
    category_exid = db.Column(String(100), nullable=True, index=True)
    category_no = db.Column(String(100), nullable=True)
    category_name = db.Column(String(150), nullable=False)

    description = db.Column(String(50))
    norm_template_id = db.Column(UUID(as_uuid=True), db.ForeignKey("norm_template.id"), index=True)
    norm_template = db.relationship("NormTemplate")

    thumbnail = db.Column(Text())
    sort = db.Column(Integer(), default=100)
    status = db.Column(String(20), default="active")
    items = db.relationship("Item", secondary='items_categories', lazy='dynamic')
    # tenant_id = db.Column(String(), nullable=False)
    def __repr__(self):
        return '<ItemCategory: {}>'.format(self.category_name)


# class ItemClass(CommonModel):
#     _tablename_ = 'item_class'
#     item_class_id = db.Column(String(), nullable=False, index=True)
#     item_class_name = db.Column(String(), nullable=False, index=True)
#     # 0: Level 0, Level 1, Level 2
#     # type = db.Column(SmallInteger(), nullable=True, index=True)
#     active = db.Column(Boolean(), default=True)
#     extra_data = db.Column(JSONB())
#     description = db.Column(Text())
    
#     parent_item_class = db.relationship("ItemClass")
#     parent_item_class_id = db.Column(UUID(as_uuid=True), db.ForeignKey("item_class.id"), index=True)
 



class Item(CommonModel):
    __tablename__ = 'item'
    item_exid = db.Column(String(100), index=True) #id tich hop tu he thong khac
    item_no = db.Column(String(40), index=True, nullable=False)
    item_name = db.Column(String(150), nullable=False)
    item_ascii_name = db.Column(String(150))
    # item_class_name = db.Column(String(150))
    # item_class_id = db.Column(UUID(as_uuid=True), nullable=True)
    # item_class = db.Column(String(100))
    thumbnail = db.Column(Text())
    images = db.Column(JSONB())
    brief_desc = db.Column(Text())
    description = db.Column(Text())

    unit_id = db.Column(String(200))
    unit_name = db.Column(String(200))
    unit_no = db.Column(String())
    tax_class = db.Column(String(200))
    # true False doi 5 dong duoi default thành nullable
    is_product = db.Column(Boolean(), nullable=True)
    is_material = db.Column(Boolean(), nullable=True)
    is_service = db.Column(Boolean(), nullable=True)
    
    sort = db.Column(Integer(), default=100)

    active = db.Column(Boolean(), nullable=True)
    extra_attributes = db.Column(JSONB())
    package_items = db.Column(JSONB())

    categories = db.relationship("ItemCategory", secondary='items_categories')
   

# class NormItem(CommonModel):
#     __tablename__ = 'norm_item'
#     norm_item_exid = db.Column(String(100), index=True) 
#     norm_item_no = db.Column(String(40), index=True, nullable=False)
#     norm_item_name = db.Column(String(150), nullable=False)
#     norm_item_ascii_name = db.Column(String(150))
#     brief_desc = db.Column(Text())
#     description = db.Column(Text())

class NormTemplate(CommonModel):
    __tablename__ = 'norm_template' 
    norm_template_name =  db.Column(String(255),nullable = True)
    norm_template_no = db.Column(String(255),nullable = True)
    norm_fields = db.Column(JSONB())
    norm_details = db.Column(JSONB())

class NormDocument(CommonModel):
    __tablename__ = 'norm_document' 
    norm_document_name =  db.Column(String(255),nullable = True)
    norm_document_no = db.Column(String(255),nullable = True)
    from_time = db.Column(BigInteger(), index=True)
    to_time = db.Column(BigInteger(), index=True)
    year = db.Column(Integer(), index=True)

class Norm(CommonModel):
    __tablename__ = 'norm' #dinh muc
    
    norm_name =  db.Column(String(255),nullable = True)

    norm_document_id = db.Column(UUID(as_uuid=True))
    norm_document_no = db.Column(String(255),nullable = True)

    norm_template_id = db.Column(UUID(as_uuid=True))
    norm_template_no = db.Column(String(255),nullable = True)
    
    from_time = db.Column(BigInteger(), index=True)
    to_time = db.Column(BigInteger(), index=True)
    year = db.Column(Integer(), index=True)

    priority = db.Column(Integer(), default=100)
    active = db.Column(SmallInteger(), default=1)

    norm_details = db.relationship("NormDetail")
    norm_fields = db.Column(JSONB())
    
class NormDetail(CommonModel):
    __tablename__ = 'norm_detail' #dinh muc
    norm_id = db.Column(UUID(as_uuid=True), db.ForeignKey('norm.id', ondelete='cascade'))
    # norm_no = db.Column(String(255),nullable = True)

    # type = db.Column(SmallInteger()) #0: Vat tu thuong xuyen sua chua , 1: bao duong sua chua: 3: 
    
    item_id = db.Column(UUID(as_uuid=True), index=True)
    # item_id = db.Column(UUID(as_uuid=True), index=True, db.ForeignKey('item.id'))

    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    # machine_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'), index=True)
    
    category_id = db.Column(UUID(as_uuid=True), index=True)
    category_no = db.Column(String(40), index=True, nullable=True)
    category_name = db.Column(String(150), nullable=True)

    note = db.Column(Text())

    data = db.Column(JSONB())


    # them
    # from_time = db.Column(BigInteger(), index=True)
    # to_time = db.Column(BigInteger(), index=True)
    # year = db.Column(Integer(), index=True)
    # priority = db.Column(Integer(), default=10)
    # active = db.Column(SmallInteger(), default=1)