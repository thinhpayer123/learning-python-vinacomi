define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/Company/tpl/collection.html'),
    	schema 				= require('json!schema/CompanySchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "company",
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
	    	    	field: "id",label:"ID", width:100
				 },
				 { 
	    	    	field: "company_type",label:"Kiểu Đơn Vị ",width:100
				 },
				 { 
	    	    	field: "company_id",label:"Mã Đơn Vị",width:100
				 },
				 { 
	    	    	field: "name",label:"Tên Đơn Vị ",width:200
				 },
				 { 
	    	    	field: "phone_number",label:"Số Điện Thoại",width:150
				 },	    	     
				 { 
	    	    	field: "active",label:"active",width:50
				 }
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