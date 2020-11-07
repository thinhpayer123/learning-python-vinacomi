# Register Blueprints/Views.
from gatco.response import text, json
from application.extensions import jinja

def init_views(app):
    import application.controllers.user

    import application.controllers.user_wallet

    import application.controllers.role


 
    import application.controllers.normdetail
    import application.controllers.norm
    import application.controllers.itemcategory
    import application.controllers.normdetailquantity
    import application.controllers.unit
    import application.controllers.item
    import application.controllers.itemcategoryrelation
    import application.controllers.norm_template
    import application.controllers.item_class
    import application.controllers.norm_item
    import application.controllers.norm_document



    # import application.controllers.khachhang
    # import application.controllers.khachhang
    # import application.controllers.hanghoa
    # import application.controllers.hoadon
    # import application.controllers.sinhvien
    
    
    @app.route('/')
    def index(request):
        #return text("Index")
        return jinja.render('index.html', request)

    
    