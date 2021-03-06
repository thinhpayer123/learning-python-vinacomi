define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item_category/tpl/collection.html');
    var	schema 				= require('json!schema/ItemCategorySchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "item_category",
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
                    field: "category_no",label:"Danh Mục",
                 },
                 { 
                    field: "category_name",label:"Tên Nhóm Vật Tư",
                 },
                 { 
                    field: "status",label:"Trạng Thái",
                 },
                 {
                    field: "norm_template", textField: "norm_template_name",label:"Template",
				 },
                 {
                    field: "department", textField: "name",label:"Tên Đơn Vị",
                 }, 				                  
                 { 
                    field: "sort",label:"Sắp Xếp Số",
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
