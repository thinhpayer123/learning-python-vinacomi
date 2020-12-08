define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/department/tpl/collection.html');
    var	schema 				= require('json!schema/DepartmentSchema.json');
    // var CategorySelectView = require("app/view/item_category/SelectView");

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "department",
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
	    	    	field: "department_no",label:"Mã Phòng Ban"
				 },
				 { 
	    	    	field: "name",label:"Tên Phòng Ban"
				 },
				 { 
	    	    	field: "department_type",label:"Loại Phòng Ban"
				 },
				 { 
	    	    	field: "description",label:"Mô Tả Ngắn Gọn"
				 },
				 { 
	    	    	field: "address",label:"Địa Chỉ"
				 },	
				 { 
	    	    	field: "phone",label:"Số Điện Thoại"
				 },	
				 { 
	    	    	field: "email",label:"Email"
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
