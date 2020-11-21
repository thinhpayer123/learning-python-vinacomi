define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		// {
		// 	"collectionName": "company", 
		// 	"route": "company/collection(/:param)",
		// 	"$ref": "app/view/Company/CollectionView",
		// },
		// {
		// 	"collectionName": "company",
		// 	"route": "company/model(/:param)",
		// 	"$ref": "app/view/Company/ModelView",
		// },
		{
			"collectionName": "item_department", 
			"route": "item_department/collection(/:param)",
			"$ref": "app/view/item_department/CollectionView",
		},
		{
			"collectionName": "item_department",
			"route": "item_department/model(/:param)",
			"$ref": "app/view/item_department/ModelView",
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
			"collectionName": "price_list", 
			"route": "price_list/collection(/:id)",
			"$ref": "app/view/price_list/CollectionView",

		},
		{
			"collectionName": "price_list",
			"route": "price_list/model(/:id)",
			"$ref": "app/view/price_list/ModelView",
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
		{
			"collectionName": "plan",
			"route": "plan/collection(/:id)",
			"$ref": "app/view/plan/CollectionView",
		},
		{
			"collectionName": "plan",
			"route": "plan/model(/:id)",
			"$ref": "app/view/plan/ModelView",
		},
		{
			"collectionName": "department",
			"route": "department/collection(/:id)",
			"$ref": "app/view/department/CollectionView",
		},
		{
			"collectionName": "department",
			"route": "department/model(/:id)",
			"$ref": "app/view/department/ModelView",
		},
		{
<<<<<<< HEAD
			"collectionName": "plan_fuel_item",
			"route": "plan_fuel_item/collection(/:id)",
			"$ref": "app/view/plan_fuel_item/CollectionView",
		},
		{
			"collectionName": "plan_fuel_item",
			"route": "plan_fuel_item/model(/:id)",
			"$ref": "app/view/plan_fuel_item/ModelView",
		},
		{
			"collectionName": "plan_item",
			"route": "plan_item/collection(/:id)",
			"$ref": "app/view/plan_item/CollectionView",
		},
		{
			"collectionName": "plan_item",
			"route": "plan_item/model(/:id)",
			"$ref": "app/view/plan_item/ModelView",
		},
		{
			"collectionName": "salary_item",
			"route": "salary_item/collection(/:id)",
			"$ref": "app/view/salary_item/CollectionView",
		},
		{
			"collectionName": "salary_item",
			"route": "salary_item/model(/:id)",
			"$ref": "app/view/salary_item/ModelView",
		},
		{
			"collectionName": "plan_fuel_item_category",
			"route": "plan_fuel_item_category/collection(/:id)",
			"$ref": "app/view/plan_fuel_item_category/CollectionView",
		},
		{
			"collectionName": "plan_fuel_item_category",
			"route": "plan_fuel_item_category/model(/:id)",
			"$ref": "app/view/plan_fuel_item_category/ModelView",
		},
		{
			"collectionName": "brazier",
			"route": "brazier/collection(/:id)",
			"$ref": "app/view/brazier/CollectionView",
		},
		{
			"collectionName": "brazier",
			"route": "brazier/model(/:id)",
			"$ref": "app/view/brazier/ModelView",
=======
			"collectionName": "gaio",
			"route": "gaio/collection(/:id)",
			"$ref": "app/view/gaio/CollectionView",
		},
		{
			"collectionName": "gaio",
			"route": "gaio/model(/:id)",
			"$ref": "app/view/gaio/ModelView",
>>>>>>> 9d78117bcab0efc0b7d359df44d2988e585acb72
		},
	];

});


