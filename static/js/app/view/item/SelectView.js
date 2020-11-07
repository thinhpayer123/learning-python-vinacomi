define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item/tpl/collection.html'),
    	schema 				= require('json!schema/ItemSchema.json');
    var CategorySelectView = require("app/view/item_category/SelectView");

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "item",
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
	    	    //  { field: "ma", label: "Mã", width:150},
				 //  { field: "ten", label: "Tên", width:250 },
				 { 
	    	    	field: "item_no",label:"Mã Vật Tư"
				 },
				 { 
	    	    	field: "item_name",label:"Tên Vật Tư"
				 },



				 { 
	    	    	field: "brief_desc",label:"Mô Tả"
				 },
				 { 
	    	    	field: "unit_name",label:"Tên Đơn Vị Tính"
				 },
				 { 
	    	    	field: "tax_class",label:"Thuế"
				 },
				 // { 
	    // 	    	field: "categories",label:"Nhóm Vật Tư"
				 // },


				 { 
	    	    	field: "item_class",label:"Lớp Đơn Vị"
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

