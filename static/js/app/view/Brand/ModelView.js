define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/Brand/tpl/model.html'),
		schema 				= require('json!schema/BrandSchema.json');
	var CompanyView = require('app/view/Company/SelectView');
	var Model = Gonrin.Model.extend({
		defaults: Gonrin.getDefaultModel(schema),
		computeds: {
			company: {
				deps: ["company_id", "company_name"],
				get: function( company_id, company_name ) {
					return {
						"id": company_id,
						"name": company_name,
						};
				},
				set: function( obj ) {
					return {company_id: obj.id, company_name: obj.name};
				}
			},
		},
		urlRoot : "/api/v1/brand"
	});
	
    return Gonrin.ModelView.extend({
    	template : template,
		modelSchema	: schema,
		modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "brand",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
						name: "back",
						type: "button",
						buttonClass: "btn-default btn-sm",
						label: "TRANSLATE:BACK",
						command: function(){
							var self = this;
							
							Backbone.history.history.back();
						}
					},
					{
		    	    	name: "save",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "Lưu Thông Tin ",
		    	    	command: function(){
		    	    		var self = this;
		    	    		
		                    self.model.save(null,{
		                        success: function (model, respose, options) {
		                            self.getApp().notify("Lưu thông tin thành công");
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                            
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Lưu thông tin không thành công!');
		                           
		                        }
		                    });
		    	    	}
		    	    },
					{
		    	    	name: "delete",
		    	    	type: "button",
		    	    	buttonClass: "btn-danger btn-sm",
		    	    	label: "TRANSLATE:DELETE",
		    	    	visible: function(){
		    	    		return this.getApp().getRouter().getParam("id") !== null;
		    	    	},
		    	    	command: function(){
		    	    		var self = this;
		                    self.model.destroy({
		                        success: function(model, response) {
		                        	self.getApp().notify('Xoá dữ liệu thành công');
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Xoá dữ liệu không thành công!');
		                            
		                        }
		                    });
		    	    	}
		    	    },
    	    	],
			}],
			uiControl:{
				fields:[
					{
						field:"company",
						uicontrol:"ref",
						textField: "name",
						dataSource: CompanyView
					},
				]
			},
			// uiControl:{
			// 	fields:[
			// 		{
			// 			field:"comapny",
			// 			uicontrol:"ref",
			// 			textField: "name",
			// 			dataSource: companyview
			// 		},
			// 	]
			// },
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			//progresbar quay quay
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else{
    			self.applyBindings();
    		}
    		
    	},
    });

});