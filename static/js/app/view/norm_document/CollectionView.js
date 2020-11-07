define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_document/tpl/collection.html');
    var	schema 				= require('json!schema/NormDocumentSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "norm_document",
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
	    	    	field: "norm_document_name",label:" Tên Định Mức Quyết Định"
				 },
				 { 
	    	    	field: "norm_document_no",label:"Mã Định Mức Quyết Định"
				 },
				 { 
	    	    	field: "from_time",label:"Thời Gian Bắt Đầu"
				 },
				 { 
	    	    	field: "to_time",label:"Thời Gian Kết Thúc"
				 },
				 { 
	    	    	field: "year",label:"Năm"
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


