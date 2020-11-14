define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var template = require("text!app/view/norm_template/tpl/norm.html"),
      NormItemSchema = require("json!schema/NormItemSchema.json");
// class NormItem(CommonModel):
//     __tablename__ = 'norm_item'
//     norm_item_exid = db.Column(String(100), index=True) 
//     norm_item_no = db.Column(String(40), index=True, nullable=False)
//     norm_item_name = db.Column(String(150), nullable=False)
//     norm_item_ascii_name = db.Column(String(150))
//     brief_desc = db.Column(Text())
//     description = db.Column(Text())
  
  var Model = Gonrin.Model.extend({
    defaults: Gonrin.getDefaultModel(NormItemSchema),

    computeds: {
      DinhMuscChiTiet: {
        deps: ["norm_item_no", "norm_item_name"],
        get: function(norm_item_no, norm_item_name){
          return {
            // "norm_detail": norm_detail, 

    // machine_name = db.Column(String(150), nullable=True)

    // note = db.Column(Text()) -->
            "norm_item_no": norm_item_no, 
            "norm_item_name": norm_item_name, 

          };
        }, 
        set: function(obj){
          // return { norm_detail: obj.norm_detail, norm_no: obj.norm_no, type: obj.type, 
          //       item_name: obj.item_name, unit_name: obj.unit_name };
        }
      },
      // urlRoot: "/api/v1/norm_detail"
      urlRoot: "/api/v1/norm_item"

    }, 
    
  });

  return Gonrin.ItemView.extend({
    bindings: "dinhmuc-bind",
    template: template,
    tagName: "tr",
    modelSchema: NormItemSchema,
    modelClass: Model,
    urlPrefix: "/api/v1/",
    collectionName: "norm_items",   
    foreignRemoteField: "id",
    foreignField: "norm_item_id",

    uiControl: {
      fields: [
        {
          field: "norm_item_no",
          uicontrol: "typeahead",
          source: function(query, process) {
                        var url = gonrinApp().serviceURL + '/api/v1/norm_items';
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
          field: "norm_item_name",
          uicontrol: "typeahead",
          source: function(query, process) {
                        var url = gonrinApp().serviceURL + '/api/v1/norm_items';
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


                    // {"norm_item_no":""},
                    // {"norm_item_name":""},
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
        self.model.set("norm_item_no", item.id);
        self.model.set("norm_item_name", item.item_no);

    },

  });

});
