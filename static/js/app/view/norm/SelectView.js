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
                 { 
                    field: "norm_document_no",label:"Quyết Định Số"
                 }, 
                 { 
                    field: "norm_document_name",label:"Tên Quyết Định"
                 },   
                 { 
                    field: "year",label:"Năm"
                 },         
                 { 
                    field: "norm_name",label:"Tên Định Mức"
                 },

                 // { 
        //          field: "norm_no",label:"Mã Định Mức Vật Tư Máy Cào"
                 // },               
                 // { 
        //          field: "from_time",label:"Thời Gian Lập"
                 // },
                 { 
                    field: "priority",label:"Độ Ưu Tiên"
                 },    
                 { 
                    field: "active",label:"Trạng Thái"
                 },
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