# Register Blueprints/Views.
from gatco.response import text, json
from application.extensions import jinja

def init_views(app):
    import application.controllers.user
    # import application.controllers.quocgia
    # import application.controllers.tinhthanh

    import application.controllers.transaction
    import application.controllers.userWallet
    import application.controllers.membercard
    import application.controllers.store
    import application.controllers.brand
    import application.controllers.company
    import application.controllers.sinhvien
    # import application.controllers.khachhang
    # import application.controllers.khachhang
    # import application.controllers.hanghoa
    # import application.controllers.hoadon
    # import application.controllers.sinhvien
    
    
    @app.route('/')
    def index(request):
        #return text("Index")
        return jinja.render('index.html', request)

    
    