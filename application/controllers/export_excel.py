# import string
# import random
# import uuid
# import base64
# import re
# import binascii
# import copy
# import time
# import ujson
# from datetime import datetime
# from math import floor


# # import openpyxl
# # from openpyxl import Workbook
# # from openpyxl.styles import PatternFill, Border, Side, Alignment, Protection, Font



# from gatco.response import json, text, html, file
# from application.extensions import auth, apimanager
# from application.database import db
# from application.server import app
# from gatco_apimanager.views.sqlalchemy.helpers import to_dict

# import xlrender

# from .norm import get_norm


# # from application.controllers.helpers.helper_common import convert_timestamp_to_string
# # from application.controllers.helpers.helper_common import validate_user, convert_text_khongdau, current_uid, get_current_user

# @app.route('/api/v1/export/norm/<id>')
# async def export_norm(request=None, id=None):

#     if (id is not None):
#         data = await get_norm(id)
#         norm_template_no = data.get("norm_template_no")
#         deffile = "exceltpl/DINHMUC_"+norm_template_no+".json"
#         template = "exceltpl/DINHMUC_"+norm_template_no+".xlsx"
#         render = xlrender.xlrender(template, deffile)
#         headerobj = {
#             "norm_document_no": data["norm_document_no"],
#             "year": data["year"]
#         }

#         render.put_area("header", ujson.dumps(headerobj))

#         render.put_area("detail_header")

#         ## cac category
#         for cat in data.get("categories", []):
#             render.put_area("detail_category", ujson.dumps(cat))
#             for item in data.get("norm_details", []):
#                 if cat["id"] == item["category_id"]:
#                     if "data" in item:
#                         for field in data.get("norm_fields", []):
#                             item["data_" + field["name"]]  = item["data"].get(field["name"], 0)
#                     print(item)
#                     render.put_area("detail_item", ujson.dumps(item))

#         ## cac item

#         # for vattu in data.get("vattu", []):
#         #     render.put_area("vattu", ujson.dumps(vattu))

#         render.put_area("footer")

#         filename = str(time.time()) + "_" + "DINHMUC_"+norm_template_no+".xlsx"
#         render.save("/tmp/" + filename)

#         return await file("/tmp/" + filename, mime_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
#                           filename=filename)


#         return json(data)
    












#     # data = await thongke_theo_donvi(param)

#     # deffile = "exceltpl/thongke_baocao_theodonviyte.json"
#     # template = "exceltpl/thongke_baocao_theodonviyte.xlsx"
#     # render = xlrender.xlrender(template, deffile)

#     # headerobj = {
#     #     "tendonvi": data["tendonvi"],
#     #     "tungay": datetime.fromtimestamp(int((data["tungay"]))).strftime("%m/%d/%Y"),
#     #     "denngay": datetime.fromtimestamp(int((data["denngay"]))).strftime("%m/%d/%Y"),
#     # }

#     # render.put_area("header", ujson.dumps(headerobj))

#     # for vattu in data.get("vattu", []):
#     #     render.put_area("vattu", ujson.dumps(vattu))

#     # filename = str(time.time()) + "_" + "thongke_baocao_theodonvi.xlsx"
#     # render.save(filename)

#     # return await file(filename, mime_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
#     #                   filename='ds-thongke_baocao_theodonvi-' + str(time.time())+'.xlsx')