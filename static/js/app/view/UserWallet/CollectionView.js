define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/UserWallet/tpl/collection.html');
    var	schema 				= require('json!schema/UserWalletSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "user_wallet",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "create",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "Tạo mới",
						command: function(){
							var self = this;
							var path = self.collectionName + '/model';
							self.getApp().getRouter().navigate(path);
						}
					},
					
				]
			},
		],
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID",
				 },
				 { 
	    	    	field: "company_id",label:"Mã Đơn Vị ",
				 },
				 { 
	    	    	field: "company_type",label:"Kiểu Đơn Vị",
				 },
				 { 
	    	    	field: "company_no",label:"Số Đơn Vị",
				 },
				 { 
	    	    	field: "user_id",label:"Mã Người Dùng",
				 },
				 { 
	    	    	field: "user_no",label:"Số Người Dùng",
				 },
				 { 
	    	    	field: "wallet_id",label:"Mã Ví",
				 },
				 { 
	    	    	field: "relationship",label:"Vai Trò",
				 },

				 { 
	    	    	field: "extra_data",label:"Thông Tin Chi Tiết",
	    	     },

		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});