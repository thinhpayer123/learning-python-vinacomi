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


class Company(CommonModel):
    __tablename__ = 'company'
    id = db.Column(String(), primary_key=True,default=default_uuid)
    company_type = db.Column(String(), nullable=False)
    company_id = db.Column(String())
    name = db.Column(String())
    description = db.Column(String())
    phone_number = db.Column(String(63))
    email = db.Column(String())
    point_name = db.Column(String())
    extra_data = db.Column(JSONB())

    active = db.Column(Boolean(), default=True)


# class Application(CommonModel):
#     __tablename__ = 'application'
#     id = db.Column(String(), primary_key=True,default=default_uuid)
#     # company_id = db.Column(String(), index=True) 
#     # app_id = db.Column(String(), index=True)
#     # app_secret = db.Column(String())
#     # name = db.Column(String())
#     # app_url = db.Column(String())

#     # foodbook_access_token = db.Column(String())
#     # foodbook_partner_id = db.Column(String())
#     # firebase_server_key = db.Column(String())

#     wallet_require_pass = db.Column(Boolean(), default=True)

#     ios_release_version = db.Column(String(63))
#     ios_link_update = db.Column(String())
#     android_release_version = db.Column(String(63))
#     android_link_update = db.Column(String())
#     message_update = db.Column(String())

#     phone_number = db.Column(String(63))
#     email = db.Column(String(63))

#     sms_api_key = db.Column(String())
#     sms_secret_key = db.Column(String())
#     sms_brand_name = db.Column(String(63))
#     sms_text = db.Column(String())
#     sms_partner = db.Column(String(63))
#     active = db.Column(Boolean(), default=True)

    


# #     "ios_release_version": "1.1.7",
# #   "android_release_version": "15",
# #   "message_update": "Phiên bản bạn đang sử dụng chưa phải là bản mới nhất trên chợ ứng dụng. Vui lòng cập nhật để tiếp tục?",
# #   "phone_number": "+84972731210",
# #   "email": "tech@soyagarden.com",
# #   "ios_link_update": "https://apps.apple.com/app/apple-store/id1472964012",
# #   "android_link_update": "https://play.google.com/store/apps/details?id=com.soyagarden.android",
# #   "firebase_wb_api_key": "AIzaSyAC-8c5yj01lFTC0q2JoiLz6OCm76oe-II",
# #   "phone_countrey_prefix": "84",
# #   "phone_national_number": "972731210",
# #   "user_id": "e26d5070015e5b8230e50eaea52e0687",
# #   "user_fullname": "Lê Thị Lan",
# #   "wallet_type": "user",
# #   "sms_api_key": "..",
# #   "sms_secret_key": "",
# #   "sms_brand_name": "Soya Garden",
# #   "sms_text": "Ma OTP cua quy khach la ****** (Soya Garden)",
# #   "sms_partner": "VMG_V2"



# class Brand(CommonModel):
#     __tablename__ = 'brand'
#     id = db.Column(String(), primary_key=True,default=default_uuid)
#     brand_id = db.Column(String(), index=True, nullable=False,unique=True)
#     company_id = db.Column(String(), index=True, nullable=False)
#     brand_logo_url = db.Column(String())
#     email = db.Column(String())
#     phone_number = db.Column(String())
#     extra_data = db.Column(JSONB())
#     active = db.Column(Boolean(), default=True)
#     company_name = db.Column(String())
#     name = db.Column(String())

# class Store(CommonModel):
#     __tablename__ = 'store'
#     id = db.Column(String(), primary_key=True,default=default_uuid)
#     store_id = db.Column(String(), index=True, nullable=False)
#     brand_id = db.Column(String(), index=True, nullable=False)
#     company_id = db.Column(String(), index=True, nullable=False)
#     active = db.Column(Boolean(), default=True)
#     company_name = db.Column(String())
#     store_name = db.Column(String())
#     open_time = db.Column(String())
#     phone_number = db.Column(String())
#     estimate_price = db.Column(Integer())
#     estimate_price_max = db.Column(Integer())
#     wifi_password = db.Column(String())

#     is_car_parking = db.Column(SmallInteger())
#     is_visa = db.Column(SmallInteger())
#     is_sticky = db.Column(SmallInteger())

#     store_longitude = db.Column(Float())
#     store_latitude = db.Column(Float())
#     store_radius_detail = db.Column(Integer())

#     store_master_id = db.Column(String())

#     district_id = db.Column(String())
#     city_id = db.Column(String())
#     city_name = db.Column(String())
#     store_address = db.Column(String())
#     image_path = db.Column(String())
#     image_path_thumb = db.Column(String())

#     workstation_id = db.Column(String())

#     wallet_id = db.Column(String())
#     wallet_fullname = db.Column(String())
#     wallet_phone = db.Column(String())

#     wallet_method = db.Column(String()) #by_company, by_store
#     extra_data = db.Column(JSONB())




# class Item(CommonModel):
#     __tablename__ = 'item'
#     company_id = 

# class ItemStore(CommonModel):
#     __tablename__ = 'item'
#     company_id = 

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


# class MemberCard(CommonModel):
#     __tablename__ = 'membercard'
#     id = db.Column(String, primary_key=True, default=default_uuid)
#     company_id = db.Column(String(), index=True, nullable=False)
#     membercard_id = db.Column(String(), index=True, nullable=False, unique=True)
#     wallet_id = db.Column(String(), index=True, nullable=True)
#     start_date = db.Column(BigInteger())
#     expire_date = db.Column(BigInteger())
#     extra_data = db.Column(JSONB())
#     status = db.Column(SmallInteger(), default=1)  # 1: active, 0: deactive
#     save_dir = db.Column(String())
#     user_no = db.Column(String(63), nullable=True) # student_id 
#     # user_name =db.Column(String(),index=True, nullable=False)
#     user_name = db.Column(String(255), nullable=False, index=True)



# luu tru cac user co wallet cua cong ty
class WalletUser(CommonModel):
    __tablename__ = 'wallet_user'
    id = db.Column(String, primary_key=True, default=default_uuid)
    company_id = db.Column(String(), index=True, nullable=False)
    company_type = db.Column(String(), nullable=True)
    user_id = db.Column(String(), index=True, nullable=True)
    wallet_id = db.Column(String(), index=True, nullable=True)
    relationship = db.Column(String(), nullable=True) #id owner / subcriber
    company_no = db.Column(String(15), nullable=True)
    user_no = db.Column(String(), nullable=True) # student_id 
    extra_data = db.Column(JSONB())
    email = db.Column(String())
 

#Bangr luu cac tai khoan chi nhanh cua cong ty
class WalletCompany(CommonModel):
    __tablename__ = 'wallet_company'
    id = db.Column(String, primary_key=True, default=default_uuid)
    company_id = db.Column(String(), index=True, nullable=False)
    fullname = db.Column(String())
    wallet_id = db.Column(String(), index=True, nullable=True)
  
    extra_data = db.Column(JSONB())
    description = db.Column(String())
    active = db.Column(Boolean(), default=True)
    list_wallet_follow = db.Column(JSONB())
    wallet_type = db.Column(String())


class Transaction(CommonModel):
    __tablename__ = 'transaction'
    id = db.Column(String, primary_key=True, default=default_uuid)
    company_id = db.Column(String(), index=True, nullable=False)
    brand_id = db.Column(String(), index=True)
    store_id = db.Column(String(),index=True)
    # created_at = db.Column(BigInteger(), index=True)
    validated_at = db.Column(BigInteger(), index=True) # trả về từ HEOVANG 
    tran_id = db.Column(String(), index=True)
    transaction_hash = db.Column(String(), index=True)
    to_wallet_id =  db.Column(String(), index=True)
    from_wallet_id =  db.Column(String(), index=True)
    transaction_type =  db.Column(String(), index=True) #payment, transfer
    status = db.Column(String())
    trans_hash_icanteen = db.Column(String())
    main_value = db.Column(BigInteger()) # tiền trong tài khoản chính 
    sub_value = db.Column(BigInteger()) # tiền trong tài khoản khuyến mãi 
    value = db.Column(BigInteger()) # tổng tiền trả 
    membercard_id =  db.Column(String(), index=True) #payment, transfer
    username = db.Column(String())
    extra_data = db.Column(JSONB())
    status_worker = db.Column(String(),index=True)


class Order(CommonModel):
    __tablename__ = 'orders'
    id = db.Column(String, primary_key=True, default=default_uuid)
    membership_id = db.Column(String(),index=True)
    membership_name = db.Column(String())
    tran_id = db.Column(String(), index=True)
    transaction_hash = db.Column(String(),index=True)
    tran_date = db.Column(BigInteger())
    tran_date_fmt = db.Column(String()) #trandate_format
    total_amount = db.Column(String())# tổng tiền 
    wallet_id = db.Column(String(),index = True)
    items = db.Column(JSONB())
    payment_info = db.Column(JSONB())
    status = db.Column(String())


class QRworker(CommonModel):
    __tablename__ = 'qrworker'
    id = db.Column(Integer, primary_key=True)
    uid = db.Column(String(30), nullable=False)
    save_directory = db.Column(String(255), nullable=False)
    status = db.Column(String(10))
    namefile = db.Column(String(255))
    dowload_url = db.Column(String(255))




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
    category_type = db.Column(String(50))
    thumbnail = db.Column(Text())
    is_show = db.Column(Boolean(), default=True)
    sort_number = db.Column(Integer(), default=0)
    status = db.Column(String(20), default="active")
    items = db.relationship("Item", secondary='items_categories', lazy='dynamic')
    # tenant_id = db.Column(String(), nullable=False)
    def __repr__(self):
        return '<ItemCategory: {}>'.format(self.category_name)

class Item(CommonModel):
    __tablename__ = 'item'
    item_exid = db.Column(String(100), index=True) #id tich hop tu he thong khac
    item_no = db.Column(String(40), index=True, nullable=False)
    item_name = db.Column(String(150), nullable=False)
    item_ascii_name = db.Column(String(150))
    item_type = db.Column(String(100))
    item_class = db.Column(String(100))
    thumbnail = db.Column(Text())
    images = db.Column(JSONB())
    brief_desc = db.Column(Text())
    description = db.Column(Text())

    manufacturer = db.Column(String(200), nullable=True)
    qty_per_unit = db.Column(FLOAT(11,2), nullable=True)
    weight = db.Column(FLOAT(11,2), nullable=True)
    pack_size = db.Column(Integer(), nullable=True)
    unit_id = db.Column(String(200))
    unit_name = db.Column(String(200))

    tax_class = db.Column(String(200))
# true False doi 5 dong duoi default thành nullable
    is_product = db.Column(Boolean(), nullable=True)
    is_raw_material = db.Column(Boolean(), nullable=True) # vat tu 
    is_material = db.Column(Boolean(), nullable=True)
    is_service = db.Column(Boolean(), nullable=True)
    is_machine = db.Column(Boolean(), nullable=True)

    active = db.Column(Boolean(), nullable=True)
    extra_attributes = db.Column(JSONB())
    package_items = db.Column(JSONB())

    categories = db.relationship("ItemCategory", secondary='items_categories')
    # tenant_id = db.Column(String(), nullable=False)

class Norm(CommonModel):
    __tablename__ = 'norm' #dinh muc
    norm_no = db.Column(String(255),nullable = True)
    from_time = db.Column(BigInteger(), index=True)
    to_time = db.Column(BigInteger(), index=True)
    priority = db.Column(Integer(), default=10)
    active = db.Column(SmallInteger(), default=1)

    norm_details = db.relationship("NormDetail")
    # chitiet = db.relationship("PhieuNhapVatTuChiTiet", order_by="PhieuNhapVatTuChiTiet.created_at",
    #                           cascade="all, delete-orphan")
    # tenant_id = db.Column(String(), nullable=False)

class NormDetail(CommonModel):
    __tablename__ = 'norm_detail' #dinh muc
    norm_id = db.Column(UUID(as_uuid=True), db.ForeignKey('norm.id', ondelete='cascade'))
    norm_no = db.Column(String(255),nullable = True)

    type = db.Column(SmallInteger()) #0: Vat tu thuong xuyen sua chua , 1: bao duong sua chua: 3: 
    
    item_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'), index=True)
    # item_id = db.Column(UUID(as_uuid=True), index=True, db.ForeignKey('item.id'))

    item_no = db.Column(String(40), index=True, nullable=True)
    item_name = db.Column(String(150), nullable=True)

    unit_id = db.Column(UUID(as_uuid=True))
    unit_no = db.Column(String())
    unit_name = db.Column(String())

    machine_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'), index=True)
    machine_no = db.Column(String(40), index=True, nullable=True)
    machine_name = db.Column(String(150), nullable=True)

    note = db.Column(Text())
    # them
    from_time = db.Column(BigInteger(), index=True)
    to_time = db.Column(BigInteger(), index=True)
    priority = db.Column(Integer(), default=10)
    active = db.Column(SmallInteger(), default=1)

class NormDetailQuantity(CommonModel):
    __tablename__ = 'norm_detail_quantity' #dinh muc
    norm_id = db.Column(UUID(as_uuid=True), db.ForeignKey('norm.id', ondelete='cascade'))
    norm_no = db.Column(String(255),nullable = True)

    norm_detail_id = db.Column(UUID(as_uuid=True), db.ForeignKey('norm_detail.id', ondelete='cascade'))
    type = db.Column(SmallInteger())

    quantity = db.Column(DECIMAL(25,8))
    previous_quantity = db.Column(DECIMAL(25,8))
    product_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'), index=True)
    product_no = db.Column(String(), index=True, nullable=True)
    product_name = db.Column(String(), nullable=True)










