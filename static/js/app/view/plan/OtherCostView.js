define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var planSchema = require("json!schema/PlanOtherCostSchema.json");
    var template = require('text!./tpl/other_cost_item.html');
   

  
    return Gonrin.ItemView.extend({
      bindings: "other-cost-bind",
      template: template,
      tagName: "tr",
      modelSchema: planSchema,
      // modelClass: null,
      urlPrefix: "/api/v1/",
      collectionName: "plan_other_cost",   
      foreignRemoteField: "id",
      foreignField: "plan_id",
  
      render: function () {
        var self = this;
        console.log(self.viewData, self.model.toJSON());

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
  