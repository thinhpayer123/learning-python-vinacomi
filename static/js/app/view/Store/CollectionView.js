define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/Store/tpl/collection.html');
	var	schema 				= require('json!schema/StoreSchema.json');
	var ModelDialogView = require('app/view/Store/ModelDialogVIew');

	
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "store",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "create",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "Tạo mới",
						command: function(){
							var self = this;
							var path = self.collectionName + '/model';
							self.getApp().getRouter().navigate(path);
						}
					},
					
				]
			},
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "Tạo Wallet ID",
						type: "button",
						buttonClass: "btn-primary btn-sm",
						label: "Đồng Bộ Store",
						command: function(){
							var self = this;
							var url = self.getApp().serviceURL + '/api/v1/sync_store';
							$.ajax({
								type: 'GET',
								url: url,

								dataType: "json",
								success: function (data) {
									// console.log(data)
									var notify  = data.notify;
									// console.log(link)
									// console.log(data);
									var dialogView = new ModelDialogView({
										viewData: {
											notify: notify
										}
											
									});
									dialogView.dialog();
								},
								error: function (XMLHttpRequest, textStatus, errorThrown) {
									console.log("Before navigate login");
								
								}
							});
						}
					},
					
				]
			},
			
		],
    	uiControl:{
    		fields: [
	    	    //  { 
	    	    // 	field: "id",label:"ID",
				//  },
				 { 
	    	    	field: "company_id",label:"Mã Công Ty",
				 },
				 { 
	    	    	field: "brand_id",label:"Mã Thương Hiệu",
				 },
				 { 
	    	    	field: "store_id",label:"Mã Cửa Hàng",
				 },
				 { 
	    	    	field: "store_name",label:"Tên Cửa Hàng",
				 },
	    	     { field: "wallet_id", label: "Mã Ví Cửa hàng"},

				 { 
	    	    	field: "phone_number",label:"Số Điện Thoại ",
				 },
				 { 
	    	    	field: "image_path",label:"Ảnh Đại Diện ",
				 },
				 {
					field: "active",
					label: "Trạng Thái",
                    
                },
				 
				//   { field: "wallet_id", label: "Mã Ví", width:250 },
				//   { field: "gia", label: "Giá" },
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});



// define(function (require) {
//     "use strict";
//     var $                   = require('jquery'),
//         _                   = require('underscore'),
//         Gonrin				= require('gonrin');
    
//     var template 			= require('text!app/view/Brand/tpl/collection.html');
//     var	schema 				= require('json!schema/BrandSchema.json');
    
//     return Gonrin.CollectionView.extend({
//     	template : template,
//     	modelSchema	: schema,
//     	urlPrefix: "/api/v1/",
// 		collectionName: "store",
// 		tools: [
// 			{
// 				name: "default",
// 				type: "group",
// 				groupClass: "toolbar-group",
// 				buttons: [
// 					{
// 						name: "create",
// 						type: "button",
// 						buttonClass: "btn-success btn-sm",
// 						label: "Tạo mới",
// 						command: function(){
// 							var self = this;
// 							var path = self.collectionName + '/model';
// 							self.getApp().getRouter().navigate(path);
// 						}
// 					},
					
// 				]
// 			},
// 		],
//     	uiControl:{
//     		fields: [
// 	    	    //  { 
// 	    	    // 	field: "id",label:"ID",
// 				//  },
// 				 { 
// 	    	    	field: "company_id",label:"Mã Công Ty",
// 				 },
// 				 { 
// 	    	    	field: "brand_id",label:"Mã Thương Hiệu",
// 				 },
// 				 { 
// 	    	    	field: "store_id",label:"Mã Cửa Hàng",
// 				 },
// 				 { 
// 	    	    	field: "store_name",label:"Tên Cửa Hàng",
// 				 },	    	     
// 				 { 
// 	    	    	field: "wallet_id",label:"Mã Ví Cửa hàng",
// 				 },


// 				 { field: "phone_number", label: "Số ĐIện Thoại"},
// 				 { field: "active", label: "Trạng Thái"},
				 


// 				 { field: "image_path", label: "Ảnh Đại Diện", width:250 },
// 				//   { field: "gia", label: "Giá" },
// 		     ],
// 		     onRowClick: function(event){
// 		    	if(event.rowId){
// 		        		var path = this.collectionName + '/model?id='+ event.rowId;
// 		        		this.getApp().getRouter().navigate(path);
// 		        }
		    	
// 		    }
//     	},
// 	    render:function(){
// 	    	 this.applyBindings();
// 	    	 return this;
//     	},
//     });

// });