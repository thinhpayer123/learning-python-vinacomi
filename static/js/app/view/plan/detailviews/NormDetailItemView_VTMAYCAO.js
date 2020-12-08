define(function (require) {
  "use strict";
  var $ = require("jquery");
  var _ = require("underscore");
  var Gonrin = require("gonrin");
  var normSchema = require("json!schema/NormDetailSchema.json");


  var NormDetailItemView = require("../NormDetailItemView");
  var template = require("text!./plan_VTMAYCAO.html");
        
 
  var Model = Gonrin.Model.extend({
    defaults: Gonrin.getDefaultModel(normSchema),
    computeds: {
      data_dinhmuc_cu_1000TT: {
       deps: ["data"],
       get: function( data ) {
         if (!!data){
           return data.dinhmuc_cu_1000TT || 0;
         }
         return null;
       },
       set: function( val ) {
         if (!this.get("data")){
           this.set("data",{});
         }
         if(val != null){
           this.get("data").dinhmuc_cu_1000TT = parseFloat(val);
         }else{
           this.get("data").dinhmuc_cu_1000TT = 0;
         }
         this.trigger("change:data");
         // return val;
       }
     },
     data_dinhmuc_1000TT: {
       deps: ["data"],
       get: function( data ) {
         if (!!data){
           return data.dinhmuc_1000TT || 0;
         }
         return null;
       },
       set: function( val ) {
         if (!this.get("data")){
           this.set("data",{});
         }
         if(val != null){
           this.get("data").dinhmuc_1000TT = parseFloat(val);
         }else{
           this.get("data").dinhmuc_1000TT = 0;
         }
         this.trigger("change:data");
         // return val;
       }
     },
     data_dinhmuc_100ML_S96: {
       deps: ["data"],
       get: function( data ) {
         if (!!data){
           return data.dinhmuc_100ML_S96 || 0;
         }
         return null;
       },
       set: function( val ) {
         if (!this.get("data")){
           this.set("data",{});
         }
         if(val != null){
           this.get("data").dinhmuc_100ML_S96 = parseFloat(val);
         }else{
           this.get("data").dinhmuc_100ML_S96 = 0;
         }
         this.trigger("change:data");
       }
     },
    }, 
    urlRoot: "/api/v1/norm_detail"
    
  });

  return NormDetailItemView.extend({
    template: template,
    modelClass: Model
  });

});
