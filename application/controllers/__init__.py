# Register Blueprints/Views.
from gatco.response import text, json
from application.extensions import jinja

def init_views(app):
    import application.controllers.user


    import application.controllers.role
    import application.controllers.normdetail
    import application.controllers.norm
    import application.controllers.itemcategory
    import application.controllers.unit
    import application.controllers.item
    import application.controllers.itemcategoryrelation
    import application.controllers.norm_template
    import application.controllers.norm_document
    import application.controllers.export_excel
    import application.controllers.plan_fuel_item_category
    import application.controllers.price_list
    import application.controllers.item_price
    import application.controllers.department
    import application.controllers.plan_fuel_item
    import application.controllers.plan
    import application.controllers.brazier

    import application.controllers.plan_item
    import application.controllers.plan_salary
    import application.controllers.plan_other_cost
    import application.controllers.plan_product
    import application.controllers.salary_item

    import application.controllers.gaio
    import application.controllers.gaio_detail
    
    
    @app.route('/')
    def index(request):
        #return text("Index")
        return jinja.render('index.html', request)

    
    