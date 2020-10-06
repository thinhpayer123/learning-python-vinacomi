define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!./tpl/model.html'),
        // schema = require('json!schema/ItemCategorySchema.json');
    var Helper = require('text!app/common/Helper');
    var currencyFormat = {
        symbol: "VNĐ", // default currency symbol is '$'
        format: "%v %s", // controls output: %s = symbol, %v = value (can be object, see docs)
        decimal: ",", // decimal point separator
        thousand: ".", // thousands separator
        precision: 0, // decimal places
        grouping: 3 // digit grouping (not implemented yet)
    };
    return Gonrin.ModelDialogView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/tenant/",
        collectionName: "itemcategory",
        allData: [],
        onInt: false,
        invalid: false,
        uiControl: {
            fields: [
                {
                    field: "category_type",
                    uicontrol: "combobox",
                    textField: "text",
                    valueField: "value",
                    dataSource: []
                },
                {
                    field: "image",
                    uicontrol: "imagelink",
                    service: {
                        url: "https://upstart.vn/services/api/image/upload?path=identity"
                    }
                }
            ],
        },
        tools: [
            {
                name: "defaultgr",
                type: "group",
                groupClass: "toolbar-group",
                buttons: [{
                    name: "back",
                    type: "button",
                    buttonClass: "btn btn-secondary btn-sm",
                    label: "<span class='fa fa-times'></span> Đóng",
                    command: function () {
                        var self = this;
                        self.close();
                    }
                },
                {
                    name: "save",
                    type: "button",
                    buttonClass: "btn-primary btn-sm",
                    label: "<span class='fa fa-save'></span> Lưu",
                    command: function () {
                        var self = this;
                        if (self.invalid) {
                            toastr.error("Mã hàng hóa bị trùng");
                            return;
                        }
                        if (!self.validate()) {
                            return;
                        }
                        self.model.set("category_no", self.model.get("category_no").toLocaleUpperCase().trim());
                        self.model.set("category_ascii_name", Helper.replaceToAscii(self.model.get('category_name')));
                        self.model.save(null, {
                            success: function (model, respose, options) {
                                self.getApp().notify("Lưu thông tin thành công");
                                self.trigger("close", self.model.toJSON());
                                self.close();
                            },
                            error: function (model, xhr, options) {
                                self.getApp().notify(xhr.responseJSON.error_message);
                                // self.getApp().notify('Lưu thông tin không thành công!');
                            }
                        });
                    }
                },
                {
                    name: "delete",
                    type: "button",
                    buttonClass: "btn-danger btn-sm",
                    label: "<span class='fa fa-trash'></span> Xoá",
                    visible: function () {
                        return ((!!this.viewData) && (!!this.viewData.id));
                    },
                    command: function () {
                        var self = this;
                        self.model.set("deleted", true);
                        self.model.save(null, {
                            success: function (model, respose, options) {
                                self.getApp().notify("Xóa thành công");
                                self.trigger("close", self.model.toJSON());
                                self.close();
                            },
                            error: function (model, xhr, options) {
                                self.getApp().notify('Lưu thông tin không thành công!');
                            }
                        });
                    }
                },
                ],
            }],
        render: function () {
            var self = this;
            var current_tenant = self.getApp().data('current_tenant');
            if (current_tenant === null || current_tenant === undefined) {
                self.getApp().notify("Không tìm thấy thương hiệu");
                return;
            }
            if (self.model.get('image')) {
                self.$el.find("#image_preview").css({
                    "background-image": "url(" + self.model.get('image') + ")"
                });
            }
            this.model.on("change:image", () => {
                self.$el.find("#image_preview").css({
                    "background-image": "url(" + self.model.get('image') + ")"
                });
            });
            var id = null;
            if ((!!this.viewData) && (!!this.viewData.id)) {
                id = this.viewData.id;
            }
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                        self.registerEvent();
                        self.registerSwitchUI();
                    },
                    error: function () {
                        self.getApp().notify("Get data Eror");
                    },
                });
            } else {
                this.model.set('tenant_id', current_tenant.id);
                self.applyBindings();
                self.registerEvent();
                self.registerSwitchUI();
            }
        },
        registerEvent: function () {
            var self = this;
        },
        registerSwitchUI: function () {
            const self = this;
            self.$el.find(".switch input[id='status_deleted']").unbind("click").bind("click", function ($event) {
                if ($(this).is(":checked")) {
                    self.model.set("deleted", false);
                } else {
                    self.model.set("deleted", true);
                }
            })
            if (self.model.get("deleted") !== true) {
                self.$el.find(".switch input[id='status_deleted']").trigger("click");
            }
        },
        validate: function () {
            var self = this;
            if (!self.model.get("category_no")) {
                self.getApp().notify("Nhập mã sản phẩm");
                return;
            }
            if (self.model.get("category_no") && self.model.get("category_no").indexOf(" ") >= 0) {
                self.getApp().notify("Mã hàng hóa không được chứa dấu cách");
                return;
            }
            if (!self.model.get("category_name")) {
                self.getApp().notify("Nhập tên sản phẩm");
                return;
            }
            return true;
        },
    });
});