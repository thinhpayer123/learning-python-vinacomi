define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/Order/tpl/collection.html');
    var	schema 				= require('json!schema/OrderSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "order",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					// {
					// 	name: "import_excel",
					// 	type: "button",
					// 	buttonClass: "btn-danger margin-2",
					// 	label: "Nhập excel",
					// 	command: function() {

							
					// 		var self = this;
					// 		self.$el.find("#form-import").show();
					// 		var url = self.getApp().serviceURL + '/api/v1/file/upload';
					// 		var input = document.querySelector('input[type="file"]');

					// 		var data = new FormData();
					// 		data.append('file', input.files[0]);
					// 		// data.append('user', 'hubot')
							
					// 		fetch('/api/v1/file/upload', {
					// 		  method: 'POST',
					// 		  body: data
					// 		})
					// 		self.getApp().notify("upload success");
					// 		self.getApp().getRouter().navigate(self.collectionName+ "/collection")
							
		
					// 	}
					// 	,
					// },
					{
						name: "create",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "Tạo Ví",
						command: function(){
							var self = this;
							var path = self.collectionName + '/model';
							self.getApp().getRouter().navigate(path);
						}
						
					}
					
				]
			},
		],
    	uiControl:{
    		fields: [
	    	    //  { 
	    	    // 	field: "id",label:"ID",
	    	    //  },
	    	     { field: "membership_id", label: "Mã Người Dùng"},
				//   { field: "company_type", label: "kiểu công ty", width:200 },
				//   { field: "company_no", label: "Mã Đơn Vị" },

				//   { field: "user_id", label: "ID người dùng" },
				  { field: "membership_name", label: "Tên Người Dùng" },

				  { field: "tran_id", label: "ID Giao Dịch" },
				  { field: "tran_date", label: "Thời Gian" },
				  { field: "total_amount", label: "Tổng Tiền" },



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