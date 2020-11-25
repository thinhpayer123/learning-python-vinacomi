define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var planSchema = require("json!schema/PlanFuelItemSchema.json");
  // var template = require('text!./tpl/plan_fuel_item.html');
 
  var template_head = `<td class="row-item">
    <input class=" form-control text-center" readonly plan-bind="value:item_name">
  </td>
  <td class="row-item">
    <input class=" form-control text-center" readonly plan-bind="value:unit_name">
  </td>`;

  var template_mid = `<td class="row-item">
  <input class=" form-control text-center" plan-bind="value:data_norm_quantity_{{brazier_id_dash}}">
</td>

<td class="row-item">
  <input class=" form-control text-center" plan-bind="value:data_factor_{{brazier_id_dash}}">
</td>

<td class="row-item">
  <input class=" form-control text-center" plan-bind="value:data_quantity_{{brazier_id_dash}}">
</td>`;



  var template_tail = `<td class="row-item" id=''>
    <input class=" form-control text-center" plan-bind="value:demand_quantity">
  </td>

  <td class="row-item">
    <input class=" form-control text-center" plan-bind="value:approved_quantity">
  </td>
  <td class="row-item">
    <input class=" form-control text-center" plan-bind="value:note">
  </td>

  <td class="row-item">
    <button type="button" class="btn btn-sm btn-outline-danger" id="itemRemove">
        <i class="cil-x"></i>
    </button>
  </td>`;

  return Gonrin.ItemView.extend({
    bindings: "plan-bind",
    template: null,
    tagName: "tr",
    modelSchema: planSchema,
    // modelClass: null,
    urlPrefix: "/api/v1/",
    collectionName: "plan_fuel_item",   
    foreignRemoteField: "id",
    foreignField: "plan_id",

    render: function () {
      var self = this;
      // console.log(self.viewData, self.model.toJSON());
      //Cong template
      
      var template = template_head;
      for(var i = 0 ; i < self.viewData.braziers.length; i++){
        var template_bazier = gonrin.template(template_mid)(self.viewData.braziers[i]);
        template = template + template_bazier;
      }
      template = template + template_tail;
      self.$el.html(template);

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
