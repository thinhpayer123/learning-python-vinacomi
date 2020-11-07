define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin              = require('gonrin');
    
    var template            = require('text!app/view/norm_detail_quantity/tpl/collection.html'),
        schema              = require('json!schema/NormDetailQuantitySchema.json');

    return Gonrin.CollectionDialogView.extend({
        template : template,
        modelSchema : schema,
        urlPrefix: "/api/v1/",
        collectionName: "norm_detail_quantity",
        textField: "name",
        valueField: "id",
        tools : [
            {
                name: "defaultgr",
                type: "group",
                groupClass: "toolbar-group",
                buttons: [
                    {
                        name: "select",
                        type: "button",
                        buttonClass: "btn-success btn-sm",
                        label: "TRANSLATE:SELECT",
                        command: function(){
                            var self = this;
                            self.trigger("onSelected");
                            self.close();
                        }
                    },
                ]
            },
        ],
        uiControl:{
            fields: [
                 { 
                    field: "norm_no",label:"Mã Định Mức"
                 },
                 // { 
                 //    field: "quantity",label:"type"
                 // },
                 { 
                    field: "quantity",label:"Định Lượng"
                 },
                 { 
                    field: "previous_quantity",label:"Số Định Lượng"
                 },
                 { 
                    field: "norm_item_no",label:"Mã Định Mức Vật Tư"
                 },              
                 { 
                    field: "norm_item_name",label:"Tên Định Mức Vật Tư"
                 }
            ],
            onRowClick: function(event){
                this.uiControl.selectedItems = event.selectedItems;
                
            },
        },
        render:function(){
            var self= this;
            
            self.applyBindings();
            
            return this;
        },
        
    });

});



