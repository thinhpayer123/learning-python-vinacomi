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
	    	    	field: "category_exid",label:"ID",
				 },
				 { 
	    	    	field: "category_no",label:"Danh Mục",
				 },
				 { 
	    	    	field: "category_name",label:"Tên Nhóm Vật Tư",
				 },
				 { 
	    	    	field: "category_type",label:"Loại Nhóm Vật Tư ",
				 },
				 // { 
	    // 	    	field: "thumbnail",label:"Số Điện Thoại",
				 // },
	    	     // { field: "is_show", label: "Point Name"},

				 { 
	    	    	field: "sort_number",label:"Sắp Xếp Số",
				 },

	    	     { field: "status", label: "Trạng Thái"},


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


    // category_exid = db.Column(String(100), nullable=True, index=True)
    // category_no = db.Column(String(100), nullable=True)
    // category_name = db.Column(String(150), nullable=False)
    // category_type = db.Column(String(50))
    // thumbnail = db.Column(Text())
    // is_show = db.Column(Boolean(), default=True)
    // sort_number = db.Column(Integer(), default=0)
    // status = db.Column(String(20), default="active")
    // items = db.relationship("Item", secondary='items_categories', lazy='dynamic')