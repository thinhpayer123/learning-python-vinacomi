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
    company_id = db.Column(String())
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
    id = db.Column(String(), primary_key=True,default=default_uuid)
    store_id = db.Column(String(), index=True, nullable=False)
    brand_id = db.Column(String(), index=True, nullable=False)
    company_id = db.Column(String(), index=True, nullable=False)
    active = db.Column(Boolean(), default=True)
    company_name = db.Column(String())
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
    main_value = db.Column(BigInteger()) # tiền trong tài khoản chính 
    sub_value = db.Column(BigInteger()) # tiền trong tài khoản khuyến mãi 
    value = db.Column(BigInteger()) # tổng tiền trả 
    membercard_id =  db.Column(String(), index=True) #payment, transfer
    username = db.Column(String())
    extra_data = db.Column(JSONB())
    status_worker = db.Column(String(),index=True)


class Order(CommonModel):
    __tablename__ = 'order'
    id = db.Column(String, primary_key=True, default=default_uuid)
    membership_id = db.Column(String(),index=True)
    membership_name = db.Column(String())
    tran_id = db.Column(String(), index=True)
    transaction_hash = db.Column(String(),index=True)
    tran_date = db.Column(BigInteger())
    tran_date_fmt = db.Column(String()) #trandate_format
    total_amount = db.Column(String())# tổng tiền 

    items = db.Column(JSONB())
    payment_info = db.Column(JSONB())

    # pass

# {
# 	"event_id": 11,                  //client switch theo biến này để xử lý logic code
# 	"event": "sale_manager",            //tên event
# 	"timestamp": "1509702721626",                        
# 	"sale_manager": {                                
# 		"pos_name": "Nhà Hàng Đất Xanh - Hoàng Quốc Việt",            //tên thương hiệu
# 		"pos_type": "ipos_pc",                  
# 		"channels": [                              
# 			{
# 				"channel": "voucher",
# 				"source": "10000007"
# 			},
# 			{
# 				"channel": "delivery",
# 				"source": "10000006"
# 			}
# 		],
# 		"pos_parent": "FOODBOOK",           //tên thương hiệu
# 		"pos_id": 296,                      //id điểm bán hàng
# 		"tran_id": "33902",                 //id giao dịch dưới máy POS. Unique: pos_parent + tran_id  
# 		"tran_date": "2017-11-03 16:51:00",            
# 		"created_at": "2017-11-03 16:52:01",            
# 		"discount_extra": 0,                  //thông tin giảm giá của nhà hàng (%)
# 		"discount_extra_amount": 0,           //thông tin giảm giá của nhà hàng tính ra tiền
# 		"service_charge": 0,            //thông tin phí dịch vụ của hóa đơn (%)
# 		"service_charge_amount": 0,     //thông tin phí dịch vụ tính ra tiền
# 		"coupon_amount": 3600,          //số tiền giảm giá của bên thứ 3
# 		"coupon_code": "FBDAT",         //mã voucher giảm giá
# 		"ship_fee_amount": 0,           //phí vận chuyển
# 		"discount_amount_on_item": 4000,  //thông tin giảm giá trên món ăn (của nhà hàng)          
# 		"original_amount": 40000,         //Not include any discount. Before VAT, Addition Service...
# 		"vat_amount": 0,                  //tiền VAT    
# 		"bill_amount": 36000,             //NOT include discount = original_amount + ship_fee_amount + service_charge_amount + vat_amount
# 		"total_amount": 32400,            ///amount of customer really pay. = (original_amount + ship_fee_amount + service_charge_amount + vat_amount) - (voucher_amount + item_discount_amount + discount_extra_amount)      
# 		"membership_name": "DTTTTTTTTT1",                  
# 		"membership_id": "84967142868",                        
# 		"sale_note": "Từ FOODBOOK_CMS(2017-11-03 16:51:06):",      
# 		"tran_no": "TA0014",                                    
# 		"sale_type": "TA",                                    
# 		"hour": 16,                                          
# 		"pos_city": 129,                                          
# 		"pos_district": 12904,                                    
# 		"items": [                                          
# 			{
# 				"item_id": "SU04",
# 				"item_name": "Thủy mộc Sơn cầm ",
# 				"price": 20000,
# 				"quantity": 1,
# 				"amount": 18000,
# 				"discount_amount": 2000
# 			},
# 			{
# 				"item_id": "SU04",
# 				"item_name": "Thủy mộc Sơn cầm ",
# 				"price": 20000,
# 				"quantity": 1,
# 				"amount": 18000,
# 				"discount_amount": 2000
# 			}
# 		],
# 		"payment_info": [                                    
# 			{
# 				"tran_id": "FOODBOOK33902",            //mã đơn hàng In trên bill QR code
# 				"method_id": "CASH",            
# 				"name": "CASH",
# 				"currency": "VND",
# 				"amount": 32400,                  
# 				"trace_no": ""                  //Id giao dịch thanh toán của bên thứ 3
# 			}
# 		],
# 	}
# }





# {
#   "_id": "IPOSECOSYSTEM_IPOSECOSYSTEM_DL_1A000",
#   "_rev": "1-6e76d2525e21ec070222a0a3188d0c38",
#   "coupon_amount": 0,
#   "contact_phone_number": "+84398170149",
#   "brand_id": "IPOSECOSYSTEM",
#   "membership_id": "84398170149",
#   "membership_type": "PLA",
#   "membership_name": "Hoàng Oanh",
#   "amount": 95150,

#   "membership_wallet_id": "AA00009262",

#   "contact_fullname": "Hoàng Oanh",
#   "total_amount": 112050.00000000001,

#   "store_id": "10613"
# ,
#   "payment_info": [
#     {
#       "amount": 112050,
#       "currency": "VNĐ",
#       "image_url": "https://heovang.ss-hn-1.vccloud.vn:443/images/merchant-profile/1575273105178-Icon-App-60x603x.png",
#       "name": "SKYBANK",
#       "payment_method_type": "HEOVANG_WALLET",
#       "method_id": "SKYBANK",
#       "transaction_hash": "0x36054c1335822878b034fd9becfe310dbc68a7f754a5bd8a7e84c8adbfb2140b"
#     }
#   ],

#   "items": [
#     {
#       "quantity": 1,
#       "discount": 0.45,
#       "amount": 30250.000000000004,
#       "item_name": "BƯỞI NHA ĐAM",
#       "foc": 1,
#       "is_submit": false,
#       "image_url": "https://heovang.ss-hn-1.vccloud.vn:443/images/merchant-profile/1566273786384-BUOI_NHA_AM_-_F.jpg",
#       "item_id": "BND",
#       "price": 55000,
#       "row_state": 1,
#       "item_type_id": "NTCT",
#       "is_eat_with": 0
#     },
#     {
#       "quantity": 1,
#       "discount": 0.45,
#       "amount": 32450.000000000004,
#       "item_name": "SINH TỐ BƠ",
#       "foc": 1,
#       "is_submit": false,
#       "image_url": "https://heovang.ss-hn-1.vccloud.vn:443/images/merchant-profile/1566274674840-SINH_TO_BO_-_F.jpg",
#       "item_id": "STB",
#       "price": 59000,
#       "row_state": 1,
#       "item_type_id": "STTCT",
#       "is_eat_with": 0
#     },
#     {
#       "quantity": 1,
#       "discount": 0.45,
#       "amount": 32450.000000000004,
#       "item_name": "SINH TỐ BƠ & MÃNG CẦU",
#       "foc": 1,
#       "is_submit": false,
#       "image_url": "https://heovang.ss-hn-1.vccloud.vn:443/images/merchant-profile/1565769745071-Sinh_to_bo_mang_cau.jpg",
#       "item_id": "STBMC",
#       "price": 59000,
#       "row_state": 1,
#       "item_type_id": "STTCT",
#       "is_eat_with": 0
#     }
#   ],


#   "membership_phone_number": "+84398170149",
#   "discount_extra": 0.1,
#   "company_id": "IPOSECOSYSTEM",
#   "app_id": "e00cb617-d001-4607-8ba1-2f74de80a8d1",
#   "created_at": 1581644203,
#   "updated_at": 1581645227,
#   "coupon_code": "",
#   "send_order_to": 1,
#   "doc_type": "delivery_order",
#   "foodbook_code": "DL_2A598ZB",
#   "id": "DL_2A598ZB",
#   "status": "COMPLETED",
#   "history_state_order": [
#     {
#       "created_at": 1581644204,
#       "status": "WAIT_PAYMENT",
#       "note": ""
#     },
#     {
#       "created_at": 1581644212,
#       "status": "PAYMENT",
#       "note": ""
#     },
#     {
#       "created_at": 1581644213,
#       "status": "WAIT_CONFIRM",
#       "note": "Tên người nhận: Hoàng Oanh, Số điện thoại người nhận: +84398170149, Note: ",
#       "time": "2020-02-14 08:36:53"
#     },
#     {
#       "created_at": 1581644236,
#       "status": "CONFIRMED",
#       "note": "dbabd8c12aa17772",
#       "time": "2020-02-14 08:37:16"
#     },
#     {
#       "created_at": 1581644335,
#       "status": "ASSIGNING",
#       "note": "; Đơn hàng DL_2A598ZB. Tài xế đi vào cửa hàng IPOSECOSYSTEM Coffee nói AhaMove đến lấy đồ đi giao.",
#       "time": "2020-02-14 08:38:55"
#     },
#     {
#       "created_at": 1581644353,
#       "status": "ACCEPTED",
#       "note": "; Đơn hàng DL_2A598ZB. Tài xế đi vào cửa hàng IPOSECOSYSTEM Coffee nói AhaMove đến lấy đồ đi giao.",
#       "time": "2020-02-14 08:39:13"
#     },
#     {
#       "created_at": 1581644963,
#       "status": "IN PROCESS",
#       "note": "; Đơn hàng DL_2A598ZB. Tài xế đi vào cửa hàng IPOSECOSYSTEM Coffee nói AhaMove đến lấy đồ đi giao.",
#       "time": "2020-02-14 08:49:23"
#     },
#     {
#       "created_at": 1581645227,
#       "status": "COMPLETED",
#       "note": "; Đơn hàng DL_2A598ZB. Tài xế đi vào cửa hàng IPOSECOSYSTEM Coffee nói AhaMove đến lấy đồ đi giao.",
#       "time": "2020-02-14 08:53:47"
#     }
#   ],
#   "ship_fee": 26000,
#   "delivery_partner_info": {
#     "partner_name": "AHAMOVE_PREPAID",
#     "order_code": "DL_2A598ZB",
#     "ahamove_code": "RG9RR7",
#     "ahamove_link": "https://cloud.ahamove.com/share-order/RG9RR7/842473006336?info=false",
#     "driver_id": "84989099281",
#     "driver_name": "Trần Như Trường",
#     "driver_plate": "",
#     "partner_ship_fee": 26000,
#     "distance": 0.85,
#     "status": "COMPLETED",
#     "note": "; Đơn hàng DL_2A598ZB. Tài xế đi vào cửa hàng IPOSECOSYSTEM Coffee nói AhaMove đến lấy đồ đi giao."
#   }
# }





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





