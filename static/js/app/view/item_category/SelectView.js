define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item_category/tpl/collection.html'),
    	schema 				= require('json!schema/ItemCategorySchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "item_category",
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
	    	    	field: "category_exid",label:"ID",
				 },
				 { 
	    	    	field: "category_no",label:"Loai",
				 },
				 { 
	    	    	field: "category_name",label:"Mã Đơn Vị",
				 },
				 { 
	    	    	field: "category_type",label:"Tên Đơn Vị ",
				 },
				 // { 
	    // 	    	field: "thumbnail",label:"Số Điện Thoại",
				 // },
	    	     // { field: "is_show", label: "Point Name"},

				 { 
	    	    	field: "sort_number",label:"active",
				 },

	    	     { field: "status", label: "Point Name"},

				 // { 
	    // 	    	field: "note",label:"active",
				 // },

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

