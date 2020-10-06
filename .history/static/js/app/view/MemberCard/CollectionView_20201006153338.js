define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/MemberCard/tpl/collection.html');
    var	schema 				= require('json!schema/MemberCardSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "membercard",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [

					{
						name: "Tạo QR Code",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "Tạo mới",
						command: function(){
							var self = this;
							var path = self.collectionName+'model/';
							self.getApp().getRouter().navigate(path);
						}
					},
					

				]
			},
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "Tạo QR Code",
						type: "button",
						buttonClass: "btn-warning btn-sm",
						label: "Tạo QR Code",
						command: function(){
							var  self = this;
							var settings = {
								"async": true,
								"crossDomain": true,
								"url": self.getApp().urlPrefix + 'genqr',
								"method": "POST"
							  }
						   
							  $.ajax(settings).done(function (response) {
								console.log(response);
							  });
							// var self = this;
							// var url = self.getApp().urlPrefix + 'genqr';
							// var path = self.collectionName+'model/';
							// self.getApp().getRouter().navigate(path);
							// fetch('/api/v1/Genqr ', {
							// 	method: 'POST',

		                    //     success: function (model, respose, options) {
		                    //         self.getApp().notify("Lưu thông tin thành công");
		                    //         self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                            
		                    //     },
		                    //     error: function (model, xhr, options) {
		                    //         self.getApp().notify('Lưu thông tin không thành công!');
								   
									// }
								
		                        // }
							
						// })
							// $(document).ready(function(){})
							// $.ajax({ 
							// 	type: 'GET', 
							// 	url: self.getApp().urlPrefix + 'genqr', 
							// 	data: { get_param: 'link' }, 
							// 	dataType: 'json',
							// 	success: function (data) { 
							// 		$.each(data, function(index, element) {
							// 			// $('body').append($('<div>', {
							// 			// 	text: element.name
							// 			// }));
							// 			console.log(data)
							// 		});
							// 	}
							// });
							
						}
					},
					
				]
			},
		],
    	uiControl:{
    		fields: [
	    	    //  { 
	    	    // 	field: "id",label:"ID",
				//  },
				 { 
	    	    	field: "company_id",label:"Mã Công Ty ",
				 },
				 { field: "user_id", label: "Mã Chủ Thẻ", },

	    	     { field: "full_name", label: "Tên Chủ Thẻ"},
				 
				 { 
	    	    	field: "membercard_id",label:"Mã Thẻ ",
				 },
				 { 
	    	    	field: "wallet_id",label:"Mã Ví",
				 },
				 { 
	    	    	field: "start_date",label:"Ngày Mở Thẻ",
				 },
				 { 
	    	    	field: "expire_date",label:"Ngày Hết Hạn",
				 },
				 { 
	    	    	field: "status",label:"Trạng Thái",
				 },
				 { 
	    	    	field: "extra_data",label:"Thông Tin Chi Tiết ",
	    	     },
				//   { field: "ten", label: "Tên", width:250 },
				//   { field: "gia", label: "Giá" },
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