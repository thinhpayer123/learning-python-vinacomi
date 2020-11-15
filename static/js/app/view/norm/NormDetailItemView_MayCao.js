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
