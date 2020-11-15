import uuid
from datetime import datetime
from gatco.response import json, text
from application.server import app
from application.extensions import apimanager
from application.models.model import User, Norm, NormTemplate
from application.extensions import auth
from gatco.exceptions import ServerError
from gatco_apimanager.views.sqlalchemy.helpers import to_dict

def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass

def remove_categories(request=None, data=None, **kw):
	print(data)
	if "categories" in data:
		del(data["categories"])

apimanager.create_api(collection_name='norm', model=Norm,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func, remove_categories], PUT_SINGLE=[auth_func, remove_categories]),
    )


async def get_norm(norm_id):
	norm_item = Norm.query.filter(Norm.id == norm_id).first()

	if norm_item is not None:
		resp = to_dict(norm_item)
		resp["categories"] =[]
		resp["norm_details"] = [to_dict(item) for item in norm_item.norm_details]
		template_item = NormTemplate.query.filter(NormTemplate.norm_template_no == norm_item.norm_template_no).first()
		if template_item is not None:
			for cat in template_item.categories:
			
				cat_obj = { 
					"id": str(cat.id),
					"category_name": cat.category_name,
					"sort": cat.sort,
					"items": [{
						"id": str(it.id),
						"item_id": str(it.id),
						"item_no": it.item_no,
						"item_name": it.item_name,
						"unit_id": str(it.unit_id),
						"unit_no": it.unit_no,
						"unit_name": it.unit_name,
					} for it in cat.items]
				}

				resp["categories"].append(cat_obj)
			return resp
	return None


@app.route("/api/v1/get_norm", methods=["GET","POST"])
@app.route("/api/v1/get_norm/<id>", methods=["GET","POST"])
async def get_norm_api(request,id=None):

	norm_template_no = request.args.get("norm_template_no")
	# norm_template_no = "VTMAYCAO"

	
	if id is not None:
		resp = await get_norm(id)
		if resp is not None:
			return json(resp)
		
		return json({"error_code": "NOT_FOUND"}, status=520)

	template_item = NormTemplate.query.filter(NormTemplate.norm_template_no == norm_template_no).first()

	if template_item is not None:
		resp = {
			"norm_template_no": norm_template_no,
			"norm_name": template_item.norm_template_name,
			"year": datetime.now().year,
			"norm_fields": template_item.norm_fields,
			"categories": [],
			"norm_details": []
		}

		for cat in template_item.categories:
			
			cat_obj = { 
				"id": str(cat.id),
				"category_name": cat.category_name,
				"sort": cat.sort,
				"items": []
			}
			for it in cat.items:
				item_obj = {
					"id": str(it.id),
					"item_id": str(it.id),
					"item_no": it.item_no,
					"item_name": it.item_name,
					"unit_id": str(it.unit_id),
					"unit_no": it.unit_no,
					"unit_name": it.unit_name,
				}
				cat_obj["items"].append(item_obj)

				norm_detail_obj = {
					"id": str(uuid.uuid4()),
					"item_id": str(it.id),
					"item_no": it.item_no,
					"item_name": it.item_name,
					"unit_id": str(it.unit_id),
					"unit_no": it.unit_no,
					"unit_name": it.unit_name,
					"category_id": str(cat.id),
					"note": None,
					"data": {}
				}
				resp["norm_details"].append(norm_detail_obj)

			resp["categories"].append(cat_obj)
			#sort lai theo cat.sort
		return json(resp)

	return json({"error_code": "NOT_FOUND", "error_message": "Template not found"}, status=520)




testdata = {
	"id": None,
	"norm_template_no": "vat_tu_may_cao",
	# "norm_type_name": "Vật tư máy cào",
	"norm_fields": [
		{
			"name": "dinhmuc_cu_1000T",
			"label": "ĐỊNH MỨC (đvị/1000 tấn than). Lmáy >60m"
		},
		{
			"name": "dinhmuc_moi_1000T",
			"label": "ĐỊNH MỨC MỚI (đvị/1000 tấn than). Lmáy >60m"
		},
		{
			"name": "dinhmuc_moi_100ML_S96",
			"label": "ĐỊNH MỨC MỚI (đvị/100 mét lò). S=9,6m2"
		}
	],
	"norm_details": [
		{
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab151",
			"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
			"item_no": "234",
			"item_name": "Dầu EP140",
			"unit_id": "unit_123",
			"unit_no": "unit_1234",
			"unit_name": "Kg",
			"category_id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
			# "category_no": "",
			# "category_name": "",
			"data": {
				"dinhmuc_cu_1000T": 0.527,
				"dinhmuc_moi_1000T": 0.422,
				"dinhmuc_moi_100ML_S96": 12.95
			},
			"note": "Ghi chu 1"
		},
		{
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab155",
			"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af1",
			"item_no": "235",
			"item_name": "Bìa rơm",
			"unit_id": "unit_125",
			"unit_no": "unit_1235",
			"unit_name": "Tờ",
			"category_id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
			# "category_no": "",
			# "category_name": "",
			"data": {
				"dinhmuc_cu_1000T": 0.02,
				"dinhmuc_moi_1000T": 0.16,
				"dinhmuc_moi_100ML_S96": 1.43
			},
			"note": "Ghi chu 2"
		},


		{
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab154",
			"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
			"item_no": "234",
			"item_name": "Dầu EP140",
			"unit_id": "unit_123",
			"unit_no": "unit_1234",
			"unit_name": "Kg",
			"category_id": "4395f65c-04a9-4908-9c30-cdf92ecab153",
			# "category_no": "",
			# "category_name": "",
			"data": {
				"dinhmuc_cu_1000T": 0.528,
				"dinhmuc_moi_1000T": 0.428,
				"dinhmuc_moi_100ML_S96": 12.98
			},
			"note": "Ghi chu 2"
		},
	],
	"categories":[
		{
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab152",
			"category_name": "Vật tư máy cào SGB620/40",
			"sort": 100,
			"items": [
				{
					"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
					"item_no": "234",
					"item_name": "Dầu EP140",
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
		{
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab153",
			"category_name": "Vật tư máy cào C14",
			"sort": 101,
			"items": [
				{
					"item_id": "9d1124de-f1d7-4641-8f57-1ceead007af4",
					"item_no": "234",
					"item_name": "Dầu EP140",
					"unit_id": "unit_123",
					"unit_no": "unit_1234",
					"unit_name": "Kg"
				}
			]
		},
		{
			"id": "4395f65c-04a9-4908-9c30-cdf92ecab159",
			"category_name": "Máy cào CP70M",
			"sort": 102,
			"items": [
			]
		}
	
	]
}

	