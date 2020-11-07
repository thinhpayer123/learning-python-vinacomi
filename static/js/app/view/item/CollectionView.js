define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item/tpl/collection.html');
    var	schema 				= require('json!schema/ItemSchema.json');
    var CategorySelectView = require("app/view/item_category/SelectView");

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "item",
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
	    // 	     { 
	    // 	    	field: "item_exid",label:"Mã Vật Tư Tích Hợp"
				 // },
				 { 
	    	    	field: "item_no",label:"Mã Vật Tư"
				 },
				 { 
	    	    	field: "item_name",label:"Tên Vật Tư"
				 },
				 // { 
	    // 	    	field: "item_ascii_name",label:"Tên Đơn Vị"
				 // },
				//  { 
	    	    // 	field: "item_type",label:"Loại Vật Tư"
				//  },


				 { 
	    	    	field: "brief_desc",label:"Mô Tả"
				 },
				 { 
	    	    	field: "unit_name",label:"Tên Đơn Vị Tính"
				 },
				 { 
	    	    	field: "tax_class",label:"Thuế"
				 },
				 // { 
	    // 	    	field: "categories",label:"Nhóm Vật Tư"
				 // },


				 { 
	    	    	field: "item_class",label:"Lớp Đơn Vị"
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



//     item_exid = db.Column(String(100), index=True) #id tich hop tu he thong khac
//     item_no = db.Column(String(40), index=True, nullable=False)
//     item_name = db.Column(String(150), nullable=False)
//     item_ascii_name = db.Column(String(150))
//     item_type = db.Column(String(100))
//     item_class = db.Column(String(100))
//     thumbnail = db.Column(Text())
//     images = db.Column(JSONB())
//     brief_desc = db.Column(Text())
//     description = db.Column(Text())
//     manufacturer = db.Column(String(200), nullable=True)
//     qty_per_unit = db.Column(FLOAT(11,2), nullable=True)
//     weight = db.Column(FLOAT(11,2), nullable=True)
//     pack_size = db.Column(Integer(), nullable=True)
//     unit_id = db.Column(String(200))
//     unit_name = db.Column(String(200))
//     tax_class = db.Column(String(200))
//     is_product = db.Column(Boolean(), nullable=True)
//     is_raw_material = db.Column(Boolean(), nullable=True)
//     is_material = db.Column(Boolean(), nullable=True)
//     is_service = db.Column(Boolean(), nullable=True)
//     is_machine = db.Column(Boolean(), nullable=True)
//     active = db.Column(Boolean(), nullable=True)
//     extra_attributes = db.Column(JSONB())
//     package_items = db.Column(JSONB())
//     categories = db.relationship("ItemCategory", secondary='items_categories')