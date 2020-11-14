define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm/tpl/collection.html');
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
	    	    	field: "norm_document_no",label:"Quyết Định Số"
				 }, 
				 { 
	    	    	field: "norm_document_name",label:"Tên Quyết Định"
				 },   
				 { 
	    	    	field: "year",label:"Năm"
				 }, 		
				 { 
	    	    	field: "norm_name",label:"Tên Định Mức"
				 },

				 // { 
	    // 	    	field: "norm_no",label:"Mã Định Mức Vật Tư Máy Cào"
				 // },				 
				 // { 
	    // 	    	field: "from_time",label:"Thời Gian Lập"
				 // },
				 { 
	    	    	field: "priority",label:"Độ Ưu Tiên"
				 },	   
				 { 
	    	    	field: "active",label:"Trạng Thái"
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