define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/Store/tpl/collection.html');
    var	schema 				= require('json!schema/StoreSchema.json');
    
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
                    uicontrol: "combobox",
                    textField: "Trạng",
                    valueField: "value",
                    cssClass: "form-control",
                    dataSource: [
                        { "value": true, "text": "True" },
                        { "value": false, "text": "False" },
                    ]
                },
				 
				//   { field: "ten", label: "Tên", width:250 },
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