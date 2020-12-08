define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/norm_template/tpl/collection.html'),
		schema = require('json!schema/NormTemplateSchema.json');

	return Gonrin.CollectionDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "norm_template",
		textField: "name",
		valueField: "id",
		tools: [
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
						command: function () {
							var self = this;
							self.trigger("onSelected");
							self.close();
						}
					},
				]
			},
		],
		uiControl: {
			fields: [
				{
					field: "norm_template_no", label: "Quyết Định Số"
				},
				{
					field: "norm_template_name", label: "Tên Quyết Định"
				},
			],
			onRowClick: function (event) {
				this.uiControl.selectedItems = event.selectedItems;

			},
		},
		render: function () {
			var self = this;

			self.applyBindings();

			return this;
		},

	});

});