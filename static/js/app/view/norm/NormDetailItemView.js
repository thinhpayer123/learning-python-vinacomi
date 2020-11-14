define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var template = require("text!app/view/norm/tpl/norm_detail.html"),
      normSchema = require("json!schema/NormDetailSchema.json");
 
  
  var Model = Gonrin.Model.extend({
    defaults: Gonrin.getDefaultModel(normSchema),
    computeds: {
      data_dinhmuc_cu_1000T: {
       deps: ["data"],
       get: function( data ) {
         if (!!data){
           return data.dinhmuc_cu_1000T || 0;
         }
         return null;
       },
       set: function( val ) {
         if (!this.get("data")){
           this.set("data",{});
         }
         if(val != null){
           this.get("data").dinhmuc_cu_1000T = parseFloat(val);
         }else{
           this.get("data").dinhmuc_cu_1000T = 0;
         }
         this.trigger("change:data");
         // return val;
       }
     },
     data_dinhmuc_moi_1000T: {
       deps: ["data"],
       get: function( data ) {
         if (!!data){
           return data.dinhmuc_moi_1000T || 0;
         }
         return null;
       },
       set: function( val ) {
         if (!this.get("data")){
           this.set("data",{});
         }
         if(val != null){
           this.get("data").dinhmuc_moi_1000T = parseFloat(val);
         }else{
           this.get("data").dinhmuc_moi_1000T = 0;
         }
         this.trigger("change:data");
         // return val;
       }
     },
     data_dinhmuc_moi_100ML_S96: {
       deps: ["data"],
       get: function( data ) {
         if (!!data){
           return data.dinhmuc_moi_100ML_S96 || 0;
         }
         return null;
       },
       set: function( val ) {
         if (!this.get("data")){
           this.set("data",{});
         }
         if(val != null){
           this.get("data").dinhmuc_moi_100ML_S96 = parseFloat(val);
         }else{
           this.get("data").dinhmuc_moi_100ML_S96 = 0;
         }
         this.trigger("change:data");
         // return val;
       }
     },
    }, 
    urlRoot: "/api/v1/norm_detail"
    
  });

  return Gonrin.ItemView.extend({
    bindings: "norm-detail-bind",
    template: template,
    tagName: "tr",
    modelSchema: normSchema,
    modelClass: Model,
    urlPrefix: "/api/v1/",
    // collectionName: "norm_detail",
    collectionName: "norm_details",   
    foreignRemoteField: "id",
    foreignField: "norm_id",

    // uiControl: {
    //   fields: [
    //     {
    //       field: "item_no",
    //       uicontrol: "typeahead",
    //       source: function(query, process) {
    //                     var url = gonrinApp().serviceURL + '/api/v1/item';
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
    //       field: "item_name",
    //       uicontrol: "typeahead",
    //       source: function(query, process) {
    //                     var url = gonrinApp().serviceURL + '/api/v1/item';
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

    // onItemChange: function(item){
    //     var self = this;
    //     self.model.set("item_id", item.id);
    //     self.model.set("item_no", item.item_no);
    //     self.model.set("item_name", item.item_name);

            
    //     self.model.set("unit_id", item.unit_id);
    //     self.model.set("unit_no", item.unit_no);
    //     self.model.set("unit_name", item.unit_name);
    // },

  });

});
