define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
		var template 			= require('text!app/view/Order/tpl/collection.html');
		var	schema 				= require('json!schema/OrderSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "order",
    	textField: "ten",
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
	    	    //  { 
	    	    // 	field: "id",label:"ID",
	    	    //  },
				{ field: "membership_id", label: "Mã Người Dùng"},
				//   { field: "company_type", label: "kiểu công ty", width:200 },
				//   { field: "company_no", label: "Mã Đơn Vị" },

				//   { field: "user_id", label: "ID người dùng" },
				  { field: "membership_name", label: "Tên Người Dùng" },

				  { field: "tran_id", label: "ID Giao Dịch" },
				  { field: "tran_date", label: "Thời Gian" },
				  { field: "total_amount", label: "Tổng Tiền" },
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