define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/plan_contruct_item/tpl/collection.html'),
    	schema 				= require('json!schema/DepartmentSchema.json');
    // var CategorySelectView = require("app/view/item_category/SelectView");

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "department",
    	textField: "name",
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
				   field: "department_no",label:"Mã Phòng Ban"
				},
				{ 
				   field: "name",label:"Tên Phòng Ban"
				},
				{ 
				   field: "department_type",label:"Loại Phòng Ban"
				},
				{ 
				   field: "description",label:"Mô Tả Ngắn Gọn"
				},
				{ 
				   field: "address",label:"Địa Chỉ"
				},	
				{ 
				   field: "phone",label:"Số Điện Thoại"
				},	
				{ 
				   field: "email",label:"Email"
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

