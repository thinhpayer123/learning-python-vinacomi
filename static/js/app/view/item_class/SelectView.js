define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item_class/tpl/collection.html'),
    	schema 				= require('json!schema/ItemClassSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "item_class",
    	textField: "name",
    	valueField: "id",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "select",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:SELECT",
		    	    	command: function(){
		    	    		var self = this;
		    	    		self.trigger("onSelected");
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
	    	    //  { field: "ma", label: "Mã", width:150},
				 //  { field: "ten", label: "Tên", width:250 },
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
				 // { 
	    // 	    	field: "thumbnail",label:"Số Điện Thoại",
				 // },
	    	     // { field: "is_show", label: "Point Name"},

				 { 
	    	    	field: "description",label:"Miểu Tả",
				 },   
            // "norm_no": norm_no, 
            // "item_no": item_no, 
            // "item_name": item_name,
            // "machine_name":machine_name, 
            // "note": note,
            // "unit_name": unit_name -->

		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    		
	    	},
    	},
    	render:function(){
    		var self= this;
    		
    		self.applyBindings();
    		
    		return this;
    	},
    	
    });

});


    // norm_id = db.Column(UUID(as_uuid=True), db.ForeignKey('norm.id', ondelete='cascade'))
    // norm_no = db.Column(String(255),nullable = True)

    // type = db.Column(SmallInteger()) #0: Vat tu thuong xuyen sua chua , 1: bao duong sua chua: 3: 
    
    // item_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'), index=True)
    // # item_id = db.Column(UUID(as_uuid=True), index=True, db.ForeignKey('item.id'))

    // item_no = db.Column(String(40), index=True, nullable=True)
    // item_name = db.Column(String(150), nullable=True)

    // unit_id = db.Column(UUID(as_uuid=True))
    // unit_no = db.Column(String())
    // unit_name = db.Column(String())

    // machine_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'), index=True)
    // machine_no = db.Column(String(40), index=True, nullable=True)
    // machine_name = db.Column(String(150), nullable=True)

    // note = db.Column(Text())