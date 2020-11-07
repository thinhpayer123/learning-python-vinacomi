define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');


    var template 			= require('text!app/view/norm_template/tpl/collection.html');
    var	schema 				= require('json!schema/NormTemplateSchema.json');
    var norm 				= require('app/view/norm/CollectionView');  
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "norm_template",
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

		uiControl: {
			orderBy: [{ field: "created_at", direction: "asc" }],
			fields: [
				{ field: "norm_template_name", label: "Tên template" },
				{ field: "norm_template_no", label: "Mã template" },
				{ field: "norm_no", label: "Mã Định Mức" },
				{ field: "norm_name", label: "Tên Định Mức" },


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

