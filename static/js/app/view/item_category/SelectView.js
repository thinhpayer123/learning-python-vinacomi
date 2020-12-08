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
                 { 
                    field: "category_no",label:"Danh Mục",
                 },
                 { 
                    field: "category_name",label:"Tên Nhóm Vật Tư",
                 },
                 { 
                    field: "status",label:"Trạng Thái",
                 },
                 {
                    field: "norm_template", textField: "norm_template_name",label:"Template",
				 },
                 {
                    field: "department", textField: "name",label:"Tên Đơn Vị",
                 }, 				                  
                 { 
                    field: "sort",label:"Sắp Xếp Số",
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

