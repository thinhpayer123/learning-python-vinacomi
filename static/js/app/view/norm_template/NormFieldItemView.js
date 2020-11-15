define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var template = require("text!app/view/norm_template/tpl/normfielditemview.html"),
    schema = require("json!schema/NormFieldSchema.json");

  // var Model = Gonrin.Model.extend({
  //   defaults: Gonrin.getDefaultModel(normSchema),

  // computeds: {
  //   DinhMuscChiTiet: {
  //     deps: ["label", "name"],
  //     get: function(label, name){
  //       return {
  //         "label": label, 
  //         "name": name, 

  //       };
  //     }, 
  //     set: function(obj){
  //     }
  //   },

  //   urlRoot: "/api/v1/norm_item"

  // }, 

  // });

  return Gonrin.ItemView.extend({
    bindings: "normfields-bind",
    template: template,
    tagName: "tr",
    modelSchema: schema,
    // modelClass: Model,
    urlPrefix: "/api/v1/",
    collectionName: "norm_template_field",
    foreignRemoteField: "id",
    foreignField: "norm_template_id",

    // uiControl: {
    //   fields: [
    //     {
    //       field: "norm_item_no",
    //       uicontrol: "typeahead",
    //       source: function(query, process) {
    //                     var url = gonrinApp().serviceURL + '/api/v1/norm_items';
    //                     $.ajax({
    //                         url: url,
    //                         dataType: "json",
    //                         success: function (data) {
    //                             return process(data.objects);
    //                         },
    //                         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                             return process([]);
    //                         }
    //                     });
    //                 },
    //                 displayText: function (item) {
    //                     return typeof item !== 'undefined' && typeof item.item_no != 'undefined' ? item.item_no : item;
    //                 },
    //                 afterSelect: function (item) {
    //                     var self = this;
    //                     self.onItemChange(item);
    //                 }
    //             },
    //             {
    //       field: "norm_item_name",
    //       uicontrol: "typeahead",
    //       source: function(query, process) {
    //                     var url = gonrinApp().serviceURL + '/api/v1/norm_items';
    //                     $.ajax({
    //                         url: url,
    //                         dataType: "json",
    //                         success: function (data) {
    //                             return process(data.objects);
    //                         },
    //                         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                             return process([]);
    //                         }
    //                     });
    //                 },
    //                 displayText: function (item) {
    //                     return typeof item !== 'undefined' && typeof item.item_name != 'undefined' ? item.item_name : item;
    //                 },
    //                 afterSelect: function (item) {
    //                     var self = this;
    //                     self.onItemChange(item);
    //                 }
    //     },
    //   ]
    // },

    render: function () {
      var self = this;
      if (!self.model.get("id")) {
        self.model.set("id", gonrin.uuid());
      }
      this.applyBindings();

      self.$el.find("#itemRemove").unbind("click").bind("click", function () {
        self.remove(true);
      });
    },

    // onItemChange: function(item){
    //     var self = this;
    //     self.model.set("norm_item_no", item.id);
    //     self.model.set("norm_item_name", item.item_no);

    // },

  });

});
