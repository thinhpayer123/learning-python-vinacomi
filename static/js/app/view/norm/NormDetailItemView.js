define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var normSchema = require("json!schema/NormDetailSchema.json");
 
  

  return Gonrin.ItemView.extend({
    bindings: "norm-detail-bind",
    template: null,
    tagName: "tr",
    modelSchema: normSchema,
    modelClass: null,
    urlPrefix: "/api/v1/",
    collectionName: "norm_details",   
    foreignRemoteField: "id",
    foreignField: "norm_id",

    render: function () {
      var self = this;
      if (!self.model.get("id")) {
          self.model.set("id", gonrin.uuid());
          self.model.trigger("change");
      }
      this.applyBindings();

      self.$el.find("#itemRemove").unbind("click").bind("click", function () {
        self.model.trigger("remove", {
          "id": self.model.get("id"),
          "item_id": self.model.get("item_id"),
          "category_id": self.model.get("category_id"),
        });
        self.remove(false);
      });
    },

  });

});
