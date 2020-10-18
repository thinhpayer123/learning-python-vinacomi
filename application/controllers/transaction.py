import aiohttp
from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, WalletUser, Transaction, Order
from application.extensions import auth
from gatco.exceptions import ServerError
# import json
from application.database import db

from gatco.response import json

from application.server import app
import ujson
import random
import string


def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass
apimanager.create_api(collection_name='transaction', model=Transaction,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )



@app.route('/icanteen/api/v1/foodbook_callback', methods=['POST'])
async def foodbook_callback(request):
    # {
    #     "event_id": 3,
    #     "event": "charge_history",
    #     "timestamp": "1601885358085",
    #     "charge_history": {
    #         "pos_parent":"FOODBOOK",
    #         "pos_id":296,
    #         "payment_method":"HEOVANGSCAN",
    #         "amount":10000.0,
    #         "user_code":"12354AIOURALIRURJALDKJF9807",
    #         "tran_id":"123154353"
    #     }
    # }

    param = request.json
    event = param.get("event")
    event_id = param.get("event_id")


    if event == "charge_history":
        charge_history = param.get("charge_history")

        from_wallet_id = None
        point_name = None
        company_id = None
        brand_id = charge_history.get("pos_parent")
        membercard_id = charge_history.get("user_code")
        tran_id = charge_history.get("tran_id")
        main_value = charge_history.get("amount")
        if main_value > 0:
            main_value = int(main_value)
        sub_value = 0
        value = main_value + sub_value

        store_id = charge_history.get("pos_id")

        resp_data = {
                            "charge_history": {
                                "pos_parent": brand_id,
                                "pos_id": store_id,
                                "user_code": membercard_id,
                                "state": "SUCCESS",
                                "response_message": "Thành công",
                                "tran_id": tran_id,
                                "tran_id_of_parner":  transaction_hash,
                                "paid_amount": value,
                                "paid_discount": 0
                            }
        }
        print(resp_data)
        # return json(resp_data)

        if store_id is not None:
            store  = Store.query.filter(Store.store_id == str(store_id)).first()
            if store is not None:
                company_id = store.company_id
                to_wallet_id = store.wallet_id
            
            if company_id is not None:
                company = Company.query.filter(Company.company_id == company_id).first()
                point_name = company.point_name if company is not None else None

        if membercard_id is not None:
            card = MemberCard.query.filter(MemberCard.membercard_id == membercard_id).first()
            if card is not None:
                from_wallet_id = card.wallet_id
            
        print(point_name, company_id, store_id, membercard_id)
        if point_name is not None:
            url = app.config.get("HEOVANG_WALLET_API_URL") + "/wallet/api/v1/privilege_send_point_transaction"
            app_id = app.config.get("HEOVANG_APP_ID")
            app_secret = app.config.get("HEOVANG_APP_SECRET")
            data = {
                "from": from_wallet_id,
                "to": to_wallet_id,
                "point_name": point_name,
                "company_id": company_id,
                "app_id" : app_id,
                "value": main_value + sub_value,
                "data": {
                    "standard": "HEOVANG",
                    "type": "payment",
                    "from": from_wallet_id,
                    "sender": from_wallet_id,
                    "to": to_wallet_id,
                    "brand_id": brand_id,
                    "store_id": store_id,
                    "main_value": main_value,
                    "sub_value": sub_value,
                    "value": main_value + sub_value,
                    "point_name": point_name,
                    "tran_id": tran_id,
                    "message": "Thanh toán đơn hàng",
                }
            }


            headers = {
                "Content-Type": "application/json",
            }
            # transaction_hash = ''.join(random.choice(string.ascii_letters) for i in range(16))

            # print("transaction_hash", transaction_hash)

            # resp_data = {
            #     "charge_history": {
            #         "pos_parent": brand_id,
            #         "pos_id": store_id,
            #         "user_code": membercard_id,
            #         "state": "SUCCESS",
            #         "response_message": "Thành công",
            #         "tran_id": tran_id,
            #         "tran_id_of_parner": transaction_hash,
            #         "paid_amount": value,
            #         "paid_discount": 0
            #     }
            # }
            #             # resp_data_json = ujson.loads(resp_data)
            #             # print(resp_data_json + type(resp_data_json))
            #             #luu lai don vao bang transaction 
            # charge_historys = resp_data.get("charge_history")
            # print(charge_history)
            # transaction_save = Transaction()
            # transaction_save.company_id = charge_historys.get("pos_parent")
            # transaction_save.tran_id = charge_historys.get("tran_id")
            # transaction_save.transaction_hash = transaction_hash
            # transaction_save.membercard_id = charge_historys.get("user_code")
            # transaction_save.status = charge_historys.get("state")
            # user_no= db.session.query(MemberCard).filter(membercard_id == charge_historys.get("user_code")).first()
            # transaction_save.username = user_no.user_name
            # transaction_save.from_wallet_id = data.get("from")
            # transaction_save.to_wallet_id = data.get("to")
            # transaction_save.value = data.get("value")
            # transaction_save.extra_data = resp_data
            # db.session.add(transaction_save)
            # db.session.commit()
            # print("transac save successfully")

            # return json(resp_data)
            print(data)
            print("param data", param)
            async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
                async with session.post(url, json=data) as response:
                    print(response.status, await response.text())
                    if response.status == 200:
                        resp = await response.json()
                        transaction_hash = resp.get("transaction_hash")
                        # transaction_hash = ''.join(random.choice(string.ascii_letters) for i in range(16))

                        print("transaction_hash", transaction_hash)

                        resp_data = {
                            "charge_history": {
                                "pos_parent": brand_id,
                                "pos_id": store_id,
                                "user_code": membercard_id,
                                "state": "SUCCESS",
                                "response_message": "Thành công",
                                "tran_id": tran_id,
                                "tran_id_of_parner": transaction_hash,
                                "paid_amount": value,
                                "paid_discount": 0
                            }
                        }
                        # resp_data_json = ujson.loads(resp_data)
                        # print(resp_data_json + type(resp_data_json))
                        #luu lai don vao bang transaction 
                        charge_historys = resp_data.get("charge_history")
                        print(charge_history)
                        transaction_save = Transaction()
                        transaction_save.company_id = charge_historys.get("pos_parent")
                        transaction_save.tran_id = charge_historys.get("tran_id")
                        transaction_save.transaction_hash = transaction_hash
                        transaction_save.membercard_id = charge_historys.get("user_code")
                        transaction_save.status = charge_historys.get("state")
                        user_no= db.session.query(MemberCard).filter(membercard_id == charge_historys.get("user_code")).first()
                        transaction_save.username = user_no.user_name
                        transaction_save.from_wallet_id = data.get("from")
                        transaction_save.to_wallet_id = data.get("to")
                        transaction_save.value = data.get("value")
                        transaction_save.extra_data = resp_data
                        db.session.add(transaction_save)
                        db.session.commit()
                        print("transac save successfully")

                        return json(resp)
    elif event == "sale_manager":
        data = await foodbook_callback_sale_manager(request)
        return json(data)
    

    # resp = {
    #     "charge_history": {
    #         "pos_parent": "FOODBOOK",
    #         "pos_id": 296,
    #         "user_code": "12354AIOURALIRURJALDKJF9807",
    #         "state": "SUCCESS",
    #         "response_message": "Thành công",
    #         "tran_id": "FOODBOOK1235",
    #         "tran_id_of_parner": "28983497",
    #         "paid_amount": 35000,
    #         "paid_discount": 0
    #     }
    # }
    return json({"error_code": "UNKNOWN_ERROR"}, status=520)

async def foodbook_callback_sale_manager(request):
    param = request.json   
    event = param.get("event")
    event_id = param.get("event_id")
    if event == "sale_manager":
        sale_manager = param.get("sale_manager")
        # pos_parent = sale_manager.get("pos_parent")
        # post_id = sale_manager.get("pos_id")
        tran_id = sale_manager.get("tran_id")
        tran_date = sale_manager.get("tran_date")
        total_amount = sale_manager.get("total_amount")
        items = sale_manager.get("items")
        membership_id = sale_manager.get("membership_id")
        membership_name = sale_manager.get("membership_name")
        payment_info = sale_manager.get("payment_info")
        order = Order()
        order.membership_id = membership_id
        order.membership_name = membership_name
        order.transaction_hash = tran_id
        order.tran_date = tran_date
        order.total_amount = total_amount
        order.payment_info = payment_info
        order.items = items
        db.session.add(order)
        db.session.commit()
    return json({"notify":"save to order"})
        




#     {
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
# 		"delivery_info": {                              
# 			"order_code": "15XK",                  //Mã đơn hàng vận chuyển (=foodbook_code lúc create order)
# 			"address": "106 hqv",                  //Địa chỉ giao hàng
# 			"lng": 0,                              //geo point
# 			"lat": 0                              
# 		}
# 	}
# }
    

    # pass




@app.route('/wallet/api/v1/membercard_send_transaction', methods=['POST'])
async def partner_send_point_transaction(request):
    # {
    #     "from": 'AB11234',
    #     "point_name": "HEOXU",
    #     "company_id": "IPOS",
    #     "app_id" : "id -app",
    #     "value": 12345,
    #     "data": strjson {
    #         "from": "from_uid",
    #         "to": "touid",
    #         "main_value": 123,
    #         "sub_value": 123,
    #         "value": 123,
    #         "point_name":"HEOXU"
    #     }
    # }
    
    param = request.json
    from_wallet_id = None
    to_wallet_id = None
    store_id = param.get("store_id")
    store = Store.query.filter(Store.store_id == store_id).first()
    if store is not None:
        company_id = store.company_id
        to_wallet_id = store.wallet_id
    
    membercard_id = param.get("membercard_id")
    point_name = param.get("point_name")
    main_value = param.get("main_value")
    sub_value = param.get("sub_value")

    

    if (company_id is None) or (membercard_id is None) or (point_name is None):
        return json({"error_code": "PARAM_ERROR", "error_message": ""}, status=520)

    if (main_value is None) or (sub_value is None):
        return json({"error_code": "PARAM_ERROR", "error_message": "Value error"}, status=520)

    
    card = MemberCard.query.filter(MemberCard.membercard_id == membercard_id).\
        filter(MemberCard.company_id == company_id).first()

    if card is not None:
        from_wallet_id = card.wallet_id

    if card is not None:
        from_wallet_id = card.wallet_id

    if (to_wallet_id is None) or (from_wallet_id is None):
        return json({"error_code": "NOT_FOUND", "error_message": "Not found wallet"}, status=520)

    url = app.config.get("WALLET_API_URL") + "/wallet/api/v1/privilege_send_point_transaction"
    app_id = app.config.get("HEOVANG_APP_ID")
    app_secret = app.config.get("HEOVANG_APP_SECRET")
    data = {
        "from": from_wallet_id,
        "point_name": point_name,
        "company_id": company_id,
        "app_id" : app_id,
        "value": main_value + sub_value,
        "data": ujson.dumps({
            "from": from_wallet_id,
            "to": to_wallet_id,
            "main_value": main_value,
            "sub_value": sub_value,
            "value": main_value + sub_value,
            "point_name": point_name
        })
    }

    headers = {
        "Content-Type": "application/json",
    }
    async with aiohttp.ClientSession(headers=headers, json_serialize=ujson.dumps) as session:
        async with session.post(url, json=data) as response:
            if response.status == 200:
                resp = await response.json()
                return json(resp)
    return json({},status=520)
