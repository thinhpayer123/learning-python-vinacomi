define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_conveyor_belt/tpl/collection.html');
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
							var path = self.collectionName + '_conveyor_belt/model';
							self.getApp().getRouter().navigate(path);
						}
					},
					
				]
			},
		],
    	uiControl:{
    		fields: [
                 { 
                    field: "norm_name",label:"Tên Định Mức Vật Tư Máy Cào"
                 },
				 { 
	    	    	field: "norm_number",label:"Quyết Định Số"
				 },	                 
				 { 
	    	    	field: "priority",label:"Độ Ưu Tiên"
				 },	   
				 { 
	    	    	field: "active",label:"Trạng Thái"
				 },
			 
				 
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '_conveyor_belt/model?id='+ event.rowId;
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