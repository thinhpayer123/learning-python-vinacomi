from application.extensions import apimanager
from application.models.model import User, Company, Brand, Store, Role, MemberCard, UserWallet, Transaction
from application.extensions import auth
from gatco.exceptions import ServerError
import json
from application.server import app

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
