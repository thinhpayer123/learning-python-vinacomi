define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_detail/tpl/collection.html');
    var	schema 				= require('json!schema/NormDetailSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "norm_detail",
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