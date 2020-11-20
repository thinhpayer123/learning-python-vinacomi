define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/gaio/tpl/model.html'),
    	schema 				= require('json!schema/GAIODetailSchema.json');
	var ChiTietBangKeItemView = require("app/view/gaio/itemView")
    return Gonrin.ModelView.extend({
	
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "gaio",
		bindings: "data-bind",
		listItemView: [],
		listItemRemove: [],
		brands_id: [],
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
		    	    	label: "Lưu bảng kê",
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
		uiControl: {
			fields: [
			  {
						  field: "detail",
						  uicontrol: false,
						  itemView: ChiTietBangKeItemView,
						  tools: [{
							  name: "create",
							  type: "button",
							  buttonClass: "btn btn-outline-success btn-sm",
							  label: "<span class='fa fa-plus'></span>",
							  command: "create"
						  }],
						  toolEl: "#add-item"
					  },
			 
			  {
				field: "create_date",
				uicontrol: "datetimepicker",
				textFormat: "DD/MM/YYYY",
				extraFormats: ["DDMMYYYY"],
				parseInputDate: function (val) {
				  return moment.unix(val);
				},
				parseOutputDate: function (start_time) {
				  return start_time.unix();
				},
			  }
			],
		  },
    });

});