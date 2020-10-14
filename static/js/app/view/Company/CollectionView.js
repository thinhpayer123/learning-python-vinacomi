define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/Company/tpl/collection.html');
    var	schema 				= require('json!schema/CompanySchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "company",
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
	    	    	field: "company_type",label:"Loai",
				 },
				 { 
	    	    	field: "company_id",label:"Mã Đơn Vị",
				 },
				 { 
	    	    	field: "name",label:"Tên Đơn Vị ",
				 },
				 { 
	    	    	field: "phone_number",label:"Số Điện Thoại",
				 },
	    	     { field: "point_name", label: "Point Name"},

				 { 
	    	    	field: "active",label:"active",
				 },

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