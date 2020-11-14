define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"collectionName": "company", 
			"route": "company/collection(/:param)",
			"$ref": "app/view/Company/CollectionView",
		},
		{
			"collectionName": "company",
			"route": "company/model(/:param)",
			"$ref": "app/view/Company/ModelView",
		},
		{
			"collectionName": "brand", 
			"route": "brand/collection(/:param)",
			"$ref": "app/view/Brand/CollectionView",
		},
		{
			"collectionName": "brand",
			"route": "brand/model(/:param)",
			"$ref": "app/view/Brand/ModelView",
		},
		{
			"collectionName": "membercard", 
			"route": "membercard/collection(/:param)",
			"$ref": "app/view/MemberCard/CollectionView",
		},
		{
			"collectionName": "membercard",
			"route": "membercard/model(/:param)",
			"$ref": "app/view/MemberCard/ModelView",
		},		
		{
			"collectionName": "role", 
			"route": "role/collection(/:param)",
			"$ref": "app/view/Role/CollectionView",
		},
		{
			"collectionName": "role",
			"route": "role/model(/:param)",
			"$ref": "app/view/Role/ModelView",
		},
		{
			"collectionName": "order", 
			"route": "order/collection(/:param)",
			"$ref": "app/view/Order/CollectionView",
		},
		{
			"collectionName": "order",
			"route": "order/model(/:param)",
			"$ref": "app/view/Order/ModelView",
		},			
		{
			"collectionName": "store", 
			"route": "store/collection(/:param)",
			"$ref": "app/view/Store/CollectionView",
		},
		{
			"collectionName": "store",
			"route": "store/model(/:param)",
			"$ref": "app/view/Store/ModelView",
		},
		{
			"collectionName": "transaction", 
			"route": "transaction/collection(/:param)",
			"$ref": "app/view/Transaction/CollectionView",
		},
		{
			"collectionName": "transaction",
			"route": "transaction/model(/:param)",
			"$ref": "app/view/Transaction/ModelView",
		},
		{
			"collectionName": "users", 
			"route": "users/collection(/:param)",
			"$ref": "app/view/User/CollectionView",
		},
		{
			"collectionName": "users",
			"route": "users/model(/:param)",
			"$ref": "app/view/User/ModelView",
		},
		{
			"collectionName": "wallet_user", 
			"route": "wallet_user/collection(/:param)",
			"$ref": "app/view/UserWallet/CollectionView",
		},
		{
			"collectionName": "wallet_user",
			"route": "wallet_user/model(/:param)",
			"$ref": "app/view/UserWallet/ModelView",
		},
		{
			"collectionName": "item", 
			"route": "item/collection(/:id)",
			"$ref": "app/view/item/CollectionView",

		},
		{
			"collectionName": "item",
			"route": "item/model(/:id)",
			"$ref": "app/view/item/ModelView",
		},

		{
			"collectionName": "item_category", 
			"route": "item_category/collection(/:id)",
			"$ref": "app/view/item_category/CollectionView",

		},
		{
			"collectionName": "item_category",
			"route": "item_category/model(/:id)",
			"$ref": "app/view/item_category/ModelView",
		},
		{
			"collectionName": "norm", 
			"route": "norm/collection(/:id)",
			"$ref": "app/view/norm/CollectionView",

		},
		{
			"collectionName": "norm",
			"route": "norm/model(/:id)",
			"$ref": "app/view/norm/ModelView",
		},
		{
			"collectionName": "norm_detail", 
			"route": "norm_detail/collection(/:id)",
			"$ref": "app/view/norm_detail/CollectionView",

		},
		{
			"collectionName": "norm_detail",
			"route": "norm_detail/model(/:id)",
			"$ref": "app/view/norm_detail/ModelView",
		},


		{
			"collectionName": "norm_detail_quantity", 
			"route": "norm_detail_quantity/collection(/:id)",
			"$ref": "app/view/norm_detail_quantity/CollectionView",

		},
		{
			"collectionName": "norm_detail_quantity",
			"route": "norm_detail_quantity/model(/:id)",
			"$ref": "app/view/norm_detail_quantity/ModelView",
		},

		{
			"collectionName": "item_class", 
			"route": "item_class/collection(/:id)",
			"$ref": "app/view/item_class/CollectionView",

		},
		{
			"collectionName": "item_class",
			"route": "item_class/model(/:id)",
			"$ref": "app/view/item_class/ModelView",
		},


		{
			"collectionName": "norm_document", 
			"route": "norm_document/collection(/:id)",
			"$ref": "app/view/norm_document/CollectionView",

		},
		{
			"collectionName": "norm_document",
			"route": "norm_document/model(/:id)",
			"$ref": "app/view/norm_document/ModelView",
		},

		{
			"collectionName": "norm_template", 
			"route": "norm_template/collection(/:id)",
			"$ref": "app/view/norm_template/CollectionView",

		},
		{
			"collectionName": "norm_template",
			"route": "norm_template/model(/:id)",
			"$ref": "app/view/norm_template/ModelView",
		},

		{
			"collectionName": "norm_decision", 
			"route": "norm_decision/collection(/:id)",
			"$ref": "app/view/norm_decision/CollectionView",

		},
		{
			"collectionName": "norm_decision",
			"route": "norm_decision/model(/:id)",
			"$ref": "app/view/norm_decision/ModelView",
		},

		{
			"collectionName": "norm", 
			"route": "norm_well/collection(/:id)",
			"$ref": "app/view/norm_well/CollectionView",

		},
		{
			"collectionName": "norm",
			"route": "norm_well/model(/:id)",
			"$ref": "app/view/norm_well/ModelView",
		},
		{
			"collectionName": "norm", 
			"route": "norm_conveyor_belt/collection(/:id)",
			"$ref": "app/view/norm_conveyor_belt/CollectionView",

		},
		{
			"collectionName": "norm",
			"route": "norm_conveyor_belt/model(/:id)",
			"$ref": "app/view/norm_conveyor_belt/ModelView",
		},
		{
			"collectionName": "norm", 
			"route": "norm_hydraulic/collection(/:id)",
			"$ref": "app/view/norm_hydraulic/CollectionView",

		},
		{
			"collectionName": "norm",
			"route": "norm_hydraulic/model(/:id)",
			"$ref": "app/view/norm_hydraulic/ModelView",
		},

		{
			"collectionName": "norm", 
			"route": "norm_supplies/collection(/:id)",
			"$ref": "app/view/norm_supplies/CollectionView",

		},
		{
			"collectionName": "norm",
			"route": "norm_supplies/model(/:id)",
			"$ref": "app/view/norm_supplies/ModelView",
		},
		{
			"collectionName": "norm", 
			"route": "norm_maintenance_repair/collection(/:id)",
			"$ref": "app/view/norm_maintenance_repair/CollectionView",

		},
		{
			"collectionName": "norm",
			"route": "norm_maintenance_repair/model(/:id)",
			"$ref": "app/view/norm_maintenance_repair/ModelView",
		},

					









		{
			"collectionName": "khachhang",
			"route": "khachhang/collection(/:id)",
			"$ref": "app/view/KhachHang/CollectionView",
		},
		{
			"collectionName": "khachhang",
			"route": "khachhang/model(/:id)",
			"$ref": "app/view/KhachHang/ModelView",
		},
		{
			"collectionName": "hanghoa",
			"route": "hanghoa/collection(/:id)",
			"$ref": "app/view/HangHoa/CollectionView",
		},
		{
			"collectionName": "hanghoa",
			"route": "hanghoa/model(/:id)",
			"$ref": "app/view/HangHoa/ModelView",
		},
		{
			"collectionName": "hoadon",
			"route": "hoadon/collection(/:id)",
			"$ref": "app/view/HoaDon/CollectionView",
		},
		{
			"collectionName": "hoadon",
			"route": "hoadon/model(/:id)",
			"$ref": "app/view/HoaDon/ModelView",
		},
		{
			"collectionName": "unit",
			"route": "unit/collection(/:id)",
			"$ref": "app/view/unit/CollectionView",
		},
		{
			"collectionName": "unit",
			"route": "unit/model(/:id)",
			"$ref": "app/view/unit/ModelView",
		},

	];

});


