define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_detail/tpl/collection.html'),
    	schema 				= require('json!schema/NormDetailSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "norm_detail",
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
                    field: "norm_no",label:"Mã Định Mức"
                 },
                 { 
                    field: "item_no",label:"Mã Vật Tư"
                 },
                 { 
                    field: "type",label:"Kiểu Định Mức"
                 },
                 { 
                    field: "item_name",label:"Tên Vật Tư"
                 },
                 { 
                    field: "machine_name",label:"Tên Máy"
                 },
                 { 
                    field: "note",label:"Ghi Chú"
                 },              
                 { 
                    field: "unit_name",label:"Tên Định Mức"
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


