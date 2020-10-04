define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/User/tpl/collection.html'),
    	schema 				= require('json!schema/UserSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "users",
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
	    	    	field: "id",label:"ID",width=100
				 },
				 { 
	    	    	field: "company_id",label:"Mã Công Ty ",width=100
				 },
				 { 
	    	    	field: "full_name",label:"Họ Và Tên",width=100
				 },
				 { 
	    	    	field: "user_name",label:"Tên Tài Khoản",width=100
				 },

				 { 
	    	    	field: "password",label:"Mật Khẩu",width=100
				 },
				 { 
	    	    	field: "email",label:"Email",width=100
				 },
				 { 
	    	    	field: "active",label:"Trạng Thái",width=100
				 },
				 { 
	    	    	field: "roles",label:"Roles",width=100
				 },
				 { 
	    	    	field: "extra_data",label:"Thông Tin Chi Tiết ",width=100
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