define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/UserWallet/tpl/collection.html');
    var	schema 				= require('json!schema/UserWalletSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "user_wallet",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					// {
					// 	name: "create",
					// 	type: "button",
					// 	buttonClass: "btn-success btn-sm",
					// 	label: "Tạo mới",
					// 	command: function(){
					// 		var self = this;
					// 		var path = self.collectionName + '/model';
					// 		self.getApp().getRouter().navigate(path);
					// 	}
						
					// },
					{
						name: "import_excel",
						type: "button",
						buttonClass: "btn-danger margin-2",
						label: "Nhập excel",
						command: function() {

							
							var self = this
							self.$el.find("#form-import").show()
							var url = self.getApp().serviceURL + '/api/v1/file/upload';
							var input = document.querySelector('input[type="file"]')

							var data = new FormData()
							data.append('file', input.files[0])
							// data.append('user', 'hubot')
							
							fetch('/api/v1/file/upload', {
							  method: 'POST',
							  body: data
							})
							self.getApp().notify("upload success");
							self.getApp().getRouter().navigate(self.collectionName+ "/collection")
							
		
						}
						,
					},
					
				]
			},
		],
    	uiControl:{
    		fields: [
	    	    //  { 
	    	    // 	field: "id",label:"ID",
	    	    //  },
	    	     { field: "company_id", label: "ID công ty"},
				  { field: "company_type", label: "kiểu công ty", width:250 },
				  { field: "user_id", label: "ID người dùng" },
				  { field: "wallet_id", label: "ID ví tiền" },
				  { field: "relationship", label: "Quan hệ" },
				  { field: "company_no", label: "Hóa đơn công ty" },
				  { field: "user_no", label: "Hóa đơn người dùng" },
				//   { field: "extra_data", label: "extra_data" },



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