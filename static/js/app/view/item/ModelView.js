define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/item/tpl/model.html'),
    	schema 				= require('json!schema/ItemSchema.json');
    var CategorySelectView = require("app/view/item_category/SelectView");
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
					field: "unit_name",
					uicontrol: "typeahead",
					source: function(query, process) {
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
		    	    	label: "L??u Th??ng Tin ",
		    	    	command: function(){
		    	    		var self = this;
		    	    		
		                    self.model.save(null,{
		                        success: function (model, respose, options) {
		                            self.getApp().notify("L??u th??ng tin th??nh c??ng");
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                            
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('L??u th??ng tin kh??ng th??nh c??ng!');
		                           
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
		                        	self.getApp().notify('Xo?? d??? li???u th??nh c??ng');
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Xo?? d??? li???u kh??ng th??nh c??ng!');
		                            
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