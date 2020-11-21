define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/plan_item/tpl/collection.html');
    var	schema 				= require('json!schema/PlanItemSchema.json');
    // var CategorySelectView = require("app/view/item_category/SelectView");

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "plan_item",
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
	    	    	field: "item_name",label:"Tên Vật Tư"
				 },
				 { 
	    	    	field: "brazier_name",label:"Tên Lò"
				 },
				 { 
	    	    	field: "unit_name",label:"Đơn Vị Tính"
				 },
				 { 
	    	    	field: "total_amount",label:"Tổng Tiền"
				 },
				 { 
	    	    	field: "note",label:"Ghi Chú"
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
