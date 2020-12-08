define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/norm_detail/tpl/collection.html'),
    	schema 				= require('json!schema/NormDetailSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "norm_detail",
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
                    field: "norm_item_exid",label:"norm_item_exid"
                 },
                 { 
                    field: "norm_item_no",label:"Mã Định Mức Vật Tư"
                 },
                 { 
                    field: "norm_item_name",label:"Tên Định Mức Vật Tư"
                 },
                 { 
                    field: "norm_item_ascii_name",label:"Tên Định Mức ascii"
                 },
                 { 
                    field: "brief_desc",label:"Mô Tả Ngắn Gọn"
                 },
                 { 
                    field: "description",label:"Miêu Tả"
                 },    
            // "norm_no": norm_no, 
            // "item_no": item_no, 
            // "item_name": item_name,
            // "machine_name":machine_name, 
            // "note": note,
            // "unit_name": unit_name -->

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

    // norm_item_exid = db.Column(String(100), index=True) 
    // norm_item_no = db.Column(String(40), index=True, nullable=False)
    // norm_item_name = db.Column(String(150), nullable=False)
    // norm_item_ascii_name = db.Column(String(150))
    // brief_desc = db.Column(Text())
    // description = db.Column(Text())