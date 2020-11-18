define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item_department/tpl/collection.html');
    var	schema 				= require('json!schema/NormSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "norm",
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
							var norm_template_no = self.getApp().getRouter().getParam("norm_template_no");

							var path =  '/item_department/model?norm_template_no=' + norm_template_no;
							self.getApp().getRouter().navigate(path);
						}
					},
					
				]
			},
		],
    	uiControl:{
    		fields: [
    			{ 
	    	    	field: "norm_template_no",label:"Template"
				 },	 
				 { 
	    	    	field: "norm_name",label:"Tên Định Mức"
				 },
				 { 
	    	    	field: "norm_document_no",label:"Quyết Định Số"
				 }, 
				 { 
	    	    	field: "norm_document_name",label:"Tên Quyết Định"
				 },   
				 { 
	    	    	field: "year",label:"Năm"
				 }, 		
				 
				   
				 // { 
	    // 	    	field: "active",label:"Trạng Thái"
				 // },
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		    		var norm_template_no = this.getApp().getRouter().getParam("norm_template_no");
		        	var path = this.collectionName + '/model?id='+ event.rowId + "&norm_template_no=" + norm_template_no;
		        	this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
	    	var self = this;
	    	var norm_template_no = this.getApp().getRouter().getParam("norm_template_no");
	    	if (norm_template_no){
	    		self.uiControl.filters = {"norm_template_no": {"$eq": norm_template_no}}
	    		this.applyBindings();

	    	}
	    	
	    	
	    	return this;
    	},
    });

});