define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    var schema 				= require('json!schema/NormSchema.json');
    
    var template 			= require('text!app/view/item_department/tpl/model.html');

    var cat_tpl = `
        <tbody data-body-type="category" cat-id="{{id}}" >
            <tr data-row-type="category" cat-id="{{id}}">
              <td colspan="8"><b>{{category_name}}</b></td>
            </tr>
        </tbody>
    `;
    var select_cat_tpl = '<option value="{{id}}">{{category_name}}</option>';
    var select_item_tpl = '<option value="{{item_id}}">{{item_no}} - {{item_name}}</option>';




    var norm_detail_map = {
    	"VTMAYCAO": {
    		"header_template": require('text!./detailviews/detail_header_VTMAYCAO.html'),
    		"ItemView": require('./detailviews/NormDetailItemView_VTMAYCAO')
    	},
        "VTBANGTAI": {
            "header_template": require('text!./detailviews/detail_header_VTMAYCAO.html'),
            "ItemView": require('./detailviews/NormDetailItemView_VTMAYCAO')
        }
    	
    }



    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "norm",

    	uiControl: {
            fields: [
				{
					field: "from_time",
					uicontrol: "datetimepicker",
					parseInputDate: function (val) {
						return moment.unix(val)
					},
					parseOutputDate: function (date) {
						return date.startOf('day').unix();
					}
				},
            ]
        },
        tools : null,

        saveModel: function(){
        	var self = this;
    		
            self.model.save(null,{
                success: function (model, respose, options) {
                    self.getApp().notify("Lưu thông tin thành công");
                    var norm_template_no = self.getApp().getRouter().getParam("norm_template_no");
                    self.getApp().getRouter().navigate(self.collectionName + "/collection?norm_template_no=" + norm_template_no);
                    
                },
                error: function (model, xhr, options) {
                    self.getApp().notify('Lưu thông tin không thành công!');
                   
                }
            });
        },


    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
            var norm_template_no = this.getApp().getRouter().getParam("norm_template_no")
            var url = self.getApp().serviceURL + '/api/v1/get_norm';
            if(id){
                url = url + '/' + id;
            }else{
                url = url + '/?norm_template_no=' + norm_template_no;
            }
    		$.ajax({
				url: url,
				dataType: "json",
				success: function (data) {
					
					self.model.set(data);
					var template_no = self.model.get("norm_template_no");
		    		var norm_detail_map_obj = norm_detail_map[template_no];
		    		if(norm_detail_map_obj){
                        var norm_detail_header_template = norm_detail_map_obj.header_template;
		    			// self.$el.html(norm_template.template);
                        self.$el.find("#norm_data").find("thead").html(norm_detail_header_template)
    
						
					}
                    self.renderCategorieSelectBox(data.categories);
                    self.renderCategories(data.categories);
                    self.renderDetails(data.norm_details);
                    self.registerEvents();
                    self.applyBindings();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("Eror get norm");
					
				}
			});
    		
    	},
    	registerEvents: function(){
    		var self = this;
    		self.$el.find("#add_item").bind("click", function(){
    			var cat_id = self.$el.find("#select_cat").val();
    			var item_id = self.$el.find("#select_item").val();
    			console.log("add ietm click", cat_id, item_id);
    			// var item
    			for (var i = 0; i < self.model.get("categories").length; i++){
					if (cat_id == self.model.get("categories")[i].id){
						var items = self.model.get("categories")[i].items;
						for (var j = 0; j < items.length; j++){
							if (item_id == items[j].item_id){
								var obj = $.parseJSON(JSON.stringify(items[j]));
								obj["category_id"] = cat_id;
								// obj["category_no"] = self.model.get("categories")[i].category_no || "";
								// obj["category_name"] = self.model.get("categories")[i].category_name;
								self.addNormItem(obj);
							}
						}
						break;
					}
				}
    		});


            self.$el.find("#remove_item").bind("click", function(){
                // self.getApp().onDetailRemove("category_no");
            });

                  

            // self.$el.find("#remove_item").bind("click", function){
            //     // var self = this; 
            //     return self.getApp().getRouter().getParam("category_no") !== null;

            // }

    		self.$el.find("#btn-save").unbind("click").bind("click", function(){
    			self.saveModel();
    		});
            self.$el.find("#btn-back").unbind("click").bind("click", function(){
                Backbone.history.history.back();
            });

            self.$el.find("#btn-export-excel").unbind("click").bind("click", function(){
                var id = self.model.get("id");
                if (id){
                    var url = self.getApp().serviceURL + '/api/v1/export/norm/' + id;
                    window.open(url, "_blank");
                }else{
                    self.getApp().notify('Xin mời lưu Định mức!');
                }
                
            });
            
    	},
    	getDefaultData: function(){
    		var self = this;
    		var fields = self.model.get("norm_fields");
    		if(!!fields){
    			var obj = {};
    			$.each(fields, function(idx, field){
    				obj[field.name] = 0;
    			});
    			return obj;
    		}
    		return {}
    	},


    	addNormItem: function(item){
    		var self = this;
    		item["id"] = gonrin.uuid();
    		item["note"] = null;
    		item["data"] = self.getDefaultData();
    		self.$el.find("#add_item_error_message").hide();
    		//tim trong norm detail da co chua?
    		var found = false;
    		console.log("addNormItem", self.model.get("norm_details"), item);
    		for (var i = 0; i < self.model.get("norm_details").length; i++){
    			if((item.item_id === self.model.get("norm_details")[i].item_id) && 
    				(item.category_id === self.model.get("norm_details")[i].category_id)){
    				found = true;
    				break;
    			}
    		}
    		if(!found){
    			self.renderDetails([item]);
    		}else{
    			self.$el.find("#add_item_error_message").show();
    			console.log("addNormItem da co vat tu nay", item);
    		}
    		

    	},



        // removeItem: function(){
        //     var self = this; 
        //     return self.getApp().getRouter().getParam("category_no") !== null;

        // },


    	renderCategorieSelectBox: function(cats){
    		var self = this;
    		// self.find("#select_cat").empty();
    		$.each(cats, function(idx, cat){
    			var html = gonrin.template(select_cat_tpl)(cat);
          		self.$el.find("#select_cat").append(html);
    		});

    		self.renderItemSelectBox();

    		self.$el.find("#select_cat").on("change", function(evt){
    			self.renderItemSelectBox();
    		});
    	},
    	renderItemSelectBox: function(){
    		var self = this;
    		self.$el.find("#select_item").empty();

    		var cat_id = self.$el.find("#select_cat").val();

    		for (var i = 0; i < self.model.get("categories").length; i++){
				if (cat_id == self.model.get("categories")[i].id){
					var items = self.model.get("categories")[i].items;
					
					$.each(items, function(idx, item){
		    			var html = gonrin.template(select_item_tpl)(item);
		          		self.$el.find("#select_item").append(html);
		    		});
					break;
				}
			}

    		
    	},
    	renderCategories: function(cats){
    		var self = this;
    		
    		$.each(cats, function(idx, cat){
    			var html = gonrin.template(cat_tpl)(cat);
          		self.$el.find("#norm_data").append(html);
    		});
    		
    		
    	},
    	renderDetails: function(items){
    		var self = this; 
    		
    		var template_no = self.model.get("norm_template_no");
            var norm_detail_map_obj = norm_detail_map[template_no];
    		if(norm_detail_map_obj){
    			var ItemView = norm_detail_map_obj["ItemView"];
    			$.each(items, function(idx, item){
	    			// var html = '<tr><td>' + item.item_name + '</td></tr>';
	    			var itemView = new ItemView();

	    			itemView.model.set(item);
	    			itemView.render();
	    			itemView.model.on("change", function(data){
	    				self.onDetailChange(data.toJSON());
	    			});

	    			self.onDetailChange(item);

	    			itemView.model.on("remove", function(evt){
	    				console.log("itemView remove",evt);
	    				self.onDetailRemove(evt);
	    			});

	    			var cat_id = item.category_id;
	    			var cat_els = self.$el.find('tbody[data-body-type="category"]');
	    			
	    			for (var i=0; i < cat_els.length; i++){
	    				var $cat_el = $(cat_els[i])
	    				if ($cat_el.attr("cat-id") == cat_id){
	    					$cat_el.append(itemView.$el);

	    				}
	    			}
	    	

	    		}); 
    		}else{
    			console.log("Khong tim thay itemView", template_no);
    		}
    		
    	},
    	onDetailChange: function(item){
    		var self = this;
    		var found = false;
    		for(var i = 0; i < self.model.get("norm_details").length; i++){
    			if (self.model.get("norm_details")[i].id == item.id){
    				self.model.get("norm_details")[i].note = item.note;
    				self.model.get("norm_details")[i].data = item.data;
    				found = true;
    				break;
    			}
    		}
    		if(!found){
    			self.model.get("norm_details").push(item);
    		}
    	},
    	onDetailRemove: function(item){
    		var self = this;
    		for(var i = 0; i < self.model.get("norm_details").length; i++){
    			if (self.model.get("norm_details")[i].id == item.id){
    				self.model.get("norm_details").splice(i, 1);
    				break;
    			}
    		}
    		
    	}
    });

});