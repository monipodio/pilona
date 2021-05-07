from django.contrib import messages,auth
from django.contrib.auth.decorators import login_required, permission_required
from django.shortcuts import render,redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from datetime import datetime,timedelta,date
from django.db import connection
from django.db.models import Q

from sclub.appsclub.models import Param, Diario, Pedidos,Promos, Envolturas
from sclub.appsclub.models import Rellenos, Adicionales, Otrospermisos

import json
import requests
#from misitio.ai.forms import cambios

def login_ini(request):
    variable1 = 'Pantalla de Acceso al Sistema'
    error_log = 'ok'
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password') # valor del template
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request,user)
            request.session['username_x'] = username # inicializa variable gobal
            request.session['id_x'] = user.id   # inicializa variable gobal
            return HttpResponseRedirect("principal")
        error_log = "error"
    context = {"variable1":variable1,"error_log":error_log,}
    return render(request,'login_ini.html',context)


def log_out(request):
	logout(request)
	return redirect('login_ini')
	#return HttpResponse("Se ha abandonado la aplicación...")


def principal(request):
    #return HttpResponse(str(request.user.is_staff))
    variable1 = 'PAGINA PRINCIPAL'
    logo2 = "/static/img/Logo_sc.jpg"
    #logo = "/staticfiles/img/Logo_AsistenciaIntegral.jpg" # for PythonAnyWhere
    hrs =  Param.objects.filter(tipo="HORA",switch1=1,switch2=1).order_by('codigo')
    cta =  Param.objects.filter(tipo="CTA",switch1=1,switch2=1).order_by('codigo')
    obs = Param.objects.filter(tipo="OBS").order_by('codigo')
    prs =  Promos.objects.all().order_by('piezas')
    trabajo =  Param.objects.filter(tipo="TRA").order_by('codigo') #

    for traba in trabajo: 
        nosetrabaja = traba.switch1

    string_horas =""
    aDisponibles = []
    for j in hrs:
        aDisponibles.append(j.descrip) # llena arreglo con valor del campo
        string_horas = string_horas + j.descrip+","

    if string_horas == "":
        nosetrabaja = '0'

    string_horas = string_horas[:-2]  # quita los 2 últimos caracteres (lado derecho quita la coma y el pespacio)
    string_horas = string_horas + " hrs."  

    ctas = []
    for ct in cta:
        ctas.append(ct.descrip)

    context ={
        "string_horas":string_horas,
        "prs":prs,
    	"variable1":variable1,
    	"logo_corp_chico":logo2,
        "cta":cta, 
        "nosetrabaja":nosetrabaja,
        "obs":obs,
        }

    npromo = 1
    kontador = 0      
    kontador2 = 0
    kontador3 = 0

    if request.method == "POST":   # va a: CAMBIOS.HTML
        #inicializa variales
        cod1_x,descrip1_x,valor1_x,incluye1_x='','',0,''
        cod2_x,descrip2_x,valor2_x,incluye2_x='','',0,''
        cod3_x,descrip3_x,valor3_x,incluye3_x='','',0,''
        cod4_x,descrip4_x,valor4_x,incluye4_x='','',0,''
        envolt1,envolt2,envolt3,envolt4,envolt5,envolt6,envolt7 = "","","","","","",""
        envolt1_2,envolt2_2,envolt3_2,envolt4_2,envolt5_2,envolt6_2,envolt7_2 = "","","","","","",""
        envolt1_3,envolt2_3,envolt3_3,envolt4_3,envolt5_3,envolt6_3,envolt7_3 = "","","","","","",""
        caja1_seleccionada = request.POST.get('caja1-seleccionada')    # valor desde el template el identificatorio es el <name>
        caja2_seleccionada = request.POST.get('caja2-seleccionada')    # valor desde el template el identificatorio es el <name>
        caja3_seleccionada = request.POST.get('caja3-seleccionada')    # valor desde el template el identificatorio es el <name>
        caja4_seleccionada = request.POST.get('caja4-seleccionada')    # valor desde el template el identificatorio es el <name>
        #
        adicionales = Adicionales.objects.all().order_by('cod')
        z=1
        for adicio in adicionales:
            if z==1:
                descrip_adi1 = adicio.descrip
                valor_adi1 = adicio.valor
            if z==2:
                descrip_adi2 = adicio.descrip
                valor_adi2 = adicio.valor
            if z==3:
                descrip_adi3 = adicio.descrip
                valor_adi3 = adicio.valor
            z=z+1    

        # Llenando arreglos para subtotales       
        aSubtotal1_adic = []
        aSubtotal2_adic = []
        aSubtotal3_adic = [] 
        i = 1
        while i < 9:
            aSubtotal1_adic.append(valor_adi1 * i)
            aSubtotal2_adic.append(valor_adi2 * i)
            aSubtotal3_adic.append(valor_adi3 * i)
            i += 1

        # combo del cual seleccionar por que cambiar (todos los tipos de envolturas disponibles)
        para_envol = Envolturas.objects.filter(cod='EN').order_by('roll').only('envolt', 'roll','valor')

        relle1  =  Rellenos.objects.filter(cod=0,roll=0)
        relle2  =  Rellenos.objects.filter(cod=0,roll=0)
        relle3  =  Rellenos.objects.filter(cod=0,roll=0)
        relle4  =  Rellenos.objects.filter(cod=0,roll=0)
        relle5  =  Rellenos.objects.filter(cod=0,roll=0)
        relle6  =  Rellenos.objects.filter(cod=0,roll=0)
        relle7  =  Rellenos.objects.filter(cod=0,roll=0)

        relle1_2  =  Rellenos.objects.filter(cod=0,roll=0)
        relle2_2  =  Rellenos.objects.filter(cod=0,roll=0)
        relle3_2  =  Rellenos.objects.filter(cod=0,roll=0)
        relle4_2  =  Rellenos.objects.filter(cod=0,roll=0)
        relle5_2  =  Rellenos.objects.filter(cod=0,roll=0)
        relle6_2  =  Rellenos.objects.filter(cod=0,roll=0)
        relle7_2  =  Rellenos.objects.filter(cod=0,roll=0)

        relle1_3  =  Rellenos.objects.filter(cod=0,roll=0)
        relle2_3  =  Rellenos.objects.filter(cod=0,roll=0)
        relle3_3  =  Rellenos.objects.filter(cod=0,roll=0)
        relle4_3  =  Rellenos.objects.filter(cod=0,roll=0)
        relle5_3  =  Rellenos.objects.filter(cod=0,roll=0)
        relle6_3  =  Rellenos.objects.filter(cod=0,roll=0)
        relle7_3  =  Rellenos.objects.filter(cod=0,roll=0)

        # TODOS LOS RELLENOS DISPONIBLES PARA SELECCIONAR CAMBIAR
        caja4_seleccionada = ""        
        relle_tot = Rellenos.objects.filter(cod="RE")

        # PRMERA PROMO SELECCIONADA PRMERA PROMO SELECCIONADA PRMERA PROMO SELECCIONADA PRMERA PROMO SELECCIONADA
        if  caja1_seleccionada != "":
            pr1 = Promos.objects.filter(Q(descrip__icontains=caja1_seleccionada))
            for sal in pr1:
                cod1_x = sal.cod
                descrip1_x = sal.descrip
                valor1_x = sal.valor
                incluye1_x = sal.incluye

            #ENVOLTURAS - promo1    
            envolt1 = Envolturas.objects.filter(cod=cod1_x).order_by('roll')
            ene_rolls = envolt1.count()  # cuantas envolturas tiene 
            kontador = 1
            for itera_envolt in envolt1:
                if kontador == 1:
                   envolt1 = itera_envolt.envolt  
                if kontador == 2: 
                   envolt2 = itera_envolt.envolt 
                if kontador == 3: 
                   envolt3 = itera_envolt.envolt 
                if kontador == 4: 
                   envolt4 = itera_envolt.envolt
                if kontador == 5: 
                   envolt5 = itera_envolt.envolt 
                if kontador == 6: 
                   envolt6 = itera_envolt.envolt 
                if kontador == 7: 
                   envolt7 = itera_envolt.envolt 
                kontador = kontador + 1    

            #para mostrar rellenos disponibles - promo3 - columna 1
            if ene_rolls == 2:    
                relle1  =  Rellenos.objects.filter(cod=20,roll=1)
                relle2  =  Rellenos.objects.filter(cod=20,roll=2)
            
            if ene_rolls == 3:    
                relle1  =  Rellenos.objects.filter(cod=30,roll=1)
                relle2  =  Rellenos.objects.filter(cod=30,roll=2)
                relle3  =  Rellenos.objects.filter(cod=30,roll=3)
            
            if ene_rolls == 4:    
                relle1  =  Rellenos.objects.filter(cod=40,roll=1)
                relle2  =  Rellenos.objects.filter(cod=40,roll=2)
                relle3  =  Rellenos.objects.filter(cod=40,roll=3)
                relle4  =  Rellenos.objects.filter(cod=40,roll=4)
            if ene_rolls == 5:    
                relle1  =  Rellenos.objects.filter(cod=50,roll=1)
                relle2  =  Rellenos.objects.filter(cod=50,roll=2)
                relle3  =  Rellenos.objects.filter(cod=50,roll=3)
                relle4  =  Rellenos.objects.filter(cod=50,roll=4)
                relle5  =  Rellenos.objects.filter(cod=50,roll=5)
            
            if ene_rolls == 6:    
                relle1  =  Rellenos.objects.filter(cod=60,roll=1)
                relle2  =  Rellenos.objects.filter(cod=60,roll=2)
                relle3  =  Rellenos.objects.filter(cod=60,roll=3)
                relle4  =  Rellenos.objects.filter(cod=60,roll=4)
                relle5  =  Rellenos.objects.filter(cod=60,roll=5)
                relle6  =  Rellenos.objects.filter(cod=60,roll=6)
                
            if ene_rolls == 7:    
                relle1  =  Rellenos.objects.filter(cod=70,roll=1)
                relle2  =  Rellenos.objects.filter(cod=70,roll=2)
                relle3  =  Rellenos.objects.filter(cod=70,roll=3)
                relle4  =  Rellenos.objects.filter(cod=70,roll=4)
                relle5  =  Rellenos.objects.filter(cod=70,roll=5)
                relle6  =  Rellenos.objects.filter(cod=70,roll=6)
                relle7  =  Rellenos.objects.filter(cod=70,roll=7)
    
        #SEGUNDA PROMO SELECCIONADA SEGUNDA PROMO SELECCIONADA SEGUNDA PROMO SELECCIONADA SEGUNDA PROMO SELECCIONADA 
        if  caja2_seleccionada != "" or caja2_seleccionada == None:
            npromo = npromo + 1
            pr2 = Promos.objects.filter(Q(descrip__icontains=caja2_seleccionada))      
            for sal in pr2:
                cod2_x = sal.cod
                descrip2_x = sal.descrip
                valor2_x = sal.valor
                incluye2_x = sal.incluye
            #ENVOLTURAS - segunda promo  
            qry_envolt2  =  Envolturas.objects.filter(cod=cod2_x).order_by('roll')
            ene_rolls = qry_envolt2.count()  # cuantas envolturas tiene
            kontador2 = 1
            for itera_envolt in qry_envolt2:
                if kontador2 == 1:
                   envolt1_2 = itera_envolt.envolt

                if kontador2 == 2: 
                   envolt2_2 = itera_envolt.envolt

                if kontador2 == 3: 
                   envolt3_2 = itera_envolt.envolt

                if kontador2 == 4: 
                   envolt4_2 = itera_envolt.envolt
                if kontador2 == 5: 
                   envolt5_2 = itera_envolt.envolt

                if kontador2 == 6: 
                   envolt6_2 = itera_envolt.envolt

                if kontador2 == 7: 
                   envolt7_2 = itera_envolt.envolt

                kontador2 = kontador2 + 1    

             #para mostrar rellenos disponibles - promo2 columna1
            if  ene_rolls == 2:    
                relle1_2  =  Rellenos.objects.filter(cod=20,roll=1)
                relle2_2  =  Rellenos.objects.filter(cod=20,roll=2)
            
            if  ene_rolls == 3:    
                relle1_2  =  Rellenos.objects.filter(cod=30,roll=1)
                relle2_2  =  Rellenos.objects.filter(cod=30,roll=2)
                relle3_2  =  Rellenos.objects.filter(cod=30,roll=3)
            
            if  ene_rolls == 4:    
                relle1_2  =  Rellenos.objects.filter(cod=40,roll=1)
                relle2_2  =  Rellenos.objects.filter(cod=40,roll=2)
                relle3_2  =  Rellenos.objects.filter(cod=40,roll=3)
                relle4_2  =  Rellenos.objects.filter(cod=40,roll=4)
            
            if  ene_rolls == 5:    
                relle1_2  =  Rellenos.objects.filter(cod=50,roll=1)
                relle2_2  =  Rellenos.objects.filter(cod=50,roll=2)
                relle3_2  =  Rellenos.objects.filter(cod=50,roll=3)
                relle4_2  =  Rellenos.objects.filter(cod=50,roll=4)
                relle5_2  =  Rellenos.objects.filter(cod=50,roll=5)
            
            if  ene_rolls == 6:    
                relle1_2  =  Rellenos.objects.filter(cod=60,roll=1)
                relle2_2  =  Rellenos.objects.filter(cod=60,roll=2)
                relle3_2  =  Rellenos.objects.filter(cod=60,roll=3)
                relle4_2  =  Rellenos.objects.filter(cod=60,roll=4)
                relle5_2  =  Rellenos.objects.filter(cod=60,roll=5)
                relle6_2  =  Rellenos.objects.filter(cod=60,roll=6)
            if ene_rolls == 7:    
                relle1_2  =  Rellenos.objects.filter(cod=70,roll=1)
                relle2_2  =  Rellenos.objects.filter(cod=70,roll=2)
                relle3_2  =  Rellenos.objects.filter(cod=70,roll=3)
                relle4_2  =  Rellenos.objects.filter(cod=70,roll=4)
                relle5_2  =  Rellenos.objects.filter(cod=70,roll=5)
                relle6_2  =  Rellenos.objects.filter(cod=70,roll=6)
                relle7_2  =  Rellenos.objects.filter(cod=70,roll=7)

        #TERCERA PROMO SELECCIONADA TERCERA PROMO SELECCIONADA TERCERA PROMO SELECCIONADA TERCERA PROMO SELECCIONADA
        if  caja3_seleccionada != "" or  caja3_seleccionada == None:
                npromo = npromo + 1
                pr3 = Promos.objects.filter(Q(descrip__icontains=caja3_seleccionada))         
                for sal in pr3:
                    cod3_x = sal.cod
                    descrip3_x = sal.descrip
                    valor3_x = sal.valor
                    incluye3_x = sal.incluye
    
                qry_envolt3  =  Envolturas.objects.filter(cod=cod3_x) # numero de rolls
                ene_rolls = qry_envolt3.count()  # cuantas envolturas tiene (para pruebas)
                kontador3 = 1
                for envolt in qry_envolt3:
                    if kontador3 == 1:
                       envolt1_3 = envolt.envolt 

                    if kontador3 == 2: 
                       envolt2_3 = envolt.envolt 

                    if kontador3 == 3: 
                       envolt3_3 = envolt.envolt 

                    if kontador3 == 4: 
                       envolt4_3 = envolt.envolt 

                    if kontador3 == 5: 
                       envolt5_3 = envolt.envolt 

                    if kontador3 == 6: 
                       envolt6_3 = envolt.envolt 

                    if kontador3 == 7: 
                       envolt7_3 = envolt.envolt

                    kontador3 = kontador3 + 1
        
                #para mostrar rellenos disponibles - promo3 - columna1
                if ene_rolls == 2:    
                     relle1_3  =  Rellenos.objects.filter(cod=20,roll=1)
                     relle2_3  =  Rellenos.objects.filter(cod=20,roll=2)
                
                if ene_rolls == 3:    
                     relle1_3  =  Rellenos.objects.filter(cod=30,roll=1)
                     relle2_3  =  Rellenos.objects.filter(cod=30,roll=2)
                     relle3_3  =  Rellenos.objects.filter(cod=30,roll=3)
                
                if ene_rolls == 4:    
                     relle1_3  =  Rellenos.objects.filter(cod=40,roll=1)
                     relle2_3  =  Rellenos.objects.filter(cod=40,roll=2)
                     relle3_3  =  Rellenos.objects.filter(cod=40,roll=3)
                     relle4_3  =  Rellenos.objects.filter(cod=40,roll=4)
                
                if ene_rolls == 5:    
                     relle1_3  =  Rellenos.objects.filter(cod=50,roll=1)
                     relle2_3  =  Rellenos.objects.filter(cod=50,roll=2)
                     relle3_3  =  Rellenos.objects.filter(cod=50,roll=3)
                     relle4_3  =  Rellenos.objects.filter(cod=50,roll=4)
                     relle5_3  =  Rellenos.objects.filter(cod=50,roll=5)
                
                if ene_rolls == 6:    
                    relle1_3  =  Rellenos.objects.filter(cod=60,roll=1)
                    relle2_3  =  Rellenos.objects.filter(cod=60,roll=2)
                    relle3_3  =  Rellenos.objects.filter(cod=60,roll=3)
                    relle4_3  =  Rellenos.objects.filter(cod=60,roll=4)
                    relle5_3  =  Rellenos.objects.filter(cod=60,roll=5)
                    relle6_3  =  Rellenos.objects.filter(cod=60,roll=6)
            
                if ene_rolls == 7:    
                    relle1_3  =  Rellenos.objects.filter(cod=70,roll=1)
                    relle2_3  =  Rellenos.objects.filter(cod=70,roll=2)
                    relle3_3  =  Rellenos.objects.filter(cod=70,roll=3)
                    relle4_3  =  Rellenos.objects.filter(cod=70,roll=4)
                    relle5_3  =  Rellenos.objects.filter(cod=70,roll=5)
                    relle6_3  =  Rellenos.objects.filter(cod=70,roll=6)
                    relle7_3  =  Rellenos.objects.filter(cod=70,roll=7)
        
        
        vtot =  valor1_x + valor2_x + valor3_x 
        vtot3 = vtot

        context = {
                "logo_corp_chico":logo2,
                "descrip_adi1":descrip_adi1,
                "aSubtotal1_adic":aSubtotal1_adic,
                "descrip_adi2":descrip_adi2,
                "aSubtotal2_adic":aSubtotal2_adic,
                "descrip_adi3":descrip_adi3,
                "aSubtotal3_adic":aSubtotal3_adic,
                "caja1_seleccionada":caja1_seleccionada,
                "caja2_seleccionada":caja2_seleccionada,
                "caja3_seleccionada":caja3_seleccionada,
                "caja4_seleccionada":caja4_seleccionada,
                "cod1_x"    : cod1_x     ,
                "descrip1_x": descrip1_x ,
                "valor1_x"  : valor1_x   ,
                "incluye1_x": incluye1_x ,
                "cod2_x"    : cod2_x     ,
                "descrip2_x": descrip2_x ,
                "valor2_x"  : valor2_x   ,
                "incluye2_x": incluye2_x ,
                "cod3_x"    : cod3_x     ,
                "descrip3_x": descrip3_x ,
                "valor3_x"  : valor3_x   ,
                "incluye3_x": incluye3_x ,
                "cod4_x"    : cod4_x     ,
                "descrip4_x": descrip4_x ,
                "valor4_x"  : valor4_x   ,
                "incluye4_x": incluye4_x ,
                "envolt1":envolt1,
                "envolt2":envolt2,
                "envolt3":envolt3,
                "envolt4":envolt4,
                "envolt5":envolt5,
                "envolt6":envolt6,
                "envolt7":envolt7,
                "envolt1_2":envolt1_2,
                "envolt2_2":envolt2_2,
                "envolt3_2":envolt3_2,
                "envolt4_2":envolt4_2,
                "envolt5_2":envolt5_2,
                "envolt6_2":envolt6_2,
                "envolt7_2":envolt7_2,
                "envolt1_3":envolt1_3,
                "envolt2_3":envolt2_3,
                "envolt3_3":envolt3_3,
                "envolt4_3":envolt4_3,
                "envolt5_3":envolt5_3,
                "envolt6_3":envolt6_3,
                "envolt7_3":envolt7_3,
                "para_envol":para_envol,
                "relle1":relle1,
                "relle2":relle2,
                "relle3":relle3,
                "relle4":relle4,
                "relle5":relle5,
                "relle6":relle6,
                "relle7":relle7,
                "relle1_2":relle1_2,
                "relle2_2":relle2_2,
                "relle3_2":relle3_2,
                "relle4_2":relle4_2,
                "relle5_2":relle5_2,
                "relle6_2":relle6_2,
                "relle7_2":relle7_2,
                "relle1_3":relle1_3,
                "relle2_3":relle2_3,
                "relle3_3":relle3_3,
                "relle4_3":relle4_3,
                "relle5_3":relle5_3,
                "relle6_3":relle6_3,
                "relle7_3":relle7_3,
                "relle_tot":relle_tot,
                "vtot":vtot,
                "vtot3":vtot3,
                "npromo":npromo,
                "hrs":hrs,
                "cta":cta,
                "ctas":ctas,
                "obs":obs,
        }
        return render(request,'cambios.html',context)
    return render(request,'principal_flex2.html',context)


def galeria(request):
    variable1 = 'Galeria Internacional'
    logo2 = "/static/img/Logo_sc.jpg"
    context ={
    	"variable1":variable1,
    	"logo_corp_chico":logo2, 
    }
    return render(request,'galeria.html',context)


def pedidos_sc(request,pr):
    variable1 = 'Identificación para el pedido'
    variable2 = 'prom'+str(pr)+".jpg"
    logo2 = "/static/img/Logo_sc.jpg"
    context ={
    	"variable1":variable1,
        "variable2":variable2,
    	"logo_corp_chico":logo2,
    	"promo":pr, 
    }
    return render(request,'pedidos.html',context)


def registrarse(request,pr):
    variable1 = 'Pantalla de Registro'
    logo2 = "/static/img/Logo_sc.jpg"
    fecha_x = datetime.now() 
    nombre_x    = request.POST.get('nombre')    # valor del template (id)
    direccion_x = request.POST.get('direccion') # valor del template
    celu_x = request.POST.get('celu')           # valor del template
    if request.method == "POST":
        resultado = 'noexiste'      
        existe = Pedidos.objects.filter(celu=celu_x).exists()
        if existe == True:
            cursor = connection.cursor()
            cursor.execute(
            "update appsclub_pedidos set nombre=%s,direccion=%s,fecha=%s where celu=%s",
            [nombre_x,direccion_x,fecha_x,celu_x])
        else:
            p = Pedidos(nombre=nombre_x,
                direccion=direccion_x,
                celu=celu_x,
                fecha=fecha_x)
            p.save()
    celu_str = str(celu_x)
    celu_str = celu_str[0:1]+" "+celu_str[1:5]+" "+celu_str[5:9] 
    context ={"logo_corp_chico":logo2,
              "nombre":nombre_x,
              "fecha_x":fecha_x,
              "celu_str":celu_str,
              "promo_x":pr,    
              "direccion_x":direccion_x,          
              }
    return render(request,'cambios.html',context) 


@login_required(login_url='login_ini')
def administrador(request):
    logo2 = "/static/img/Logo_sc.jpg"
    horas = Param.objects.filter(tipo="HORA").exclude(descrip='hora').order_by('codigo')
    hrs_def = Param.objects.filter(tipo="HORA").order_by('codigo')
    cta  =  Param.objects.filter(tipo="CTA").order_by('codigo')    
    trabajo =  Param.objects.filter(tipo="TRA").order_by('codigo') #
    obs =  Param.objects.filter(tipo="OBS").order_by('codigo')

    for ob in obs:
        obstext = ob.observacion1

    aHrs_def = {}
    for h in hrs_def:
        if h.descrip != 'hora':
            aHrs_def.update({h.codigo:h.corr})

    #return HttpResponse(str(aHrs_def))

    for t in trabajo:
        tr = t.switch1  # 0=nose trabaja, 1=setrabaja

    ene_registros = horas.count()   # total registros de la tabla
    ene_regis_cta = cta.count()     # total registros de la tabla
    ene_horas_def = hrs_def.count() 

    context = {
        "horas":horas,
        "cta":cta,
        "trabajo":tr,
        "aHrs_def":aHrs_def,
        "obstext":obstext,        
        "obs":obs,
        "logo_corp_chico":logo2,
        }  

    if request.method == "POST":
        ctas = []
        ctas_cod = []
        ctas_corr = []
        ctas_id = []
        for prba in cta:
            ctas_cod.append(prba.codigo)
            ctas_corr.append(prba.corr)
            ctas_id.append(prba.id)
        #    
        horas_cod = []
        horas_corr = []        
        horas_id = []
        au = []
        # horas (llena arreglos desde tabla)
        for h in horas:
            horas_cod.append(h.codigo) # llena arreglo con valor campo 'codigo' desde la tabla
            horas_corr.append(h.corr)  # llena arreglo con valor campo 'corr' desde la tabla
            horas_id.append(h.id)

        # cta (llena arreglos desde tabla)
        for ct in cta:
            ctas_cod.append(ct.codigo) # llena arreglo con valor campo 'codigo' de la tabla
            ctas_corr.append(ct.corr)  # llena arreglo con valor campo 'corr' de la tabla
            ctas_id.append(ct.id)

        # horas    
        k = 1  
        cursor = connection.cursor()  
        while k < ene_registros + 1:   # total registros de la tabla 
            xx = horas_cod[k-1]        # extrae el valor codigo del arreglo 0,1,2,3...etc
            yy = horas_corr[k-1]       # extrae el valor corr del arreglo 0,1,2,3...etc
            id_x = horas_id[k-1]       # extrae el valor de ID  
            valor_xx = request.POST.get(str(xx)) # trae campo value del check directamente desde template        
            valor_yy = request.POST.get(str(yy)) # trae campo value del check directamente desde template    
            if valor_xx == None:
                valor_xx = 0
            else:    
                valor_xx = 1

            if valor_yy == None:
                valor_yy = 0
            else:    
                valor_yy = 1
            k=k+1 

            #horas
            cursor.execute(
            "update appsclub_param set switch1=%s,switch2=%s where id=%s",
            [valor_xx,valor_yy,id_x]
            )     

        # cta     
        k = 1  
        while k < ene_regis_cta + 1:  # total registros de la tabla 
            xx = ctas_cod[k-1]        # extrae el valor 'codigo' del arreglo 0,1,2,3...etc
            yy = ctas_corr[k-1]       # extrae el valor 'corr' del arreglo 0,1,2,3...etc
            id_x = ctas_id[k-1]
            valor_xx = request.POST.get(str(xx)) # trae campo value del check directamente desde template        
            valor_yy = request.POST.get(str(yy)) # trae campo value del check directamente desde template            

            #au.append([id_x,xx,yy,valor_xx,valor_yy])

            if valor_xx == None:
                valor_xx = 0
            else:    
                valor_xx = 1

            if valor_yy == None:
                valor_yy = 0
            else:    
                valor_yy = 1
            k=k+1 

            cursor.execute(
            "update appsclub_param set switch1=%s,switch2=%s  where id=%s",
            [valor_xx,valor_yy,id_x]
            )

        # Trae la glosa del textarea directamente desde template según lo que tenga en name    
        for ob in obs:
            name_x = request.POST.get(str(ob.codigo)) # el valor de "ob.codigo" es lo q' hay en 'name' del template
            cursor.execute(
            "update appsclub_param set observacion1=%s where codigo=%s",
            [name_x,ob.codigo]
            )


        trabajo = request.POST.get('laburohoy') # trae campo value del check directamente desde template            

        cursor.execute(
            "update appsclub_param set switch1=%s where tipo=%s",
            [trabajo,"TRA"]
        )     
         
    
        return redirect("principal")  # redirecciona a la url 'principal'
    return render(request,'administrador.html',context)

