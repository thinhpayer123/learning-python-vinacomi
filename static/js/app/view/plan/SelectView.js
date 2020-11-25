define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
    
    var template 			= require('text!app/view/plan/tpl/collection.html'),
    	schema 				= require('json!schema/PlanSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "plan",
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
                    field: "plan_name",label:"Phòng"
				 },
                //  { 
                //     field: "norm_document_no",label:"Đơn Vị"
                //  },  
                 { 
                    field: "department_name",label:"Đơn Vị"
                 },   
       
                //  { 
                //     field: "working_days",label:"Ngày Tháng Lập"
                //  },
                //  { 
                //     field: "priority",label:"Đơn Vị"
                //  },    
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

