define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/brazier/tpl/collection.html');
    var	schema 				= require('json!schema/BrazierSchema.json');
    // var CategorySelectView = require("app/view/item_category/SelectView");

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "brazier",
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
	    	    	field: "brazier_no",label:"Mã Lò"
				 },
				 { 
	    	    	field: "name",label:"Tên Lò"
				 },
				 { 
	    	    	field: "brazier_type",label:"Loại Lò"
				 },
				 {
                    field: "department", textField: "name",label:"Tên Đơn Vị",
                 }, 
				 { 
	    	    	field: "description",label:"Mô Tả Ngắn Gọn"
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
