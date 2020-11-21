# import uuid
# from datetime import datetime
# from gatco.response import json, text
# from application.server import app
# from application.extensions import apimanager
# from application.models.model_plan import Plan
# from application.extensions import auth
# from gatco.exceptions import ServerError
# from gatco_apimanager.views.sqlalchemy.helpers import to_dict
# def auth_func(request=None, **kw):
#     #uid = auth.current_user(request)
#     #if uid is None:
#     #    raise ServerError("abc")
    
#     pass

# apimanager.create_api(collection_name='plan', model=Plan,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
#     )

# testdata = {
# 	"id": None,
# 	"department_id": "px1_id",
#     "department_no": "px1_id",
#     "department_name": "Phân xưởng Đào Lò 1",

#     "plan_no": "px1_id",
#     "plan_name": "px1_id",
#     "plan_type": "PX 1",

# 	# "norm_type_name": "Vật tư máy cào",
# 	"braziers": [
# 		{
# 			"brazier_id": "brazier_id11",
#             "brazier_no": "brazier_no11",
# 			"brazier_name": "Thượng TG(-250-:- -100) L7 -1 VM",
#             "brazier_type": "lochongthep",
#             "description": "brazier_id11",
#             #heso
# 		},
# 		{
# 			"brazier_id": "brazier_id22",
#             "brazier_no": "brazier_no22",
# 			"brazier_name": "Lò thượng KT (-90-:- -60) K8 VM",
#             "brazier_type": "lochongthep",
#             "description": "brazier_id22",
#             #heso
# 		},
# 		{
# 			"brazier_id": "brazier_id33",
#             "brazier_no": "brazier_no33",
# 			"brazier_name": "Thượng TG(-250-:- -100) L7 -1 VM",
#             "brazier_type": "lochongthep",
#             "description": "brazier_id33",
#             #heso
# 		},
# 	],

#     "plan_products":[],
#     "plan_items":[],
    
#     "plan_other_costs": [],
#     "plan_salaries": [],

#     "plan_fuel_items":[
#         {
# 			"id": "4395f65c-04a9-4908-9c30-cdf92ecab151",
# 			"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
# 			"item_no": "234",
# 			"item_name": "Ống từ van điều khiển đến xi lanh lật gầu",
# 			"unit_id": "unit_123",
# 			"unit_no": "unit_1234",
# 			"unit_name": "Ống",
# 			"category_id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
# 			# "category_no": "",
# 			# "category_name": "",
# 			# "data": {
#             "data_norm_brazier_id11":  0.68,
#             "data_factor_brazier_id11": 1.2,
#             "data_quantity_brazier_id11": 0.5,

#             "data_norm_brazier_id22":  0.68,
#             "data_factor_brazier_id22": 1.2,
#             "data_quantity_brazier_id22": 0.5,

#             "data_norm_brazier_id33":  0.68,
#             "data_factor_brazier_id33": 1.2,
#             "data_quantity_brazier_id33": 0.5,
# 			# },
#             "demand_quantity": 0.9,
#             "approved_quantity": 1.0,
# 			"note": "Ghi chu 1"
# 		},
#         {
# 			"id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
# 			"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
# 			"item_no": "234",
# 			"item_name": "Ống từ van điều khiển đến xi lanh lật gầu",
# 			"unit_id": "unit_123",
# 			"unit_no": "unit_1234",
# 			"unit_name": "Ống",
# 			"category_id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
# 			# "category_no": "",
# 			# "category_name": "",
# 			# "data": {
#             "data_norm_brazier_id11":  0.7,
#             "data_factor_brazier_id11": 1.4,
#             "data_quantity_brazier_id11": 0.5,

#             "data_norm_brazier_id22":  0.68,
#             "data_factor_brazier_id22": 1.2,
#             "data_quantity_brazier_id22": 0.5,

#             "data_norm_brazier_id33":  0.68,
#             "data_factor_brazier_id33": 1.2,
#             "data_quantity_brazier_id33": 0.5,
# 			# },
#             "demand_quantity": 0.9,
#             "approved_quantity": 1.0,
# 			"note": "Ghi chu 1"
# 		},
#     ],

# 	"categories":[
# 		{
# 			"id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
# 			"category_name": "Vật tư máy xúc lật hông ZCY-60",
# 			"sort": 100,
#             "category_type_id": "BDSCTX",
#             "category_type_name": "Vật tư thay thế BDTX",
# 			"items": [
# 				{
# 					"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
# 					"item_no": "234",
# 					"item_name": "Ống từ van điều khiển đến xi lanh lật gầu",
# 					"unit_id": "unit_123",
# 					"unit_no": "unit_1234",
# 					"unit_name": "Kg"
# 				},
# 				{
# 					"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af2",
# 					"item_no": "236",
# 					"item_name": "Bu lông M18/80",
# 					"unit_id": "unit_126",
# 					"unit_no": "unit_1236",
# 					"unit_name": "Bộ"
# 				}
# 			]
# 		},
	
# 	]
# }

# async def get_plan():
#     return testdata

# @app.route("/api/v1/get_plan", methods=["GET","POST"])
# @app.route("/api/v1/get_plan/<id>", methods=["GET","POST"])
# async def get_plan_api(request,id=None):
#     resp = await get_plan()
#     if resp is not None:
#         return json(resp)
    
#     return json({"error_code": "NOT_FOUND"}, status=520)


import uuid
from datetime import datetime
from gatco.response import json, text
from application.server import app
from application.extensions import apimanager
from application.models.model_plan import Plan, PlanFuelItemCategory
from application.models.model import Department, Brazier
from application.extensions import auth
from gatco.exceptions import ServerError
from gatco_apimanager.views.sqlalchemy.helpers import to_dict

def auth_func(request=None, **kw):
    
    pass

def convert_model_input(request=None, data=None, **kw):
	if "fuel_items_categories" in data:
		del(data["fuel_items_categories"])
	
	fuel_items = []

	for it in data["fuel_items"]:
		for bz in data["braziers"]:
			obj = {}
			for key in it:
				if not key.startswith("data_"):
					obj[key] = it[key]
			
			obj["id"] = str(uuid.uuid4())
			obj["brazier_id"] = bz["brazier_id"]
			obj["brazier_no"] = bz["brazier_no"]
			obj["brazier_name"] = bz["brazier_name"]
			obj["norm_quantity"] = it.get("data_norm_quantity_" + bz["brazier_id_dash"])
			obj["quantity"] = it.get("data_quantity_" + bz["brazier_id_dash"])
			obj["factor"] = it.get("data_factor_" + bz["brazier_id_dash"])
			fuel_items.append(obj)
	
	data["fuel_items"] = fuel_items
	
    

apimanager.create_api(collection_name='plan', model=Plan,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(
		GET_SINGLE=[auth_func], 
		GET_MANY=[auth_func], 
		POST=[auth_func, convert_model_input], 
		PUT_SINGLE=[auth_func, convert_model_input]
		),
    )

testdata = {
	"id": None,
	"department_id": "px1_id",
    "department_no": "px1_id",
    "department_name": "Phân xưởng Đào Lò 1",

    "plan_no": "px1_id",
    "plan_name": "px1_id",
    "plan_type": "PX 1",

	# "norm_type_name": "Vật tư máy cào",
	"braziers": [
		{
			"brazier_id": "brazier_id11",
            "brazier_no": "brazier_no11",
			"brazier_name": "Thượng TG(-250-:- -100) L7 -1 VM",
            "brazier_type": "lochongthep",
            "description": "brazier_id11",
            #heso
		},
		{
			"brazier_id": "brazier_id22",
            "brazier_no": "brazier_no22",
			"brazier_name": "Lò thượng KT (-90-:- -60) K8 VM",
            "brazier_type": "lochongthep",
            "description": "brazier_id22",
            #heso
		},
		{
			"brazier_id": "brazier_id33",
            "brazier_no": "brazier_no33",
			"brazier_name": "Thượng TG(-250-:- -100) L7 -1 VM",
            "brazier_type": "lochongthep",
            "description": "brazier_id33",
            #heso
		},
	],

    "plan_products":[],
    "plan_items":[],
    
    "plan_other_costs": [],
    "plan_salaries": [],

    "plan_fuel_items":[
        {
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab151",
			"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
			"item_no": "234",
			"item_name": "Ống từ van điều khiển đến xi lanh lật gầu",
			"unit_id": "unit_123",
			"unit_no": "unit_1234",
			"unit_name": "Ống",
			"category_id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
			# "category_no": "",
			# "category_name": "",
			# "data": {
            "data_norm_brazier_id11":  0.68,
            "data_factor_brazier_id11": 1.2,
            "data_quantity_brazier_id11": 0.5,

            "data_norm_brazier_id22":  0.68,
            "data_factor_brazier_id22": 1.2,
            "data_quantity_brazier_id22": 0.5,

            "data_norm_brazier_id33":  0.68,
            "data_factor_brazier_id33": 1.2,
            "data_quantity_brazier_id33": 0.5,
			# },
            "demand_quantity": 0.9,
            "approved_quantity": 1.0,
			"note": "Ghi chu 1"
		},
        {
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
			"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
			"item_no": "234",
			"item_name": "Ống từ van điều khiển đến xi lanh lật gầu",
			"unit_id": "unit_123",
			"unit_no": "unit_1234",
			"unit_name": "Ống",
			"category_id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
			# "category_no": "",
			# "category_name": "",
			# "data": {
            "data_norm_brazier_id11":  0.7,
            "data_factor_brazier_id11": 1.4,
            "data_quantity_brazier_id11": 0.5,

            "data_norm_brazier_id22":  0.68,
            "data_factor_brazier_id22": 1.2,
            "data_quantity_brazier_id22": 0.5,

            "data_norm_brazier_id33":  0.68,
            "data_factor_brazier_id33": 1.2,
            "data_quantity_brazier_id33": 0.5,
			# },
            "demand_quantity": 0.9,
            "approved_quantity": 1.0,
			"note": "Ghi chu 1"
		},
    ],

	"plan_fuel_categories":[
		{
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
			"category_name": "Vật tư máy xúc lật hông ZCY-60",
			"sort": 100,
            "category_type_id": "BDSCTX",
            "category_type_name": "Vật tư thay thế BDTX",
			"items": [
				{
					"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
					"item_no": "234",
					"item_name": "Ống từ van điều khiển đến xi lanh lật gầu",
					"unit_id": "unit_123",
					"unit_no": "unit_1234",
					"unit_name": "Kg"
				},
				{
					"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af2",
					"item_no": "236",
					"item_name": "Bu lông M18/80",
					"unit_id": "unit_126",
					"unit_no": "unit_1236",
					"unit_name": "Bộ"
				}
			]
		},
	
	]
}

async def get_plan(id=None):
	plan = Plan.query.filter(Plan.id == id).first()
	if plan is not None:
		department_id = plan.department_id
		resp = to_dict(plan)
		resp["fuel_items_categories"] = []
		resp["fuel_items"] = []
		
		#fuel_items_category
		fuel_item_cats = PlanFuelItemCategory.query.filter(PlanFuelItemCategory.department_id == department_id).all()
		for cat in fuel_item_cats:
			obj = to_dict(cat)
			obj["items"] = []
			for it in cat.items:
				itobj = {
						"item_id": str(it.id),
						"item_no": it.item_no,
						"item_name": it.item_name,
						"unit_id": str(it.unit_id),
						"unit_no": it.unit_no,
						"unit_name": it.unit_name,
					}
				obj["items"].append(itobj)
			resp["fuel_items_categories"].append(obj)
		#end_fuel_items_category

		#fuel_items
		fuel_items_map = {}
		for item in plan.fuel_items:
			print(item.norm_quantity)
			map_key = (str(item.item_id) + "_" + str(item.category_id))
			if map_key not in fuel_items_map:
				fuel_items_map[map_key] = {
					'plan_id': item.plan_id,
					'item_id': item.item_id,
					'item_no': item.item_no,
					'item_name': item.item_name,
				}
				itemobj = to_dict(item)
				for key in itemobj:
					if key not in ["id", "norm_quantity", "quantity", "factor", "brazier_id", "brazier_no", "brazier_name"]:
						fuel_items_map[map_key][key] = itemobj[key]
				fuel_items_map[map_key]["id"] = str(uuid.uuid4())

			brazier_id = str(item.brazier_id)
			fuel_items_map[map_key]["data_norm_quantity_" + brazier_id.replace("-", "_")] = item.norm_quantity
			fuel_items_map[map_key]["data_quantity_" + brazier_id.replace("-", "_")] = item.quantity
			fuel_items_map[map_key]["data_factor_" + brazier_id.replace("-", "_")] = item.factor
			
		
		for key in fuel_items_map:
			resp["fuel_items"].append(fuel_items_map[key])
		#end fuel_items
		#salary

		#end salary
		return resp
	return None

@app.route("/api/v1/get_plan", methods=["GET","POST"])
@app.route("/api/v1/get_plan/<id>", methods=["GET","POST"])
async def get_plan_api(request,id=None):
	department_id = "b54c0bf9-5f1a-4c4d-880a-41dbae06949f"

	if id is not None:
		resp = await get_plan(id)
		if resp is not None:
			return json(resp)
	else:
		
	
		resp = {
			"id": None,
			"department_id": department_id,
			"department_no": None,
			"department_name": None,

			"plan_no": None,
			"plan_name": None,
			# "plan_type": "PX 1",

			# "norm_type_name": "Vật tư máy cào",
			"braziers": [],

			"products":[],
			"items":[],
			
			"other_costs": [],
			"salaries": [],

			"fuel_items":[],

			"fuel_items_categories":[]
		}
		department = Department.query.filter(Department.id == department_id).first()
		if department is not None:
			resp["department_name"] = department.name
			resp["department_no"] = department.department_no

		braziers = Brazier.query.filter(Brazier.department_id == department_id).all()
		for item in braziers:
			obj = to_dict(item)
			obj["brazier_id"] = obj["id"]
			obj["brazier_name"] = obj["name"]
			obj["brazier_id_dash"] = obj["id"].replace("-", "_")
			
			resp["braziers"].append(obj)

		fuel_item_cats = PlanFuelItemCategory.query.filter(PlanFuelItemCategory.department_id == department_id).all()
		for cat in fuel_item_cats:
			obj = to_dict(cat)
			obj["items"] = []
			for it in cat.items:
				
				itobj = {
						"item_id": str(it.id),
						"item_no": it.item_no,
						"item_name": it.item_name,
						"unit_id": str(it.unit_id),
						"unit_no": it.unit_no,
						"unit_name": it.unit_name,
					}
				obj["items"].append(itobj)

				plan_item_obj = {
					"id": str(uuid.uuid4()),
					"plan_id": None,
					"item_id": str(it.id),
					"item_no": it.item_no,
					"item_name": it.item_name,
					"unit_id": str(it.unit_id),
					"unit_no": it.unit_no,
					"unit_name": it.unit_name,
					"category_id": str(cat.id),
					
					"demand_quantity": None,
					"approved_quantity": None,
					"note": None
				}
				for britem in braziers:
					plan_item_obj["data_norm_quantity_" + str(britem.id).replace("-", "_")] = None
					plan_item_obj["data_factor_" + str(britem.id).replace("-", "_")] = None
					plan_item_obj["data_quantity_" + str(britem.id).replace("-", "_")] = None

				resp["fuel_items"].append(plan_item_obj)

			resp["fuel_items_categories"].append(obj)
		
		#salary
		for bz in braziers:
			obj = {
				"id": str(uuid.uuid4()),
				"plan_id": None,
				"item_id": None,
				"item_no": None,
				"item_name": None,
				"unit_id": None,
				"unit_no": None,
				"unit_name": None,
				"category_id": None,
				"brazier_id": str(bz.id),
				"brazier_no": bz.brazier_no,
				"brazier_name": bz.name,

				"quantity": None,
				"list_salary_price": None,
				"list_insurance_price": None,
				"salary_amount": None,
				"insurance_amount": None,
				"total_amount": None,
				"factor": None,

				"working_days": None,
				"average_salary": None,
				"note": None
			}
			resp["salaries"].append(obj)


		for catobj in resp["fuel_items_categories"]:
			if catobj["type"] == "salary":
				for itemobj in catobj["items"]:
					obj = {
						"id": str(uuid.uuid4()),
						"plan_id": None,
						"item_id": itemobj["item_id"],
						"item_no": itemobj["item_no"],
						"item_name": itemobj["item_name"],
						"unit_id": itemobj["unit_id"],
						"unit_no": itemobj["unit_no"],
						"unit_name": itemobj["unit_name"],

						"category_id": catobj["id"],
						"brazier_id": None,
						"brazier_no": None,
						"brazier_name": None,

						"quantity": None,
						"list_salary_price": None,
						"list_insurance_price": None,
						"salary_amount": None,
						"insurance_amount": None,
						"total_amount": None,
						"factor": None,

						"working_days": None,
						"average_salary": None,
						"note": None
					}
					resp["salaries"].append(obj)
				break
			
		#end salary
		#other cost
		for catobj in resp["fuel_items_categories"]:
			if catobj["type"] == "other_cost":
				for itemobj in catobj["items"]:
					obj = {
						"id": str(uuid.uuid4()),
						"plan_id": None,
						"item_id": itemobj["item_id"],
						"item_no": itemobj["item_no"],
						"item_name": itemobj["item_name"],
						"unit_id": itemobj["unit_id"],
						"unit_no": itemobj["unit_no"],
						"unit_name": itemobj["unit_name"],
						"category_id": catobj["id"],

						"working_days": None,
						"list_price": None,
						"quantity_per_day": None,
						"quantity": None,
						"total_amount": None,
						"note": None
					}
					resp["other_costs"].append(obj)
				break

		
		return json(resp)
	return json({"error_code": "NOT_FOUND"}, status=520)
