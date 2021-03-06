define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item_class/tpl/collection.html');
    var	schema 				= require('json!schema/ItemClassSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "item_class",
    	textField: "name",
    	valueField: "id",
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
	    	    	field: "item_class_id",label:"Mã Lớp Đơn Vị",
				 },
				 { 
	    	    	field: "item_class_name",label:"Tên Lớp Đơn Vị",
				 },
				 { 
	    	    	field: "active",label:"Trạng Thái",
				 },
				 { 
	    	    	field: "extra_data",label:"Dữ Liệu Bổ Xung",
				 },


				 { 
	    	    	field: "description",label:"Miểu Tả",
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