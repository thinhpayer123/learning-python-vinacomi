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
    	collectionName: "hanghoa",
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
	    	    	field: "active",label:"Trạng Thái ",width=100
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