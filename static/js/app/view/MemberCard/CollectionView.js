define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/MemberCard/tpl/collection.html');
	var	schema 				= require('json!schema/MemberCardSchema.json');
	var ModelDialogView = require('app/view/MemberCard/ModelDialogView');
	// var TemplateHelper = require('text!app/common/TemplateHelper');
    // var CustomFilterView = require('text!app/common/CustomFilterView');
    
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
							var self = this;
							
							var url = self.getApp().serviceURL + '/api/v1/Genqr';
							$.ajax({
								// type: 'GET',
								url: url,

								dataType: "json",
								success: function (data) {
									// console.log(data)
									var link  = data.link;
									// console.log(link)
									// console.log(data);
									var dialogView = new ModelDialogView({
										viewData: {
											link: link
										}
											
									});
									dialogView.dialog();
								},
								error: function (XMLHttpRequest, textStatus, errorThrown) {
									console.log("Before navigate login");
								
								}
							});

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
						name: "Tạo Wallet ID",
						type: "button",
						buttonClass: "btn-primary btn-sm",
						label: "Tạo Ví",
						command: function(){
							var self = this;
							var url = self.getApp().serviceURL + '/api/v1/create_wallet_user';
							$.ajax({
								// type: 'GET',
								url: url,

								dataType: "json",
								success: function (data) {
									// console.log(data)
									var notify  = data.notify;
									// console.log(link)
									// console.log(data);
									var dialogView = new ModelDialogView({
										viewData1: {
											notify: notify
										}
											
									});
									dialogView.dialog();
								},
								error: function (XMLHttpRequest, textStatus, errorThrown) {
									console.log("Before navigate login");
								
								}
							});
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
				 { field: "user_no", label: "Mã Chủ Thẻ", },

	    	     { field: "user_name", label: "Tên Chủ Thẻ"},
				 
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
		    	// if(event.rowId){
		        // 		var path = this.collectionName + '/model?id='+ event.rowId;
		        // 		this.getApp().getRouter().navigate(path);
				// }
				// var self = this;
                // if (event.rowId) {
                //     var view = new ModelDialogView({
                //         viewData: {
                //             id: event.rowId
                //         }
                //     });
                //     view.dialog({
                //         size: "large"
                //     });
                //     view.on("close", function (data) {
                //         self.getApp().router.refresh();
                //     });
                // }
				
		    	
			},
			// onRendered: function() {
            //     loader.hide();
			// },
		},
			// initialize: function() {
			// 	loader.show();
			// },
	    render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});
