define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/price_list/tpl/collection.html'),
    	schema 				= require('json!schema/ItemPriceSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "norm",
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
                { field: "price_list_no", label: "Mã Bảng Giá" },
                { field: "price_list_name", label: "Tên Bảng Giá" },
                { field: "priority", label: "Ưu Tiên" },
                { field: "start_time", label: "Ngày Tạo" },
                { field: "end_time", label: "Ngày Kết Thúc" },  

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


    // norm_no = db.Column(String(255),nullable = True)
    // from_time = db.Column(BigInteger(), index=True)
    // to_time = db.Column(BigInteger(), index=True)
    // priority = db.Column(Integer(), default=10)