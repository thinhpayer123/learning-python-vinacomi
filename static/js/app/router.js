define(function (require) {

    "use strict";
    
    var $           = require('jquery'),
        Gonrin    	= require('gonrin');
    
    var routedata = require('app/bases/nav/route');
    var LoginView = require('app/bases/views/LoginView');
    
    return Gonrin.Router.extend({
        routes: {
        	"index" : "index",
            "login":"login",
            "logout": "logout",
//            "forgot":"forgotPassword",
//            "dangky":"dangky",
            "error":"error_page",
            "*path":  "defaultRoute"
        },
        defaultRoute:function(){
            console.log("defaultRoute");
        	//this.navigate("index",true);
        },
        index:function(){
        },
      
        login: function () {
            console.log("Chay login function tai router.js");
            var loginview = new LoginView({ el: $('#body-container') });
            loginview.render();
        },
        logout: function () {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + '/user/logout',
                dataType: "json",
                success: function (data) {
                    self.navigate("login");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    self.getApp().notify(self.getApp().translate("LOGOUT_ERROR"));
                }
            });
        },
        error_page: function(){
        	var app = this.getApp();
        	if(app.$content){
        		app.$content.html("Error Page");
        	}
        	return;
        },
        registerAppRoute: function(){
            var self = this;
            $.each(routedata, function(idx, entry){
                var entry_path = _.result(entry,'route');
                self.route(entry_path, entry.collectionName, function(){
                    require([ entry['$ref'] ], function ( View) {
                        var view = new View({el: self.getApp().$content, viewData:entry.viewData});
                        view.render();
                    });
                });
            });
        },
    });

});