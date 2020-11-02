define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm/tpl/collection.html'),
    	schema 				= require('json!schema/NormSchema.json');

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
	    	    //  { field: "ma", label: "Mã", width:150},
				 //  { field: "ten", label: "Tên", width:250 },
				 // { 
	    // 	    	field: "id",label:"ID"
				 // },
				 { 
	    	    	field: "norm_no",label:"Kiểu Đơn Vị "
				 },
				 { 
	    	    	field: "from_time",label:"Thời Gian Bắt Đầu"
				 },
				 { 
	    	    	field: "to_time",label:"Thời Gian Kết Thúc"
				 },
				 { 
	    	    	field: "priority",label:"Độ Ưu Tiên"
				 },
	    	     
				 // { 
	    // 	    	field: "active",label:"active"
				 // }
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