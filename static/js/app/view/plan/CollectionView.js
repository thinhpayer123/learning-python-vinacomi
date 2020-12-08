define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/plan/tpl/collection.html');
    var	schema 				= require('json!schema/PlanSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "plan",
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
							
							// var path =  '/plan/model?norm_template_no=' + norm_template_no;
							self.getApp().getRouter().navigate(path);
						}
					},
					
				]
			},
		],
    	uiControl:{
    		fields: [
				 { 
                    field: "plan_name",label:"Tên Kế Hoạch"
				 },
				{ 
                    field: "department_name",label:"Đơn Vị"
                 },  
 

		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
					var path = this.collectionName + '/model?id='+ event.rowId ;
					// var path =  '/plan/model?id='+ event.rowId + "&norm_template_no=" + norm_template_no;
		        	this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
	    	var self = this;
			this.applyBindings();
	    	
	    	return this;
    	},
    });

});