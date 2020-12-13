define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var planSchema = require("json!schema/PlanSalarySchema.json");
  var template = require('text!./tpl/salary_brazier_item.html');
 


  return Gonrin.ItemView.extend({
    bindings: "salary-brazier-bind",
    template: template,
    tagName: "tr",
    modelSchema: planSchema,
    // modelClass: null,
    urlPrefix: "/api/v1/",
    collectionName: "salary",   
    foreignRemoteField: "id",
    foreignField: "plan_id",

    render: function () {
      var self = this;

      this.applyBindings();

      self.$el.find("#itemRemove").unbind("click").bind("click", function () {
        self.model.trigger("remove", {
          "id": self.model.get("id"),
          "category_id": self.model.get("category_id"),
          "brazier_id": self.model.get("brazier_id"),
        });
        self.remove(false);
      });
    },

  });

});
