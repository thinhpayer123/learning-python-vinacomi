define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Gonrin = require("gonrin");
    var template = require("text!app/view/plan_fuel_item_category/tpl/items.html"),
        itemSchema = require("json!schema/ItemSchema.json");
    return Gonrin.ItemView.extend({
      bindings: "item-bind",
      template: template,
      tagName: "tr",
      modelSchema: itemSchema,
    //   modelClass: Model,
      urlPrefix: "/api/v1/",
      // collectionName: "norm_detail",
      collectionName: "items",   
    //   foreignRemoteField: "id",
    //   foreignField: "item_id",
  
      uiControl: {
        fields: [
          {
            field: "item_no",
            uicontrol: "typeahead",
            source: function(query, process) {
                          var url = gonrinApp().serviceURL + '/api/v1/item';
                          $.ajax({
                              url: url,
                              dataType: "json",
                              success: function (data) {
                                  return process(data.objects);
                              },
                              error: function (XMLHttpRequest, textStatus, errorThrown) {
                                  return process([]);
                              }
                          });
                      },
                      displayText: function (item) {
                          return typeof item !== 'undefined' && typeof item.item_no != 'undefined' ? item.item_no : item;
                      },
                      afterSelect: function (item) {
                          var self = this;
                          self.onItemChange(item);
                      }
                  },
                  {
            field: "item_name",
            uicontrol: "typeahead",
            source: function(query, process) {
                          var url = gonrinApp().serviceURL + '/api/v1/item';
                          $.ajax({
                              url: url,
                              dataType: "json",
                              success: function (data) {
                                  return process(data.objects);
                              },
                              error: function (XMLHttpRequest, textStatus, errorThrown) {
                                  return process([]);
                              }
                          });
                      },
                      displayText: function (item) {
                          return typeof item !== 'undefined' && typeof item.item_name != 'undefined' ? item.item_name : item;
                      },
                      afterSelect: function (item) {
                          var self = this;
                          self.onItemChange(item);
                      }
          },
        ]
      },
  
  
  
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
  
      onItemChange: function(item){
          var self = this;
          self.model.set("id", item.id);
          self.model.set("item_no", item.item_no);
          self.model.set("item_name", item.item_name);
  
              
          self.model.set("unit_id", item.unit_id);
          self.model.set("unit_no", item.unit_no);
          self.model.set("unit_name", item.unit_name);
      },
  
    });
  
  });
  