define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/plan_item_category/tpl/model.html'),
    	schema 				= require('json!schema/PlanFuelItemCategorySchema.json');
	var	DepartmentTemplate = require("app/view/department/SelectView");
	var ItemView = require('./ItemView');

    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "plan_item_category",
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
		    	    	label: "Lưu Phòng Ban",
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
		uiControl: {
			fields: [
						// {
						// 	field: "norm_template",
						// 	uicontrol: "ref",
						// 	textField: "norm_template_name",
						// 	// selectionMode: "multiple",
						// 	dataSource: NormTemplate,
						// 	foreignRemoteField: "id",
						// 	foreignField: "norm_template_id"
						// },
						{
							field: "department",
							uicontrol: "ref",
							textField: "name",
							// selectionMode: "multiple",
							dataSource: DepartmentTemplate,
							foreignRemoteField: "id",
							foreignField: "department_id"
						},
						{
							field: "items",
							uicontrol: false,
							itemView:ItemView,
							tools: [
								{
									name: "create",
									type: "button",
									buttonClass: "btn btn-primary btn-sm",
									label: "Thêm",
									command: "create"
								},
							],
							toolEl: "#add_row"
						},
					],
				},
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