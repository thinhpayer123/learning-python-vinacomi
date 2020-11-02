define(function (require) {
	"use strict";
	return [
		// {
		// 	"text":"Hệ thống",
		// 	"icon":`<svg class="c-sidebar-nav-icon"><use xlink:href="/static/vendor/coreui-icons/sprites/free.svg#cil-puzzle"></use></svg>`,
		// 	"type": "category",
		// 	"entries": [
		// 		// {
		// 		// 	"text":"Doanh nghiep",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"company/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Thẻ Người Dùng",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"membercard/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Vai Trò",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"role/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Store",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"store/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Giao Dịch",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"transaction/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"User",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"users/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Ví Người Dùng",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"userwallet/collection"
		// 		// },



		// 		// {
		// 		// 	"text":"Người dùng",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"user/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Vai trò",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		// 	"route":"role/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Vnexpress",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"link",
		// 		// 	"href":"https://vnexpress.net",
		// 		// 	// "visible": false
		// 		// },
		// 		// {
		// 		// 	"text":"Quốc gia",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"view",
		// 		//     "route":"quocgia/collection"
		// 		// },
		// 		// {
		// 		// 	"text":"Tỉnh thành",
		// 		// 	// "icon":"fa fa-child",
		// 		// 	"type":"link",
		// 		//     "href":"/#tinhthanh/collection"
		// 		// },
		// 	]
		// },
		{
			"text":"Danh mục",
			"icon":`<svg class="c-sidebar-nav-icon"><use xlink:href="/static/vendor/coreui-icons/sprites/free.svg#cil-star"></use></svg>`,
			"type": "category",
			"entries": [
				{
				"text":"Quản Trị Đơn Vị",
					"icon":`<svg class="c-sidebar-nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"/></svg>`, 
					"type":"category",
					"route":"",
					"entries":[{
						"text":"Đơn Vị",
						// "icon":"fa fa-child",
						"type":"view",
						"route":"company/collection"
					},
					// {
					// 	"text":"Thương Hiệu",
					// 	// "icon":"fa fa-child",
					// 	"type":"view",
					// 	"href":"brand/collection"
					// },

					{
						"text":"Vai Trò",
						// "icon":"fa fa-child",
						"type":"view",
						"route":"role/collection"
					},


 					{
						"text":"Vật Tư Tiêu Hao",
						// "icon":"fa fa-child",
						"type":"view",
						"collectionName":"item",
		    			"route":"item/collection"
					},

 					{
						"text":"Nhóm Vật Tư Tiêu Hao",
						// "icon":"fa fa-child",
						"type":"view",
						"collectionName":"item_category",
					    "route":"item_category/collection"
					},
					{
						"text":"Định Mức",
						// "icon":"fa fa-child",
						"type":"view",
						"collectionName":"norm",
					    "route":"norm/collection"
					},



					{
						"text":"Định Mức Chi Tiết",
						// "icon":"fa fa-child",
						"type":"view",
						"collectionName":"norm_detail",
		 			   "route":"norm_detail/collection"
					},
					{
						"text":"Định Mức Chi Tiết Số Lượng",
						// "icon":"fa fa-child",
						"type":"view",
						"collectionName":"norm_detail_quantity",
					    "route":"norm_detail_quantity/collection"
					},




					{
						"text":"Store",
						// "icon":"fa fa-child",
						"type":"view",
						"route":"store/collection"
					}
				]
				},
				// {
				// "text":"Giao Dịch & Đơn Hàng",
				// 	"icon":`<svg class="c-sidebar-nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z"/></svg>`,
				// 	"type":"category",
				// 	"route":"",
				// 	"entries":[{
				// 			"text":"Giao Dịch",
				// 			// "icon":"fa fa-child",
				// 			"type":"view",
				// 			"route":"transaction/collection"
				// 		},
				// 		{
				// 			"text":"Đơn Hàng",
				// 			// "icon":"fa fa-child",
				// 			"type":"view",
				// 			"route":"order/collection"
				// 		}
				// 	],
				// },
				{
					"text":"Quản Lý User",
					"icon":`<svg <svg class="c-sidebar-nav-icon"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-.998c0-1.552.06-1.775-.88-1.993-1.438-.332-2.797-.645-3.293-1.729-.18-.396-.301-1.048.155-1.907 1.021-1.929 1.277-3.583.702-4.538-.672-1.115-2.707-1.12-3.385.017-.576.968-.316 2.613.713 4.512.465.856.348 1.51.168 1.908-.49 1.089-1.836 1.4-3.262 1.728-.982.227-.92.435-.92 2.002h-.995l-.002-.623c0-1.259.1-1.985 1.588-2.329 1.682-.389 3.344-.736 2.545-2.209-2.366-4.365-.676-6.839 1.865-6.839 2.492 0 4.227 2.383 1.867 6.839-.775 1.464.824 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.81-2.214c-1.289-.298-2.489-.559-1.908-1.657 1.77-3.342.47-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.325 0 1.269.574 2.175.904 2.925h1.048c-.17-.75-1.466-2.562-.766-3.736.412-.692 1.704-.693 2.114-.012.38.631.181 1.812-.534 3.161-.388.733-.28 1.301-.121 1.648.305.666.977.987 1.737 1.208 1.507.441 1.368.042 1.368 1.48h.997l.002-.463c0-.945-.074-1.492-1.193-1.75zm-22.805 2.214h.997c0-1.438-.139-1.039 1.368-1.48.761-.221 1.433-.542 1.737-1.208.159-.348.267-.915-.121-1.648-.715-1.349-.914-2.53-.534-3.161.41-.682 1.702-.681 2.114.012.7 1.175-.596 2.986-.766 3.736h1.048c.33-.75.904-1.656.904-2.925.001-1.509-.982-2.326-2.247-2.326-1.87 0-3.17 1.787-1.4 5.129.581 1.099-.619 1.359-1.908 1.657-1.12.258-1.194.805-1.194 1.751l.002.463z"/></svg>`,
					"type":"category",
					"route":"",
					"entries":[
						{
							"text":"Quản Lý User Hệ Thống",
							// "icon":"fa fa-child",
							"type":"view",
							"route":"users/collection"
						},
						{
							"text":"Quản Lý User Người Dùng",
							// "icon":"fa fa-child",
							"type":"view",
							"route":"wallet_user/collection"
						},				
						{
							"text":"Quản Lý Thẻ Người Dùng",
							// "icon":"fa fa-child",
							"type":"view",
							"route":"membercard/collection"
						},
					]
				},

			]
		},

		
	];

});