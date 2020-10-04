define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/User/tpl/collection.html');
    var	schema 				= require('json!schema/UserSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "users",
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
	    	    	field: "company_id",label:"Mã Công Ty ",
				 },
				 { 
	    	    	field: "full_name",label:"Họ Và Tên",
				 },
				 { 
	    	    	field: "user_name",label:"Tên Tài Khoản",
				 },

				 { 
	    	    	field: "password",label:"Mật Khẩu",
				 },
				 { 
	    	    	field: "email",label:"Email",
				 },
				 { 
	    	    	field: "active",label:"Trạng Thái",
				 },
				 { 
	    	    	field: "roles",label:"Roles",
				 },
				 { 
	    	    	field: "extra_data",label:"Thông Tin Chi Tiết ",
				 },

	    	    //  { field: "ma", label: "Mã"},
				//   { field: "ten", label: "Tên", width:250 },
				//   { field: "gia", label: "Giá" },
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