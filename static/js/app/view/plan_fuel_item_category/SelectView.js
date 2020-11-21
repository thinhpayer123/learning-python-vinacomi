define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/plan_fuel_item_category/tpl/collection.html'),
    	schema 				= require('json!schema/PlanFuelItemCategorySchema.json');
    // var CategorySelectView = require("app/view/item_category/SelectView");

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "plan_fuel_item_category",
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
	    	    	field: "category_no",label:"Mã Nhóm"
				 },
				 { 
	    	    	field: "category_name",label:"Tên Nhóm"
				 },
                 {
                    field: "department", textField: "name",label:"Tên Đơn Vị",
                 }, 
				 { 
	    	    	field: "category_type_name",label:"Tên Loại Nhóm"
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

