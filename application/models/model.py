""" Module represents a User. """

from sqlalchemy import (
    Column, String, Integer,
    DateTime, Date, Boolean,
    ForeignKey
)

from sqlalchemy import (
    Column, String, Integer, DateTime, Date, Boolean, DECIMAL, ForeignKey, Text
)
from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import relationship, backref

from application.database import db
from application.database.model import CommonModel, default_uuid



roles_users = db.Table('roles_users',
                       db.Column('user_id', Integer, db.ForeignKey('users.id', ondelete='cascade'), primary_key=True),
                       db.Column('role_id', Integer, db.ForeignKey('role.id', onupdate='cascade'), primary_key=True))


class Company(CommonModel):
    __tablename__ = 'company'
    id = db.Column(String(), primary_key=True)
    company_type = db.Column(String(), nullable=False)
    company_no = db.Column(String())
    name = db.Column(String())
    description = db.Column(String())
    phone_number = db.Column(String(63))
    email = db.Column(String())
    extra_data = db.Column(JSONB())
    active = db.Column(Boolean(), default=True)


class Brand(CommonModel):
    __tablename__ = 'brand'
    id = db.Column(String(), primary_key=True)
    brand_id = db.Column(String(), index=True, nullable=False,unique=True)
    company_id = db.Column(String(), index=True, nullable=False)
    brand_logo_url = db.Column(String())
    email = db.Column(String())
    phone_number = db.Column(String())
    extra_data = db.Column(JSONB())
    active = db.Column(Boolean(), default=True)

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


# class Item(CommonModel):
#     __tablename__ = 'item'
#     company_id = 

# class ItemStore(CommonModel):
#     __tablename__ = 'item'
#     company_id = 

class Role(CommonModel):
    __tablename__ = 'role'
    id = db.Column(String(), primary_key=True, default=default_uuid)
    name = db.Column(String(100), index=True, nullable=False, unique=True)
    display_name = db.Column(String(255), nullable=False)
    description = db.Column(String(255))

class User(CommonModel):
    __tablename__ = 'users'
    id = db.Column(String, primary_key=True, default=default_uuid())
    user_name = db.Column(String(255), nullable=False, index=True)
    full_name = db.Column(String(255), nullable=True)
    email = db.Column(String(255), nullable=False, index=True)
    password = db.Column(String(255), nullable=False)
    salt = db.Column(String(255), nullable=False)

    # Permission Based Attributes.
    active = db.Column(Boolean, default=True)
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))
    
    company_id = db.Column(String(), index=True, nullable=False)
    extra_data = db.Column(JSONB())

    # Methods
    def __repr__(self):
        """ Show user object info. """
        return '<User: {}>'.format(self.id)


class MemberCard(CommonModel):
    __tablename__ = 'membercard'
    id = db.Column(String, primary_key=True, default=default_uuid())
    company_id = db.Column(String(), index=True, nullable=False)
    membercard_id = db.Column(String(), index=True, nullable=False, unique=True)
    wallet_id = db.Column(String(), index=True, nullable=False)
    start_date = db.Column(BigInteger())
    expire_date = db.Column(BigInteger())
    extra_data = db.Column(JSONB())
    status = db.Column(SmallInteger(), default=1)  # 1: active, 0: deactive


class UserWallet(CommonModel):
    __tablename__ = 'user_wallet'
    id = db.Column(String, primary_key=True, default=default_uuid())
    company_id = db.Column(String(), index=True, nullable=False)
    company_type = db.Column(String(), nullable=False)
    user_id = db.Column(String(), index=True, nullable=False)
    wallet_id = db.Column(String(), index=True, nullable=False)
    relationship = db.Column(String(), nullable=False)
    company_no = db.Column(String(15), nullable=False)
    user_no = db.Column(String(63), nullable=False)
    extra_data = db.Column(JSONB())


class Transaction(CommonModel):
    __tablename__ = 'transaction'
    id = db.Column(String, primary_key=True, default=default_uuid())
    company_id = db.Column(String(), index=True, nullable=False)

    extra_data = db.Column(JSONB())




## Company Model

## Brand


# ItemStore

# Item


# class QuocGia(CommonModel):
#     __tablename__ = 'quocgia'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     mota = db.Column(String(255), nullable=True)
#     tinhthanh = db.relationship("TinhThanh", order_by="TinhThanh.id", cascade="all, delete-orphan")
    
# class TinhThanh(CommonModel):
#     __tablename__ = 'tinhthanh'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
#     quocgia = db.relationship('QuocGia')

# class KhachHang(CommonModel):
#     __tablename__ = 'khachhang'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
#     quocgia = db.relationship('QuocGia')
#     sodienthoai = db.Column(String(255))
#     email = db.Column(String(255))
#     diachi = db.Column(String(255))

# class HangHoa(CommonModel):
#     __tablename__ = 'hanghoa'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     gia = db.Column(Integer)
#     ghichu = db.Column(String(255))


# class sinhVien(CommonModel):
#     __tablename__ = 'sinhvien'
#     id = db.Column(Integer, primary_key=True)
#     masv = db.Column(String(255), nullable=False)
#     tensv = db.Column(String(255), nullable=False)
#     malop = db.Column(String(255))
#     birthday = db.Column(String(255))
#     gioitinh = db.Column(String(10))


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


# class QRworker(CommonModel):
#     __tablename__ = 'qrworker'
#     id = db.Column(Integer, primary_key=True)
#     uid = db.Column(String(30), nullable=False)
#     save_directory = db.Column(String(255), nullable=False)
#     status = db.Column(String(10))
#     namefile = db.Column(String(255))
#     dowload_url = db.Column(String(255))









# class QuocGia(CommonModel):
#     __tablename__ = 'quocgia'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     mota = db.Column(String(255), nullable=True)
#     tinhthanh = db.relationship("TinhThanh", order_by="TinhThanh.id", cascade="all, delete-orphan")
#
# class TinhThanh(CommonModel):
#     __tablename__ = 'tinhthanh'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
#     quocgia = db.relationship('QuocGia')
#
# class KhachHang(CommonModel):
#     __tablename__ = 'khachhang'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
#     quocgia = db.relationship('QuocGia')
#     sodienthoai = db.Column(String(255))
#     email = db.Column(String(255))
#     diachi = db.Column(String(255))
#
# class HangHoa(CommonModel):
#     __tablename__ = 'hanghoa'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     gia = db.Column(Integer)
#     ghichu = db.Column(String(255))
#
# class HoaDon(CommonModel):
#     __tablename__ = 'hoadon'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ghichu = db.Column(String(255))
#     khachhang_id = db.Column(Integer, ForeignKey('khachhang.id'), nullable=False)
#     tenkhachhang = db.Column(String(255))
#     ngaymua = db.Column(DateTime)
#
#     thanhtien = db.Column(DECIMAL)
#     vat = db.Column(Integer, default=10)
#     tongtien = db.Column(DECIMAL)
#
#     chitiethoadon = db.relationship("ChiTietHoaDon", order_by="ChiTietHoaDon.id", cascade="all, delete-orphan", lazy='dynamic')
#
# class ChiTietHoaDon(CommonModel):
#     __tablename__ = 'chitiethoadon'
#     id = db.Column(Integer, primary_key=True)
#     hoadon_id = db.Column(Integer, ForeignKey('hoadon.id'), nullable=False)
#
#     hanghoa_id = db.Column(Integer, ForeignKey('hanghoa.id'), nullable=False)
#     mahanghoa = db.Column(String(255))
#     tenhanghoa = db.Column(String(255))
#
#     soluong = db.Column(Integer)
#     dongia = db.Column(Integer)
#     thanhtien = db.Column(Integer)


