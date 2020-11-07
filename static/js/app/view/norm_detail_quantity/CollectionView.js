define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_detail_quantity/tpl/collection.html');
    var	schema 				= require('json!schema/NormDetailQuantitySchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "norm_detail_quantity",
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
                    field: "quantity",label:"Định Lượng"
                 },
                 { 
                    field: "previous_quantity",label:"Số Định Lượng"
                 },
                 { 
                    field: "norm_item_no",label:"Mã Định Mức Vật Tư"
                 },              
                 { 
                    field: "norm_item_name",label:"Tên Định Mức Vật Tư"
                 }

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