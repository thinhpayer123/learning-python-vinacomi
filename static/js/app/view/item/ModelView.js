define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item/tpl/model.html'),
    	schema 				= require('json!schema/ItemSchema.json');
    var CategorySelectView = require("app/view/item_category/SelectView");


	// var Model = Gonrin.Model.extend({
	// 	defaults: Gonrin.getDefaultModel(schema),
	// 	computeds: {
	// 		category: {
	// 			deps: ["category_no", "category_name"],
	// 			get: function (category_no, category_name) {
	// 				return {
	// 					"category_no": category_no,
	// 					"category_name": category_name,
	// 				};
	// 			},
	// 			set: function (obj) {
	// 				return { category_no: obj.category_no, category_name: obj.category_name };
	// 			}
	// 		},
	// 	},
	// 	urlRoot: "/api/v1/item"
	// });
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "item",

        uiControl: {
            fields: [
                {
                    field: "categories",
                    uicontrol: "ref",
                    textField: "category_name",
                    selectionMode: "multiple",
                    dataSource: CategorySelectView
                },

                {
                    field: "is_machine",
                    uicontrol: "checkbox",
                    checkedField: "name",
                    valueField: "value",
                    cssClassField: "cssClass",
                    dataSource: [
                        { name: true, value: true, },
                        { name: false, value: false },
                    ],
                    value: false
				},
                {
                    field: "is_product",
                    uicontrol: "checkbox",
                    checkedField: "name",
                    valueField: "value",
                    cssClassField: "cssClass",
                    dataSource: [
                        { name: true, value: true, },
                        { name: false, value: false },
                    ],
                    value: false
                },


                {
					field: "unit_name",
					uicontrol: "typeahead",
					source: function(query, process) {
                        // var url = gonrinApp().serviceURL + '/api/v1/unit';
                        // var url = gonrinApp().serviceURL + '/api/v1/unit?results_per_page=1000000';
                        var url = "/api/v1/unit";

                        $.ajax({
                            url: url,
                            dataType: "json",
                            success: function (data) {
                                return process(data.objects);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                return process([]);
                            }
                        });
                    },
                    displayText: function (obj) {
                        return typeof obj !== 'undefined' && typeof obj.name != 'undefined' ? obj.name : obj;
                    },
                    afterSelect: function (obj) {
                        var self = this;
                        console.log(self, self.onUnitChange);
                        self.onUnitChange(obj);
                    }

				},




                ]
            },
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
		    	    		return true;

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

    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
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
        onUnitChange: function(unit){
            var self = this;
            self.model.set("unit_no", unit.unit_no);
            self.model.set("unit_name", unit.name);
            self.model.set("unit_id", unit.id);
        },
        registerEvents: function () {
            var self = this;
        },


    });

});