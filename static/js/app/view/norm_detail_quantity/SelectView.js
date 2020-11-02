define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_detail_quantity/tpl/collection.html'),
    	schema 				= require('json!schema/NormDetailQuantitySchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "norm_detail_quantity",
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
	    	    //  { field: "ma", label: "Mã", width:150},
				 //  { field: "ten", label: "Tên", width:250 },
				 { 
	    	    	field: "norm_no",label:"norm_no"
				 },
				 { 
	    	    	field: "type",label:"type"
				 },
				 { 
	    	    	field: "quantity",label:"quantity"
				 },
				 { 
	    	    	field: "previous_quantity",label:"previous_quantity"
				 },
				 { 
	    	    	field: "product_no",label:"product_no"
				 },	    	     
				 { 
	    	    	field: "product_name",label:"product_name"
				 }
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




    // norm_id = db.Column(UUID(as_uuid=True), db.ForeignKey('norm.id', ondelete='cascade'))
    // norm_no = db.Column(String(255),nullable = True)

    // norm_detail_id = db.Column(UUID(as_uuid=True), db.ForeignKey('norm_detail.id', ondelete='cascade'))
    // type = db.Column(SmallInteger())

    // quantity = db.Column(DECIMAL(25,8))
    // previous_quantity = db.Column(DECIMAL(25,8))
    // product_id = db.Column(UUID(as_uuid=True), db.ForeignKey('item.id', ondelete='cascade'), index=True)
    // product_no = db.Column(String(), index=True, nullable=True)
    // product_name = db.Column(String(), nullable=True)
