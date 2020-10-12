""" Module represents a User. """

from sqlalchemy import (
    Column, String, Integer,
    DateTime, Date, Boolean,
    ForeignKey
)

from sqlalchemy import (
    Column, String, Integer, DateTime, Date, Boolean, DECIMAL, ForeignKey, Text, SmallInteger ,Float ,BigInteger
)
from sqlalchemy.dialects.postgresql import UUID, JSONB

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
    company_no = db.Column(String())
    name = db.Column(String())
    description = db.Column(String())
    phone_number = db.Column(String(63))
    email = db.Column(String())
    point_name = db.Column(String())
    extra_data = db.Column(JSONB())

    active = db.Column(Boolean(), default=True)


class Application(CommonModel):
    __tablename__ = 'application'
    id = db.Column(String(), primary_key=True,default=default_uuid)
    # company_id = db.Column(String(), index=True) 
    # app_id = db.Column(String(), index=True)
    # app_secret = db.Column(String())
    # name = db.Column(String())
    # app_url = db.Column(String())

    # foodbook_access_token = db.Column(String())
    # foodbook_partner_id = db.Column(String())
    # firebase_server_key = db.Column(String())

    wallet_require_pass = db.Column(Boolean(), default=True)

    ios_release_version = db.Column(String(63))
    ios_link_update = db.Column(String())
    android_release_version = db.Column(String(63))
    android_link_update = db.Column(String())
    message_update = db.Column(String())

    phone_number = db.Column(String(63))
    email = db.Column(String(63))

    sms_api_key = db.Column(String())
    sms_secret_key = db.Column(String())
    sms_brand_name = db.Column(String(63))
    sms_text = db.Column(String())
    sms_partner = db.Column(String(63))
    active = db.Column(Boolean(), default=True)

    


#     "ios_release_version": "1.1.7",
#   "android_release_version": "15",
#   "message_update": "Phiên bản bạn đang sử dụng chưa phải là bản mới nhất trên chợ ứng dụng. Vui lòng cập nhật để tiếp tục?",
#   "phone_number": "+84972731210",
#   "email": "tech@soyagarden.com",
#   "ios_link_update": "https://apps.apple.com/app/apple-store/id1472964012",
#   "android_link_update": "https://play.google.com/store/apps/details?id=com.soyagarden.android",
#   "firebase_wb_api_key": "AIzaSyAC-8c5yj01lFTC0q2JoiLz6OCm76oe-II",
#   "phone_countrey_prefix": "84",
#   "phone_national_number": "972731210",
#   "user_id": "e26d5070015e5b8230e50eaea52e0687",
#   "user_fullname": "Lê Thị Lan",
#   "wallet_type": "user",
#   "sms_api_key": "..",
#   "sms_secret_key": "",
#   "sms_brand_name": "Soya Garden",
#   "sms_text": "Ma OTP cua quy khach la ****** (Soya Garden)",
#   "sms_partner": "VMG_V2"



class Brand(CommonModel):
    __tablename__ = 'brand'
    id = db.Column(String(), primary_key=True,default=default_uuid)
    brand_id = db.Column(String(), index=True, nullable=False,unique=True)
    company_id = db.Column(String(), index=True, nullable=False)
    brand_logo_url = db.Column(String())
    email = db.Column(String())
    phone_number = db.Column(String())
    extra_data = db.Column(JSONB())
    active = db.Column(Boolean(), default=True)
    company_name = db.Column(String())
    name = db.Column(String())

class Store(CommonModel):
    __tablename__ = 'store'
    id = db.Column(String(), primary_key=True)
    store_id = db.Column(String(), index=True, nullable=False)
    brand_id = db.Column(String(), index=True, nullable=False)
    company_id = db.Column(String(), index=True, nullable=False)
    store_name = db.Column(String())
    open_time = db.Column(String())
    phone_number = db.Column(String())
    estimate_price = db.Column(Integer())
    estimate_price_max = db.Column(Integer())
    wifi_password = db.Column(String())

    is_car_parking = db.Column(SmallInteger())
    is_visa = db.Column(SmallInteger())
    is_sticky = db.Column(SmallInteger())

    store_longitude = db.Column(Float())
    store_latitude = db.Column(Float())
    store_radius_detail = db.Column(Integer())

    store_master_id = db.Column(String())

    district_id = db.Column(String())
    city_id = db.Column(String())
    city_name = db.Column(String())
    store_address = db.Column(String())
    image_path = db.Column(String())
    image_path_thumb = db.Column(String())

    workstation_id = db.Column(String())

    wallet_id = db.Column(String())
    wallet_fullname = db.Column(String())
    wallet_phone = db.Column(String())

    wallet_method = db.Column(String()) #by_company, by_store
    extra_data = db.Column(JSONB())
    active = db.Column(Boolean(), default=True)
    company_name = db.Column(String())
    


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


class MemberCard(CommonModel):
    __tablename__ = 'membercard'
    id = db.Column(String, primary_key=True, default=default_uuid)
    company_id = db.Column(String(), index=True, nullable=False)
    membercard_id = db.Column(String(), index=True, nullable=False, unique=True)
    wallet_id = db.Column(String(), index=True, nullable=True)
    start_date = db.Column(BigInteger())
    expire_date = db.Column(BigInteger())
    extra_data = db.Column(JSONB())
    status = db.Column(SmallInteger(), default=1)  # 1: active, 0: deactive
    save_dir = db.Column(String())
    user_no = db.Column(String(63), nullable=True) # student_id 
    # user_name =db.Column(String(),index=True, nullable=False)
    user_name = db.Column(String(255), nullable=False, index=True)



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

    extra_data = db.Column(JSONB())





# class Student(CommonModel):
#     __tablename__ = 'student'
#     id = db.Column(Integer, primary_key=True)
#     student_school_year = db.Column(String(30), nullable=False)
#     student_class = db.Column(String(30), nullable=False)
#     student_id = db.Column(String(20), nullable=False)
#     student_name = db.Column(String(255), nullable=False)
#     birthday = db.Column(String(20))
#     gender = db.Column(String(10))


# class QRUser(CommonModel):
#     __tablename__ = 'qruser'
#     id = db.Column(Integer, primary_key=True)
#     nameqr = db.Column(String(255), nullable=False)
#     saveDirectory = db.Column(String(255), nullable=False)


class QRworker(CommonModel):
    __tablename__ = 'qrworker'
    id = db.Column(Integer, primary_key=True)
    uid = db.Column(String(30), nullable=False)
    save_directory = db.Column(String(255), nullable=False)
    status = db.Column(String(10))
    namefile = db.Column(String(255))
    dowload_url = db.Column(String(255))





