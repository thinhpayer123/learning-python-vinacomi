define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/MemberCard/tpl/collection.html'),
    	schema 				= require('json!schema/MemberCardSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "membercard",
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
	    	    	field: "id",label:"ID",width:50
				 },
				 { 
	    	    	field: "company_id",label:"Mã Công Ty ",width:100
				 },
				 { 
	    	    	field: "membercard_id",label:"Mã Thẻ ",width:100
				 },
				 { 
	    	    	field: "wallet_id",label:"Mã Ví",width:100
				 },
				 { 
	    	    	field: "start_date",label:"Ngày Mở Thẻ",width:100
				 },
				 { 
	    	    	field: "expire_date",label:"Ngày Hết Hạn",width:100
				 },
				 { 
	    	    	field: "status",label:"Trạng Thái",width:100
				 },
				 { 
	    	    	field: "extra_data",label:"Thông Tin Chi Tiết ",width:100
	    	     },
				//  { field: "ma", label: "Mã", width:150},
		     	//  { field: "ten", label: "Tên", width:250 },
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