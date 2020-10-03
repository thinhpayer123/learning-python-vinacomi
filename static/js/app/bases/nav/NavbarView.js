define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');

	var category_tpl = `<li class="c-sidebar-nav-item c-sidebar-nav-dropdown"><a
		class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="javascript:void(null);">
		{{icon}} {{text}}</a><ul class="c-sidebar-nav-dropdown-items"></ul></li>`;
	
	var view_tpl = `<li class="c-sidebar-nav-item"><a class="c-sidebar-nav-link" href="javascript:void(null);">{{icon}} {{text}}</a></li>`;

	var link_tpl = `<li class="c-sidebar-nav-item"><a class="c-sidebar-nav-link" href="{{href}}">{{icon}} {{text}}</a></li>`;


	var naventries = require('app/bases/nav/nav');
	
	return Gonrin.View.extend({
    	// checkUser: function(){
    	//     var isUser = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole('User'): false;
    	//     return isUser;
    	// },
    	// checkTuyendonvi:function(tuyendonvi){
    	// 	var currentUser = gonrinApp().currentUser;
    	// 	if (currentUser !==null && (currentUser.donvi.tuyendonvi === tuyendonvi || currentUser.hasRole('Admin'))){
    	// 		return true;
    	// 	}
    	// 	return false;
    	// },
    	// userHasRole: function(role){
    	//     var is = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole(role): false;
    	//     return is;
		// },
		

    	loadEntries: function($el, entries, is_root){
			var self = this;
			if(entries && (entries.length > 0)){
				_.each(entries, function(entry, index){
					var entry_type = _.result(entry, 'type');
					var entry_text = _.result(entry, 'text');
					var entry_href = _.result(entry, 'href');
					var entry_icon = _.result(entry, 'icon');
					var entry_entries = _.result(entry, 'entries');
					var _html = '';

					if(entry_type === "category"  && entry_text !== undefined){
						_html = gonrin.template(category_tpl)({
							"text": entry_text,
							"icon": entry_icon
						});
						
					}else if(entry_type === "view"  && entry_text !== undefined){
						_html = gonrin.template(view_tpl)({
							"text": entry_text,
							"icon": entry_icon
						});
					}else if(entry_type === "link"  && entry_text !== undefined){
						_html = gonrin.template(link_tpl)({
							"text": entry_text,
							"icon": entry_icon,
							"href": entry_href
						});
					}

					var $entry_el = $('<div/>').html(_html).contents();


					if(self.isEntryVisible(entry)){
						$el.append($entry_el);

						if(entry_type === "category"){	
							if ((entry_entries)&& (entry_entries.length > 0)) {
								var _nav_list = $entry_el.find(".c-sidebar-nav-dropdown-items");
								self.loadEntries(_nav_list, entry_entries, false);
							}
						}
						
						if(entry_type === "view"){
							var $a = $entry_el.find('a');
							
							if($a){
								$a.unbind("click").bind("click", function(e){
									e.preventDefault();
									var link = _.result(entry, 'href') || _.result(entry, 'route') ;
									self.getApp().getRouter().navigate(link, {trigger:true});
								});
							}
						}
					}
					
				});// end _.each
			};
			return this;
		},

		isEntryVisible : function(entry) {
			var self = this;
	        var visible = "visible";
	        return !entry.hasOwnProperty(visible) || (entry.hasOwnProperty(visible) && (_.isFunction(entry[visible]) ? entry[visible].call(self) : (entry[visible] === true)) );
			
	    },
		render: function(entries){
			var self = this;
			self.$el.empty();
			entries = entries || naventries;
			self.loadEntries(self.$el, entries, true);
			dispatchEvent(new Event('load'));
			return this;
		},
	    
	});

});