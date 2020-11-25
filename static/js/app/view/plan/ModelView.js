define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var schema = require('json!schema/PlanSchema.json');

	var template = require('text!app/view/plan/tpl/model.html');

	var PlanFuelItemView = require('./PlanFuelItemView')
	var OtherCostView = require('./OtherCostView')
	var SalaryView = require('./SalaryView')

	var bazier_plan_fuel_item_header_html = '<td colspan="3" style="color:red"style="width:300px" data-brazier-id="{{brazier_id}}">{{brazier_name}}</td>';
	var bazier_plan_fuel_item_header_column_html = `<td style="width:300px">Định mức</td>
	<td rowspan="2"style="width:300px">Hệ số thiết bị</td>
	<td rowspan="2"style="width:300px">Số lượng </td>`;

	var bazier_plan_fuel_item_header_norm_html = '<td>1</td>';
	
	


	var cat_tpl = `
		<tbody data-body-type="category" cat-id="{{id}}" >
			<tr data-row-type="category">
				<td colspan="{{colspan}}"><b>{{category_group_name}}</b></td>
			</tr>
            <tr data-row-type="category" cat-id="{{id}}">
              <td colspan="{{colspan}}"><b>{{category_name}}</b></td>
            </tr>
        </tbody>
	`;
	var cat_tpl_salary = `
		<tbody data-body-type="salary_category" cat-id="{{id}}" >
			<tr data-row-type="salary_category">
				<td"><b>{{category_group_name}}</b></td>
			</tr>
			<tr data-row-type="salary_category" cat-id="{{id}}">
		  		<td><b>{{category_name}}</b></td>
		</tr>
	</tbody>
	`; 

	var cat_tpl_other_cost = `
		<tbody data-body-type="other_cost_category" cat-id="{{id}}" >
            <tr data-row-type="other_cost_category" cat-id="{{id}}">
              <td><b>{{category_name}}</b></td>
            </tr>
        </tbody>
	`;
	
return Gonrin.ModelView.extend({
		template: null,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "plan",

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
		tools: null,

		saveModel: function () {
			var self = this;

			self.model.save(null, {
				success: function (model, respose, options) {
					self.getApp().notify("Lưu thông tin thành công");
					self.getApp().getRouter().navigate(self.collectionName + "/collection");

				},
				error: function (model, xhr, options) {
					self.getApp().notify('Lưu thông tin không thành công!');

				}
			});
		},


		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var url = self.getApp().serviceURL + '/api/v1/get_plan';

			if (id) {
				url = url + '/' + id;
			}

			$.ajax({
				url: url,
				dataType: "json",
				success: function (data) {

					self.model.set(data);

					var tpl = gonrin.template(template)({
						baziers_colspan: data.braziers.length * 3
					});
					self.$el.html(tpl);

					self.$el.find("#bazier_plan_fuel_item_header").empty();
					self.$el.find("#bazier_plan_fuel_item_header_column").empty();
					self.$el.find("#bazier_plan_fuel_item_header_norm").empty();
					for(var i =0; i < data.braziers.length; i++){
						var html = gonrin.template(bazier_plan_fuel_item_header_html)(data.braziers[i]);
						self.$el.find("#bazier_plan_fuel_item_header").append(html);
						var column_html = gonrin.template(bazier_plan_fuel_item_header_column_html)({});
						self.$el.find("#bazier_plan_fuel_item_header_column").append(column_html);
						var norm_html = gonrin.template(bazier_plan_fuel_item_header_norm_html)({});
						self.$el.find("#bazier_plan_fuel_item_header_norm").append(norm_html);

					}

					
					self.renderFuelItemCategories(data.plan_items_categories, data.braziers);
					self.renderFuelItems(data.fuel_items, data.braziers);
					self.registerEvents();
					self.applyBindings();
					self.renderOtherCostCategories(data.plan_items_categories);
					self.renderOtherCostItems(data.other_costs);
					self.renderSalaryCategories(data.plan_items_categories);
					self.renderSalaryItems(data.salaries);
					
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("Eror get plan");

				}
			});

		},
		registerEvents: function () {
			var self = this;
			// self.$el.find("#add_item").bind("click", function () {
			// 	var cat_id = self.$el.find("#select_cat").val();
			// 	var item_id = self.$el.find("#select_item").val();
			// 	// var item
			// 	for (var i = 0; i < self.model.get("categories").length; i++) {
			// 		if (cat_id == self.model.get("categories")[i].id) {
			// 			var items = self.model.get("categories")[i].items;
			// 			for (var j = 0; j < items.length; j++) {
			// 				if (item_id == items[j].item_id) {
			// 					var obj = $.parseJSON(JSON.stringify(items[j]));
			// 					obj["category_id"] = cat_id;
			// 					self.addplanItem(obj);
			// 				}
			// 			}
			// 			break;
			// 		}
			// 	}
			// });

			self.$el.find("#btn-save").unbind("click").bind("click", function () {
				self.saveModel();
			});
			self.$el.find("#btn-back").unbind("click").bind("click", function () {
				Backbone.history.history.back();
			});

			self.$el.find("#btn-export-excel").unbind("click").bind("click", function () {
				var id = self.model.get("id");
				if (id) {
					var url = self.getApp().serviceURL + '/api/v1/export/plan/' + id;
					window.open(url, "_blank");
				} else {
					self.getApp().notify('Xin mời lưu Kế hoạch!');
				}

			});

		},

		renderFuelItemCategories: function(cats, braziers){
			var self = this;
			var col = braziers.length * 3 + 6;
    		
    		$.each(cats, function(idx, cat){
				if (cat.type == "fuel_item"){
					cat.colspan = col;
					var html = gonrin.template(cat_tpl)(cat);
					self.$el.find("#plan_fuel_item").append(html);
				}
				
    		});
		},
		renderFuelItems: function(items, braziers){
			var self = this; 
    		
			$.each(items, function(idx, item){
				// var html = '<tr><td>' + item.item_name + '</td></tr>';
				var itemView = new PlanFuelItemView({
					viewData: {
						"braziers": braziers
					}
				});

				itemView.model.set(item);
				itemView.render();
				itemView.model.on("change", function(data){
					console.log(data);
					self.onFuelItemsChange(data.toJSON());
				});

				// self.onFuelItemsChange(item);

				itemView.model.on("remove", function(evt){
					console.log("itemView remove",evt);
					self.onFuelItemsRemove(evt);
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
    		
		},
		onFuelItemsChange: function(item){
    		var self = this;
			var found = false;
    		for(var i = 0; i < self.model.get("fuel_items").length; i++){
    			if (self.model.get("fuel_items")[i].id == item.id){
					self.model.get("fuel_items")[i].demand_quantity = item.demand_quantity;
					self.model.get("fuel_items")[i].approved_quantity = item.approved_quantity;
					self.model.get("fuel_items")[i].note = item.note;
					$.each(item, function(key, val){
						if (key.startsWith("data_")){
							console.log(key, val);
							if ((val !== null) && (val !== "")){
								self.model.get("fuel_items")[i][key] = parseFloat(val);
							}
						}
					})
					found = true;
    				break;
    			}
    		}
    		if(!found){
    			self.model.get("fuel_items").push(item);
			}
			
		},
		onFuelItemsRemove: function(item){
    		var self = this;
    		for(var i = 0; i < self.model.get("fuel_items").length; i++){
    			if (self.model.get("fuel_items")[i].id == item.id){
    				self.model.get("fuel_items").splice(i, 1);
    				break;
    			}
    		}
    		
		},
		

		// Salary
		// renderSalaryCategories: function(cats){
		// 	var self = this;
    	// 	var insertcat = cats.PUSH({
		// 		// [cats.id] : salary_category,
		// 		cats.id = salaries_category,

		// 	});
    	// 	$.each(insertcat, function(idx, cat){
		// 		if (cat.type == "salary"){

		// 			var html = gonrin.template(cat_tpl_salary)(cat);
		// 			self.$el.find("#salary").append(html);
					
		// 		}				
    	// 	});
		// },
		// renderSalaryItems: function(items){
		// 	var self = this; 
    		
		// 	$.each(items, function(idx, item){
		// 		var itemView = new SalaryView();
		// 		itemView.model.set(item);
		// 		itemView.render();
		// 		// console.log("============")


		// 		console.log("salary", itemView.$el)

		// 		itemView.model.on("change", function(data){
		// 			console.log(data);
		// 			self.onSalaryItemsChange(data.toJSON());
		// 		});
		// 		// self.onFuelItemsChange(item);
		// 		itemView.model.on("remove", function(evt){
		// 			console.log("itemView remove",evt);
		// 			self.onSalaryItemsRemove(evt);
		// 		});

				
		// 		var cat_id = item.category_id;

		// 		if(!!cat_id){
		// 			var cat_els = self.$el.find('tbody[data-body-type="salary_category"]');
				
		// 			for (var i=0; i < cat_els.length; i++){
		// 				var $cat_el = $(cat_els[i])
		// 				if ($cat_el.attr("cat-id") == cat_id){
		// 					$cat_el.append(itemView.$el);
		// 				}
		// 			}
		// 		}else{
		// 			var cat_els = self.$el.find('tbody[data-body-type="salary_category"]');
				
		// 			for (var i=0; i < cat_els.length; i++){
		// 				var $cat_el = $(cat_els[i])
		// 				if ($cat_el.attr("cat-id") == "salarys_category"){
		// 					$cat_el.append(itemView.$el);
		// 				}
		// 			}
		// 		}
				
		// 	}); 	
		// },
		renderSalaryCategories: function(cats){
			var self = this;
    		
    		$.each(cats, function(idx, cat){
				if (cat.type == "salary"){

					var html = gonrin.template(cat_tpl_salary)(cat);
					self.$el.find("#salary").append(html);
					
				}				
    		});
		},
		renderSalaryItems: function(items){
			var self = this; 
    		
			$.each(items, function(idx, item){
				var itemView = new SalaryView();
				itemView.model.set(item);
				itemView.render();


				// console.log("============")
				// console.log("OtherCostView", itemView.$el)

				itemView.model.on("change", function(data){
					console.log(data);
					self.onSalaryItemsChange(data.toJSON());
				});
				// self.onFuelItemsChange(item);
				itemView.model.on("remove", function(evt){
					console.log("itemView remove",evt);
					self.onSalaryItemsRemove(evt);
				});


				var cat_id = item.category_id;
				var cat_els = self.$el.find('tbody[data-body-type="salary_category"]');
				
				for (var i=0; i < cat_els.length; i++){
					var $cat_el = $(cat_els[i])
					if ($cat_el.attr("cat-id") == cat_id){
						$cat_el.append(itemView.$el);
					}
				}
			}); 	
		},
		onSalaryItemsChange: function(item){
    		var self = this;
			var found = false;
    		for(var i = 0; i < self.model.get("salaries").length; i++){
    			if (self.model.get("salaries")[i].id == item.id){
					self.model.get("salaries")[i].quantity = item.quantity;
					self.model.get("salaries")[i].list_salary_price = item.list_salary_price;
					self.model.get("salaries")[i].salary_amount = item.salary_amount;
					self.model.get("salaries")[i].list_insurance_price = item.list_insurance_price;
					self.model.get("salaries")[i].insurance_amount = item.insurance_amount;
					self.model.get("salaries")[i].factor = item.factor;
					self.model.get("salaries")[i].average_salary = item.average_salary;
					self.model.get("salaries")[i].note = item.note;
					$.each(item, function(key, val){
						if (key.startsWith("data_")){
							console.log(key, val);
							if ((val !== null) && (val !== "")){
								self.model.get("salaries")[i][key] = parseFloat(val);
							}
						}
					})
					found = true;
    				break;
    			}
    		}
    		if(!found){
    			self.model.get("salaries").push(item);
			}			
		},
		onSalaryItemsRemove: function(item){
    		var self = this;
    		for(var i = 0; i < self.model.get("salaries").length; i++){
    			if (self.model.get("salaries")[i].id == item.id){
    				self.model.get("salaries").splice(i, 1);
    				break;
    			}
    		}
    		
		},		

		// End of salary


		// Other Cost
		renderOtherCostCategories: function(cats){
			var self = this;
    		
    		$.each(cats, function(idx, cat){
				if (cat.type == "other_cost"){

					var html = gonrin.template(cat_tpl_other_cost)(cat);
					self.$el.find("#othercost").append(html);
					
				}				
    		});
		},
		renderOtherCostItems: function(items){
			var self = this; 
    		
			$.each(items, function(idx, item){
				var itemView = new OtherCostView();
				itemView.model.set(item);
				itemView.render();


				// console.log("============")
				// console.log("OtherCostView", itemView.$el)

				itemView.model.on("change", function(data){
					console.log(data);
					self.onOtherCostItemsChange(data.toJSON());
				});
				// self.onFuelItemsChange(item);
				itemView.model.on("remove", function(evt){
					console.log("itemView remove",evt);
					self.onOtherCostItemsRemove(evt);
				});


				var cat_id = item.category_id;
				var cat_els = self.$el.find('tbody[data-body-type="other_cost_category"]');
				
				for (var i=0; i < cat_els.length; i++){
					var $cat_el = $(cat_els[i])
					if ($cat_el.attr("cat-id") == cat_id){
						$cat_el.append(itemView.$el);
					}
				}
			}); 	
		},
		onOtherCostItemsChange: function(item){
    		var self = this;
			var found = false;
    		for(var i = 0; i < self.model.get("other_costs").length; i++){
    			if (self.model.get("other_costs")[i].id == item.id){
					self.model.get("other_costs")[i].quantity = item.quantity;
					self.model.get("other_costs")[i].list_price = item.list_price;
					self.model.get("other_costs")[i].working_days = item.working_days;
					self.model.get("other_costs")[i].total_amount = item.total_amount;
					
					self.model.get("other_costs")[i].note = item.note;
					
					found = true;
    				break;
    			}
    		}
    		if(!found){
    			self.model.get("other_costs").push(item);
			}			
		},
		onOtherCostItemsRemove: function(item){
    		var self = this;
    		for(var i = 0; i < self.model.get("other_costs").length; i++){
    			if (self.model.get("other_costs")[i].id == item.id){
    				self.model.get("other_costs").splice(i, 1);
    				break;
    			}
    		}
    		
		},		
				
		// End Other cost
		
	});

});