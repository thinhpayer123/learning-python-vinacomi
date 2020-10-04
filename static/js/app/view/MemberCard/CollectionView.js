define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/MemberCard/tpl/collection.html');
    var	schema 				= require('json!schema/MemberCardSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "membercard",
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
	    	    	field: "membercard_id",label:"Mã Thẻ ",
				 },
				 { 
	    	    	field: "wallet_id",label:"Mã Ví",
				 },
				 { 
	    	    	field: "start_date",label:"Ngày Mở Thẻ",
				 },
				 { 
	    	    	field: "expire_date",label:"Ngày Hết Hạn",
				 },
				 { 
	    	    	field: "status",label:"Trạng Thái",
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