define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_decision/tpl/collection.html'),
    	schema 				= require('json!schema/NormDecisionSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "norm_decision",
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
                    field: "normdecision_no",label:"Mã"
                 },
                 { 
                    field: "normdecision_name",label:"Tên"
                 },
                 { 
                    field: "price_no",label:"Giá"
                 },
                 { 
                    field: "salary",label:"Tiền Lương"
                 },    
                 { 
                    field: "material",label:"Vật Liệu"
                 },
                 { 
                    field: "social_insurance",label:"Bảo Hiểm Xã Hội"
                 },
                 { 
                    field: "depreciation",label:"khấu Hao"
                 },
                 { 
                    field: "other_costs",label:"Chi Phí Khác"
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


