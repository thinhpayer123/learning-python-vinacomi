define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!./tpl/dialog.html');
    
    return Gonrin.DialogView.extend({
        template: template,
        
        tools: [
            {
                name: "defaultgr",
                type: "group",
                groupClass: "toolbar-group",
                buttons: [{
                    name: "back",
                    type: "button",
                    buttonClass: "btn btn-secondary btn-sm",
                    label: "<span class='fa fa-times'></span> Đóng",
                    command: function () {
                        var self = this;
                        self.close();
                    }
                },
                ],
            }],
        render: function () {
            var self = this;
            
        },
        
    });
});