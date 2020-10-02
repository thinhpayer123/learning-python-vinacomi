define(function (require) {
	"use strict";
	return [
		{
			"text":"Hệ thống",
			"icon":`<svg class="c-sidebar-nav-icon"><use xlink:href="/static/vendor/coreui-icons/sprites/free.svg#cil-puzzle"></use></svg>`,
			"type": "category",
			"entries": [
				{
					"text":"Doanh nghiep",
					// "icon":"fa fa-child",
					"type":"view",
					"route":"company/model"
				},
				{
					"text":"Người dùng",
					// "icon":"fa fa-child",
					"type":"view",
					"route":"user/collection"
				},
				// {
				// 	"text":"Vai trò",
				// 	// "icon":"fa fa-child",
				// 	"type":"view",
				// 	"route":"role/collection"
				// },
				{
					"text":"Vnexpress",
					// "icon":"fa fa-child",
					"type":"link",
					"href":"https://vnexpress.net",
					// "visible": false
				},
				{
					"text":"Quốc gia",
					// "icon":"fa fa-child",
					"type":"view",
				    "route":"quocgia/collection"
				},
				{
					"text":"Tỉnh thành",
					// "icon":"fa fa-child",
					"type":"link",
				    "href":"/#tinhthanh/collection"
				},
			]
		},
		{
			"text":"Danh mục",
			"icon":`<svg class="c-sidebar-nav-icon"><use xlink:href="/static/vendor/coreui-icons/sprites/free.svg#cil-star"></use></svg>`,
			"type": "category",
			"entries": [
				{
					"text":"Khách hàng",
					// "icon":"fa fa-child",
					"type":"view",
					"route":"khachhang/collection"
				},
				{
					"text":"Example",
					// "icon":"fa fa-child",
					"type":"link",
					"href":"https://coreui.io/demo/3.2.0/"
				},
			]
		},
		// {
		// 	"text":"Quốc gia",
		// 	// "icon":"fa fa-child",
		// 	"type":"view",
		//     "route":"quocgia/collection"
		// },
		// {
		// 	"text":"Tỉnh thành",
		// 	// "icon":"fa fa-child",
		// 	"type":"view",
		//     "route":"tinhthanh/collection"
		// },

		// {
		// 	"text":"Khách hàng",
		// 	// "icon":"fa fa-child",
		// 	"type":"view",
		//     "route":"khachhang/collection"
		// },
		// {
		// 	"text":"Hàng hoá",
		// 	// "icon":"fa fa-child",
		// 	"type":"view",
		//     "route":"hanghoa/collection"
		// },
		// {
		// 	"text":"Hoá đơn",
		// 	// "icon":"fa fa-child",
		// 	"type":"view",
		//     "route":"hoadon/collection"
		// },
		// {
		// 	"text":"test upload",
		// 	// "icon":"fa fa-child",
		// 	"type":"view",
		//     "route":"uploadfile/collection"
		// },
		
	];

});