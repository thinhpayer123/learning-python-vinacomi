from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction
from application.extensions import auth
from application.database import db

from gatco.exceptions import ServerError
from application.server import app
import requests
from gatco.response import json
import ujson
from application.models.model import    Store

def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass


@app.route('/api/v1/sync_store', methods=['GET'])
def sync_store(request):
    url_sent = "https://api.foodbook.vn/ipos/ws/xpartner/pos"
    headers = {'access_token': 'UYP3HCA3B2367D13TN2605D9DV3OMGQO','pos_parent': 'MAYASCHOOL'}
    response = requests.get(url_sent, headers)
    print(response)
# {
#   "Id": 20831,
#   "Phone_Number": "",
#   "Estimate_Price": 0,
#   "Estimate_Price_Max": 0,
#   "Is_Car_Parking": 0,
#   "Is_Visa": 0,
#   "Is_Sticky": 0,
#   "Pos_Name": "MAYA  SCHOOL - THẠCH THẤT",
#   "Pos_Longitude": -95.712891,
#   "Pos_Latitude": 37.09024,
#   "Pos_Radius_Detal": 100,
#   "Pos_Parent": "MAYASCHOOL",
#   "District_Id": 12918,
#   "Pos_Master_Id": 0,
#   "City_Id": 129,
#   "Pos_Address": "LÀNG MAYA, thôn Đồng Dâu, xã Tiến Xuân, Thạch Thất, Hà Nội",
#   "Image_Path": "https://image.foodbook.vn/upload/20200921/1600670792547_blob.png",
#   "Image_Path_Thumb": "https://image.foodbook.vn/upload/20200921/1600670792547_blob.png",
#   "Is_Order_Online": 0,
#   "Is_Order": 0,
#   "Is_Booking": 0,
#   "Is_Order_Later": 0,
#   "Delivery_Services": "",
#   "Workstation_Id": 0,
#   "Active": 1,
#   "Is_Show_Item_Type": 1,
#   "Min_Order_Price": 0,
#   "Ship_Price": 0,
#   "Is_Active_Event_ShareFb": 0,
#   "Event_ShareFb_Rate": 10,
#   "Order_Number_Server": 1,
#   "Order_Time_Average": 60,
#   "Order_Time_Min": 5,
#   "Order_Time_Max": 10,
#   "Phone_Manager": "",
#   "Order_Later_Detal": 60,
#   "Is_Call_Center": 0,
#   "Is_Pos_Mobile": 0,
#   "Vat_Tax_Rate": 0,
#   "Is_Verified": 1,
#   "Auto_Confirm": 0,
#   "Dm_Image_List": [],
#   "City_Name": "Hà Nội",
#   "Email": ""
# }
    if response.status_code ==200:

        receive = response.json()
        data_int = receive.get("data")[0]
        print(data_int)
        # print(type(data_int))
        # store_id = data_int["id"]
        a = str(data_int["Id"])
        print(a)
        checkitem = db.session.query(Store.brand_id==a).first()
        print(checkitem)
        if checkitem is  None:
            store = Store()
            store.store_id = str(data_int["Id"])
            store.brand_id = data_int["Pos_Name"]
            store.company_id = data_int["Pos_Parent"]
            store.active = data_int["Active"]
            store.store_name = data_int["Pos_Name"]
            # store.open_time = data_int("")
            store.phone_number = data_int["Phone_Number"]
            store.estimate_price = data_int["Estimate_Price"]
            store.estimate_price_max = data_int["Estimate_Price_Max"]
            # store.wifi_password = data_int("")
            store.is_car_parking = data_int["Is_Car_Parking"]
            store.is_sticky = data_int["Is_Sticky"]
            store.is_visa = data_int["Is_Visa"]
            store.store_longitude = data_int["Pos_Longitude"]
            store.store_latitude = data_int["Pos_Latitude"]
            store.store_radius_detail = data_int["Pos_Radius_Detal"]
            store.store_master_id = data_int["Pos_Master_Id"]
            store.district_id = data_int["District_Id"]
            store.city_id = data_int["City_Id"]
            store.city_name = data_int["City_Name"]
            store.store_address = data_int["Pos_Address"]
            store.image_path = data_int["Image_Path"]
            store.image_path_thumb = data_int["Image_Path_Thumb"]
            store.workstation_id = data_int["Workstation_Id"]
            # store.wallet_id = data_int("")
            # store.wallet_fullname = data_int("")
            # store.wallet_method = data_int("")
            # store.wallet_phone = data_int("")
            # store.extra_data = data_int("")
            db.session.add(store)
            db.session.commit()
        return json({"notify": "success synce"}, status=200)
    else:
        return json({"error_code": "UNKNOWN_ERROR"}, status=520)


# {
# 	"data": [
# 		{
# 			"Id": 195,
# 			"Description": "Đến với nhà hàng Foodbook để thưởng thức những món chay hấp dẫn cả về trình bày lẫn khẩu vị, hài hòa sẽ khiến quý khách không chỉ hài lòng về vị giác mà cả về thị giác",
# 			"Open_Time": "8:30 - 22:30",
# 			"Estimate_Price": 50000,
# 			"Estimate_Price_Max": 250000,
# 			"Wifi_Password": "public2015",
# 			"Pos_Name": "Nhà hàng Đất Xanh - Hà Nội",
# 			"Pos_Longitude": 105.8055089,
# 			"Pos_Latitude": 21.0460882,
# 			"Pos_Parent": "FOODBOOK",
# 			"Pos_Address": "Hoang Quoc Viet, Ha Noi",
# 			"Image_Path": "https://image.foodbook.vn/images/fb/pos/2016-11-17-15_57_23_17015964675-d66151df44-o.jpg",
# 			"Image_Path_Thumb": "https://image.foodbook.vn/fb/pos/2018-05-16-13_48_29_z990249119126-14689812d4695bb2f88647c93afceb59.jpg",
# 			"More_Info": "",
# 			"Is_Order_Online": 1,
# 			"Website_Url": "http://foodbook.vn",
# 			"Workstation_Id": 1,
# 			"Active": 1
# 		}
# 	]
# }




apimanager.create_api(collection_name='store', model=Store,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )