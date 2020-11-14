define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    var template1 			= require('text!app/view/norm/tpl/collection.html');

    var template 			= require('text!app/view/norm_well/tpl/collection.html');
    var	schema 				= require('json!schema/NormSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template1,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",

		collectionName: "norm",
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
							var path = self.collectionName + '_well/model';
							self.getApp().getRouter().navigate(path);
						}
					},
					
				]
			},
		],
    	uiControl:{
    		fields: [
                 // { 
                 //    field: "norm_no",label:"Mã Vật Tư Máy Cào"
                 // },
                 { 
                    field: "from_time",label:"Thời Gian Lập"
                 },
                 { 
                    field: "to_time",label:"Quyết Định Số"
                 },
                 { 
                    field: "priority",label:"Độ Ưu Tiên"
                 },    
                 { 
                    field: "active",label:"Trạng Thái"
                 }, 



				 	   
				 // { 
	    // 	    	field: "note",label:"Ghi Chú"
				 // },	   

				//      machine_name = db.Column(String(150), nullable=True)

    // note = db.Column(Text()) -->

				//   { field: "ten", label: "Tên", width:250 },
				//   { field: "gia", label: "Giá" },
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '_well/model?id='+ event.rowId;
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