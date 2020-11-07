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
	    	    	field: "norm_item_exid",label:"norm_item_exid"
				 },
				 { 
	    	    	field: "norm_item_no",label:"Mã Định Mức Vật Tư"
				 },
				 { 
	    	    	field: "norm_item_name",label:"Tên Định Mức Vật Tư"
				 },
				 { 
	    	    	field: "norm_item_ascii_name",label:"Tên Định Mức ascii"
				 },
				 { 
	    	    	field: "brief_desc",label:"Mô Tả Ngắn Gọn"
				 },
				 { 
	    	    	field: "description",label:"Miêu Tả"
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