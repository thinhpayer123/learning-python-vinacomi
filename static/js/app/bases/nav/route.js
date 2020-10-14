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
			"$ref": "app/view/membercard/CollectionView",
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
			"collectionName": "quocgia", 
			"route": "quocgia/collection(/:id)",
			"$ref": "app/view/QuocGia/CollectionView",
		},
		{
			"collectionName": "quocgia",
			"route": "quocgia/model(/:id)",
			"$ref": "app/view/QuocGia/ModelView",
		},
		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/collection(/:id)",
			"$ref": "app/view/TinhThanh/CollectionView",
		},
		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/model(/:id)",
			"$ref": "app/view/TinhThanh/ModelView",
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
	];

});


