# INTERNO
from django.urls import path
from django.conf.urls import include, url
from django.conf import settings
from django.contrib.auth.decorators import login_required
from sclub.appsclub.views import principal, galeria, pedidos_sc,registrarse, administrador
from .import views

urlpatterns = [
	path('',views.login_ini, name='login_ini'),
	path('log_out/',views.log_out, name="log_out"),
	path('principal/',views.principal, name="principal"),
	path('galeria/',views.galeria, name="galeria"),
	path('pedidos_sc/<int:pr>',views.pedidos_sc, name="pedidos_sc"),
	path('registrarse/<int:pr>',views.registrarse, name="registrarse"),
	path('administrador/',views.administrador, name="administrador"),
]

