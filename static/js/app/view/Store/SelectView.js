define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/Store/tpl/collection.html'),
    	schema 				= require('json!schema/StoreSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "store",
    	textField: "ten",
    	valueField: "id",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "select",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:SELECT",
		    	    	command: function(){
		    	    		var self = this;
		    	    		self.trigger("onSelected");
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
				{ 
	    	    	field: "id",label:"ID",
				 },
				 { 
	    	    	field: "company_id",label:"Mã Công Ty",width=100
				 },
				 { 
	    	    	field: "brand_id",label:"Mã Thương Hiệu",width=100
				 },
				 { 
	    	    	field: "store_id",label:"Mã Cửa Hàng",width=100
				 },
				 { 
	    	    	field: "store_name",label:"Tên Cửa Hàng",width=100
				 },
				 { 
	    	    	field: "phone_number",label:"Số Điện Thoại ",width=100
				 },
				 { 
	    	    	field: "image_path",label:"Ảnh Đại Diện ",width=100
				 },
				 {
                    field: "active",
                    uicontrol: "combobox",
                    textField: "Trạng Thái",
                    valueField: "value",
                    cssClass: "form-control",
                    dataSource: [
                        { "value": 1, "text": "Active" },
                        { "value": 0, "text": "Deactive" },
                    ]
                },

		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    		
	    	},
    	},
    	render:function(){
    		var self= this;
    		
    		self.applyBindings();
    		
    		return this;
    	},
    	
    });

});


// define(function (require) {
//     "use strict";
//     var $                   = require('jquery'),
//         _                   = require('underscore'),
//         Gonrin				= require('gonrin');
    
//     var template 			= require('text!app/view/Brand/tpl/collection.html'),
//     	schema 				= require('json!schema/BrandSchema.json');

//     return Gonrin.CollectionDialogView.extend({
//     	template : template,
//     	modelSchema	: schema,
//     	urlPrefix: "/api/v1/",
//     	collectionName: "store",
//     	textField: "ten",
//     	valueField: "id",
//     	tools : [
//     	    {
//     	    	name: "defaultgr",
//     	    	type: "group",
//     	    	groupClass: "toolbar-group",
//     	    	buttons: [
// 					{
// 		    	    	name: "select",
// 		    	    	type: "button",
// 		    	    	buttonClass: "btn-success btn-sm",
// 		    	    	label: "TRANSLATE:SELECT",
// 		    	    	command: function(){
// 		    	    		var self = this;
// 		    	    		self.trigger("onSelected");
// 		    	    		self.close();
// 		    	    	}
// 		    	    },
//     	    	]
//     	    },
//     	],
//     	uiControl:{
//     		fields: [
// 	    	    //  { field: "ma", label: "Mã", width:150},
// 				 //  { field: "ten", label: "Tên", width:250 },
// 				//  { 
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
// 	    	    	field: "active",label:"Trạng Thái",
// 				 },


// 	    	     { field: "phone_number", label: "Số ĐIện Thoại"},
// 				  { field: "image_path", label: "Ảnh Đại Diện", width:250 },
				
// 		    ],
// 		    onRowClick: function(event){
// 	    		this.uiControl.selectedItems = event.selectedItems;
	    		
// 	    	},
//     	},
//     	render:function(){
//     		var self= this;
    		
//     		self.applyBindings();
    		
//     		return this;
//     	},
    	
//     });

// });