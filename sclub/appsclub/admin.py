from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Pedidos, Envolturas,Promos

admin.site.site_header = "Administración de Tablas del Sistema"
admin.site.site_title = "Sushi Club"
admin.site.index_title = "Bienvenidos al portal de Administración"


class AdminPedidos(admin.ModelAdmin):
	list_display = ["id","celu","nombre","fecha","direccion"]
	search_fields = ["celu","nombre","fecha","direccion"]

class AdminPromos(admin.ModelAdmin):
	list_display = ["cod","piezas","descrip","valor"]
	search_fields = ['descrip']

class AdminEnvolturas(admin.ModelAdmin):
	list_display = ["cod","roll","envolt","valor"]
	search_fields = ['envolt']


admin.site.register(Pedidos,AdminPedidos)
admin.site.register(Promos,AdminPromos)
admin.site.register(Envolturas,AdminEnvolturas)