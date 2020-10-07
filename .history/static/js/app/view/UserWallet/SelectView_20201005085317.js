define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/UserWallet/tpl/collection.html'),
    	schema 				= require('json!schema/UserWalletSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user_wallet",
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
	    	    	field: "id",label:"ID", width=100
				 },
				 { 
	    	    	field: "company_id",label:"Mã Đơn Vị ",width=100
				 },
				 { 
	    	    	field: "company_type",label:"Kiểu Đơn Vị",width=100
				 },
				 { 
	    	    	field: "company_no",label:"Số Đơn Vị",width=100
				 },
				 { 
	    	    	field: "user_id",label:"Mã Người Dùng",width=100
				 },
				 { 
	    	    	field: "user_no",label:"Số Người Dùng",width=100
				 },
				 { 
	    	    	field: "wallet_id",label:"Mã Ví",width=100
				 },
				 { 
	    	    	field: "relationship",label:"Vai Trò",width=100
				 },

				 { 
	    	    	field: "extra_data",label:"Thông Tin Chi Tiết",width=100
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