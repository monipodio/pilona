/* Nota: ID (#)  y clases (.), (gato y punto respectivamente) */
/* Toda funcion que haga alusion a AJAX no hay que subirla a PythonAnywhere */
/* pues dará un error 404 */
/* ------------------- */

function llenacaja(){
	var fini = $('#datepicker').val();
	var fini = fini.slice(6,10)+"-"+fini.slice(0, 2)+"-"+fini.slice(3,5);
   	document.getElementById("datepicker").value=fini;
	}

 function llenacaja2(){
	var fenac = $('#datepicker2').val();
	var fenac = fenac.slice(6,10)+"-"+fenac.slice(0, 2)+"-"+fenac.slice(3, 5);
   	document.getElementById("datepicker2").value=fenac;
	}


function prueba() {
	var x = document.getElementById("rut").value
    alert("!! Entró al MYJS.JS ¡¡"+x);
    document.getElementById("rut").focus();
    document.getElementById("rut").style.border = '2px solid red';
}

function validaemail(email) {
	/*alert("email llegó con :"+email);*/
	if(email=="correo"){ 
    	var x = document.getElementById("correo").value
	} else {
    	var x = document.getElementById("correo_apod").value
	}

    if(x!='') {
        var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !expr.test(x) ) {
            alert("Error: La dirección de correo " + x + " es incorrecta.");
            document.getElementById("correo").value = "";
        }
    }
}


function validarut_cui() {
	var rut = document.getElementById("rut").value;
	if(document.getElementById("extran").checked) { 	
		return true;
	} else {	
		validarut();
 	}
}


function separadordemiles(input) {
	var num = input.value.replace(/\./g,'');
	/* alert(num); */
}


function validarut_999() {
    /*
	xx = validarut_()
	if(xx == true){
		siexiste(rut)
		return true;
	}else{
		return false;
	}
	*/
}

/* valida rut del paciente desde FICHA_PACIENTES.HTML */
function validarut() {
	var rut = document.getElementById("rut").value 
	document.getElementById("rut").value=rut.toUpperCase()
	if (rut!='') {
		var rexp = new RegExp(/^([0-9])+\-([kK0-9])+$/);
		if(rut.match(rexp)){
			var RUT = rut.split("-");
			//var elRut = RUT[0].toArray();
			var elRut = RUT[0].split('');
			var factor = 2;
			var suma = 0;
			var dv;
			for(i=(elRut.length-1); i>=0; i--){
				factor = factor > 7 ? 2 : factor;
				suma += parseInt(elRut[i])*parseInt(factor++);
			}
			dv = 11 -(suma % 11);
			if(dv == 11){
				dv = 0;
			}else if (dv == 10){
				dv = "K";
			}

			if(dv==0-0) {
				alert("El rut es incorrecto por formato digitado.!!");
				document.getElementById("rut").style.border = '';
				document.getElementById("rut").style.border = '2px solid red';
				return false;
			}

			if(dv == RUT[1].toUpperCase()){
         		document.getElementById("rut").style.border = '';
           		document.getElementById("nombre").focus();
        		return true; 
			}else{         
        		document.getElementById("rut").style.border = '2px solid red';
           		document.getElementById("rut").focus();		
           		document.getElementById("rut").value = '';			
				alert("El rut es incorrecto.!!!");
				return false;
			}
		}else{  
		    document.getElementById("rut").style.border = '2px solid red';
           	document.getElementById("rut").focus();	  
           	document.getElementById("rut").value = ''; 
			alert("RUT incorrecto por formato digitado.!!!");
			return false;
		}
	}	
}

/*
$(document).ready(function(){
   $("#rut").blur(function(evento){
      alert("Ha entrado al puto JQuery");
   });
});
*/

/* valida rut del apoderado desde ficha PACIENTE */
function validarut2() {
	var rut = document.getElementById("rut_apod").value 
	document.getElementById("rut_apod").value=rut.toUpperCase()
	if (rut!='') {
		var rexp = new RegExp(/^([0-9])+\-([kK0-9])+$/);
		if(rut.match(rexp)){
			var RUT = rut.split("-");
			//var elRut = RUT[0].toArray();
			var elRut = RUT[0].split('');
			var factor = 2;
			var suma = 0;
			var dv;
			for(i=(elRut.length-1); i>=0; i--){
				factor = factor > 7 ? 2 : factor;
				suma += parseInt(elRut[i])*parseInt(factor++);
			}
			dv = 11 -(suma % 11);
			if(dv == 11){
				dv = 0;
			}else if (dv == 10){
				dv = "K";
			}
				if(dv == RUT[1].toUpperCase()){
         			document.getElementById("rut_apod").style.border = '';
           			document.getElementById("nombre").focus();
				return true;
			}else{         
        		document.getElementById("rut_apod").style.border = '2px solid red';
           		document.getElementById("rut_apod").focus();		
           		document.getElementById("rut_apod").value = '';			
				alert("Rut incorrecto por Digito Verificador!!");
				return false;
			}

		}else{

		    document.getElementById("rut_apod").style.border = '2px solid red';
           	document.getElementById("rut_apod").focus();	  
           	document.getElementById("rut_apod").value = ''; 
			alert("RUT incorrecto por formato digitado!!");
			return false;
		}
	}	
}

function habilitadeshabilita(campo) {
	var estadoActual = document.getElementById(campo);
	if(estadoActual.disabled)   {
		estadoActual.disabled= false;
	} else {
		estadoActual.disabled= true;
    }
}


// obtiene el focus
function txt_onfocus(txt) {
    txt.style.backgroundColor = " ";
}

// pierde el focus
function txt_onchange(txt)
{
    txt.style.backgroundColor = " ";   
}


function upperCase() {
	var x=document.getElementById("rut").value
	document.getElementById("rut").value=x.toUpperCase()
}

function valida_fono() {
	var fon = document.getElementById("fono_cuid").value;
    if(fon!='') {
		if( (!/^([0-9])*$/.test(fon)) ) {
			alert("El formato del numero telefonico introducido es incorrecto.");
			document.getElementById("fono_cuid").style.border = '2px solid red';
			document.getElementById("fono_cuid").focus();
		}else{
			document.getElementById("fono_cuid").style.border = '';	
		}
	}
}


function confirmar_borrado(nombre) {
	var nombre = $('#nombre').val();
	if(confirm('¿Estas seguro de efectuar el borrado de: '+nombre)) {

	}
}

function confirmar_borrado2(nombre,id) {
	var nombre = document.getElementById("nombre").value; 
    if(confirm('¿Estas seguro de borrar a :'+nombre+' ?')) {
     	var request = $.ajax({
    	    type: "GET",
    	    url: "{% url 'EliminaPac' id %}",
    	    data: {
    	        "csrfmiddlewaretoken": "{{ csrf_token }}",
    	        "id": id                    
    	    },
    		});
   			request.done(function(response) {
   		});
 	}
}

function mayuscula(e) {
	e.value = e.value.toUpperCase();
}


function limpia() {
	document.getElementById("busca").value = " ";
}


/* Valida FICHA de PAUTA*/ 
function ValidarForm() {
	var yace = document.getElementById("yace").value 
	var rut_t1 = document.getElementById("rut_t1").value 
	var rut_t2 = document.getElementById("rut_t2").value 
	var rut_t3 = document.getElementById("rut_t3").value 
	var tipo_turno1 = document.getElementById("tipo_turno1").value 
	var tipo_turno2 = document.getElementById("tipo_turno2").value 
	var tipo_turno3 = document.getElementById("tipo_turno3").value
	var reca_cui = document.getElementById("reca_cui").value


	if (yace == '6'){
		alert("No ha especificado la ESTADIA !!")
		document.getElementById('yace').focus()
		document.getElementById('yace').style.border = '2px solid red';		
		return false;	
	}

	if(rut_t1 == '0-0' && rut_t2 == '0-0' && rut_t3 == '0-0' ){
		alert("Error!!..no ha asignado CUIDADOR");
		return false;
	}

	if(rut_t1 != '0-0' && tipo_turno1 == '0'){
		alert("Error!!..todo cuidador debe tener su respectivo TIPO DE TURNO");
		document.getElementById('tipo_turno1').focus()
		document.getElementById('tipo_turno1').style.border = '2px solid red';		
		return false;
	}

	if(rut_t2 != '0-0' && tipo_turno2 == '0'){
		alert("Error!!..todo cuidador debe tener su respectivo TIPO DE TURNO");
		document.getElementById('tipo_turno2').focus()
		document.getElementById('tipo_turno2').style.border = '2px solid red';		
		return false;
	}

	if(rut_t3 != '0-0' && tipo_turno3 == '0'){
		alert("Error!!..todo cuidador debe tener su respectivo TIPO DE TURNO");
		document.getElementById('tipo_turno3').focus()
		document.getElementById('tipo_turno3').style.border = '2px solid red';		
		return false;
	}


	/* recargo x dia FIN DE SEMANA - DIA FESTIVO - NORMAL */
	if(reca_cui === "0"){
		alert("Defina si esta fecha es: NORMAL - DOMINGO - FESTIVO ");
		document.getElementById('reca_cui').focus()
		document.getElementById('reca_cui').style.border = '2px solid red';
		return false;
	}

}

function ValidaFichapac() {
	var medico = document.getElementById("medico").value 
	var fe_ini = document.getElementById("fe_ini").value 
	var fono_pcte = document.getElementById("fono_pcte").value 
	var valor_t1 = document.getElementById("valor_t1").value 
	var valor_t2 = document.getElementById("valor_t2").value 
	var valor_t3 = document.getElementById("valor_t3").value 
	var f_apod = document.getElementById("f_apod").value 
	var parentes = document.getElementById("parentes").value 
    var rut  = document.getElementById("rut").value
    var clasi = document.getElementById("clasi").value 
	var yace = document.getElementById("yace").value 
	var correo_apod = document.getElementById("correo_apod").value 
	var abono_ini = document.getElementById("valor_abono").value


	if(rut === "0" || rut === "" || rut === 0-0){
		alert("El RUT no debe estar en blanco o ser cero");
		document.getElementById('rut').focus()
		document.getElementById('rut').style.border = '2px solid red';
		return false;
	}

	if(medico === ""){
		alert("El nombre del MEDICO es obligatorio");
		document.getElementById('medico').focus()
		document.getElementById('medico').style.border = '2px solid red';
		return false;
	}
	if(fe_ini === ""){
		alert("La FECHA DE INICIO del paciente es obligatoria");
		document.getElementById('fe_ini').focus()
		document.getElementById('fe_ini').style.border = '2px solid red';
		return false;
	}
	if(fono_pcte === ""){
		alert("El FONO DEL PACIENTE es obligatorio");
		document.getElementById('fono_pcte').focus()
		document.getElementById('fono_pcte').style.border = '2px solid red';
		return false;
	}

	if(clasi === "0"){
		alert("LA CLASIFICACION es obligatoria");
		document.getElementById('clasi').focus()
		document.getElementById('clasi').style.border = '2px solid red';
		return false;
	}

	if(yace === "6"){
		alert("LUGAR DONDE SE OTORGA LA PRESTACION es obligatorio"); 
		document.getElementById('yace').focus()
		document.getElementById('yace').style.border = '2px solid red';
		return false;
	}


	if(valor_t1 === ""){
		alert("TARIFA DE MAÑANA es obligatoria");
		document.getElementById('valor_t1').focus()
		document.getElementById('valor_t1').style.border = '2px solid red';
		return false;
	}
	if(valor_t2 === ""){
		alert("TARIFA DE TARDE es obligatoria");
		document.getElementById('valor_t2').focus()
		document.getElementById('valor_t2').style.border = '2px solid red';
		return false;
	}
	if(valor_t3 === ""){
		alert("TARIFA DE NOCHE es obligatoria");
		document.getElementById('valor_t3').focus()
		document.getElementById('valor_t3').style.border = '2px solid red';
		return false;
	}

	if(f_apod === ""){
		alert("FONO APODERADO es obligatorio");
		document.getElementById('f_apod').focus()
		document.getElementById('f_apod').style.border = '2px solid red';
		return false;
	}


	if(parentes === ""){
		alert("El PARENTEZCO es obligatorio");
		document.getElementById('parentes').focus()
		document.getElementById('parentes').style.border = '2px solid red';
		return false;
	}

	if(correo_apod === ""){
		alert("El CORREO DEL APODERADO es obligatorio");
		document.getElementById('correo_apod').focus()
		document.getElementById('correo_apod').style.border = '2px solid red';
		return false;
	}

	if(abono_ini === "" || abono_ini  === "0" || abono_ini=== 'none') {
		document.getElementById('abono_inicial').style.border = '2px solid red'; 
		alert("Una vez grabada esta ficha, deberá volver a la misma e ingresar el monto ABONO INICIAL");
	} 

}

function ValidaFichacui() {
	var tipo = document.getElementById("tipo").value 
	var fe_ini = document.getElementById("fe_ini").value  
	var direccion = document.getElementById("direccion").value
	var fono_cuid = document.getElementById("fono_cuid").value 
	var apago1 = document.getElementById("apago1").value 
	var apago2 = document.getElementById("apago2").value 
	var apago3 = document.getElementById("apago3").value 
    var nombre = document.getElementById("nombre").value
    var fono_cuid = document.getElementById("fono_cuid").value
    var afp = document.getElementById("afp").value


	if(nombre === ""){
		alert("El NOMBRE es obligatorio");
		document.getElementById('nombre').focus()
		document.getElementById('nombre').style.border = '2px solid red';
		return false;
	}

	if(tipo === '0'){
		alert("El TIPO DE CONTRATO es obligatorio");
		document.getElementById('tipo').focus()
		document.getElementById('tipo').style.border = '2px solid red';
		return false;
	}

	if(direccion === ''){
		alert("La DIRECCION es obligatoria");
		document.getElementById('direccion').focus()
		document.getElementById('direccion').style.border = '2px solid red';
		return false;
	}

	if(fe_ini === ''){
		alert("La FECHA DE INICIO es obligatoria");
		document.getElementById('fe_ini').focus()
		document.getElementById('fe_ini').style.border = '2px solid red';
		return false;
	}

	if(fono_cuid === ''){
		alert("El FONO es obligatorio");
		document.getElementById('fono_cuid').focus()
		document.getElementById('fono_cuid').style.border = '2px solid red';
		return false;
	}

	if(apago1 === "0" || apago1 === ""){
		alert("TARIFA DE MAÑANA es obligatoria");
		document.getElementById('apago1').focus()
		document.getElementById('apago1').style.border = '2px solid red';
		return false;
	}
	if(apago2 === "0" || apago2 === ""){
		alert("TARIFA DE TARDE es obligatoria");
		document.getElementById('apago2').focus()
		document.getElementById('apago2').style.border = '2px solid red';
		return false;
	}

	if(apago3 === "0" || apago3 === ""){
		alert("TARIFA DE NOCHE es obligatoria");
		document.getElementById('apago3').focus()
		document.getElementById('apago3').style.border = '2px solid red';
		return false;
	}

	if(afp === ""){
		alert("Previsión es obligatorio");
		document.getElementById('afp').focus()
		document.getElementById('afp').style.border = '2px solid red';
		return false;
	}
}

function ValidaFicha_anti() {
	var tipabon = document.getElementById("abon").value
	var banco =   document.getElementById("banco").value
	var fe_che =  document.getElementById("fecha_cheque").value

	if(tipabon === "0"){
		alert("TIPO DE ABONO es obligatorio");
		document.getElementById('abon').focus()
		document.getElementById('abon').style.border = '2px solid red';
		return false;
	}

	if(tipabon == "2" && banco == "9"){
		alert("Si el abono es CHEQUE, entonces complete los datos de este");
		document.getElementById('abon').focus()
		document.getElementById('cheque').style.border = '2px solid red';
		document.getElementById('banco').style.border = '2px solid red';
		document.getElementById('fecha_cheque').style.border = '2px solid red';
		return false;
	} 
}


function confirmaelimpac(nombre,id){
	var opcion=confirm('¿Seguro de borrar a paciente: '+nombre+' ?');
	if (opcion == true) {
      	var request = $.ajax({
            type: 'GET',
            url: "{% url 'Eliminapac_nuevo' %}",
	 	    data: {"id": id },
    	    /*    	
	 	    data: {
    	        "csrfmiddlewaretoken": "{{ csrf_token }}",
    	        "id": id },
			*/
        });
        alert("No funcó!! :"+request);
        request.done(function(response) {
            alert("Registro eliminado");
        });	

 	}else{
		return false;
	}
}

/* para mostrar contraseña durante la digitacion */
function mostrarPassword(){
		var cambio = document.getElementById("txtPassword");
		if(cambio.type == "password"){
			cambio.type = "text";
			$('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
		}else{
			cambio.type = "password";
			$('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
		}
	} 
	
	$(document).ready(function () {
	//CheckBox mostrar contraseña
	$('#ShowPassword').click(function () {
		$('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
	});
});


/* VALIDA FECHA DE INICIO */
function validarFormatoFecha() {
	var fe_ini = document.getElementById("fe_ini").value
    var RegExPattern = /^\d{1,4}\-\d{1,2}\-\d{1,2}$/;
    if (fe_ini.match(RegExPattern)) {
    	document.getElementById("fe_ini").style.border = '';
        return true;
    } else {
		/* document.getElementById('fe_ini').style.border = '2px solid red'; */
      	alert("Error!! formato de FECHA INICIO debe ser aaaa-mm-dd, los separadores son signos menos");
      	return true;
    }
}

/* VALIDA FECHA DE 	VENCIMIENTO CONTRATO */
function valifechavencimiento_contrato() {
	var vence_contrato = document.getElementById("vence_contrato").value
    var RegExPattern = /^\d{1,4}\-\d{1,2}\-\d{1,2}$/;
    if (vence_contrato.match(RegExPattern)) {
    	document.getElementById("vence_contrato").style.border = '';
        return true;
    } else {
		/* document.getElementById('fe_ini').style.border = '2px solid red'; */
      	alert("Error!! formato de VENCIMIENTO_CONTRATO debe ser aaaa-mm-dd, los separadores son signos menos");
      	return true;
    }
}




/* VALIDA FECHA DE NACIMIENTO */
function validarFormatoFecha2() {
	var fe_nac = document.getElementById("fe_nac").value
    var RegExPattern = /^\d{1,4}\-\d{1,2}\-\d{1,2}$/;
    if (fe_nac.match(RegExPattern)) {
    	document.getElementById("fe_nac").style.border = '';
        return true;
    } else {
		document.getElementById('fe_nac').style.border = '2px solid red';
      	alert("Error!! formato de FECHA de NACIMIENTO debe ser aaaa-mm-dd, los separadores son signos menos");
      	return true;
     }
}

/* valida fecha cheque - ficha paciente */
function validarFormatoFecha3() {
	var fe_nac = document.getElementById("fecha_cheque").value
    var RegExPattern = /^\d{1,4}\-\d{1,2}\-\d{1,2}$/;
    if (fe_nac.match(RegExPattern)) {
    	document.getElementById("fecha_cheque").style.border = '';
        return true;
    } else {
		document.getElementById('fecha_cheque').style.border = '2px solid red';
      	alert("Error!! formato de FECHA CHEQUE debe ser aaaa-mm-dd, los separadores son signos menos (solo en caso de cheques)");
		return true;
    }
}

/* VALIDA FECHA DE ALTA DEL PACIENTE */
function validarFormatoFecha4(campo) {
	if (campo == "fe_alta") {
		var fe_alta = document.getElementById("fe_alta").value
    	var RegExPattern = /^\d{1,4}\-\d{1,2}\-\d{1,2}$/;
    	if (fe_alta.match(RegExPattern)|| fe_alta === "" ) {
    		document.getElementById("fe_alta").style.border = '';
    	    return true;
    	} else {
			document.getElementById('fe_alta').style.border = '2px solid red';
    	  	alert("Error!! formato de FECHA ALTA debe ser aaaa-mm-dd, los separadores deben ser signos menos");
  			return true;    	
    	}
    }	
}


function validarchivo() {
	/* var archivo = $('input[name="foto"]').val();  */
	var archivo = document.getElementById("fotito").value
	if(archivo == ""){
		alert("!! No ha seleccionado archivo para subir.. !! ");
		return false;
	}else{
		alert("El archivo próximo a subir es: "+archivo)
		return true;
	}
}	

/* forma de pago */
function validabono() {
	var pagacon = document.getElementById("abon").value
	if(pagacon != "2") {
		document.getElementById("cheque").value = ""
		document.getElementById("bco").value = "9"
		document.getElementById("fecha_cheque").value = ""

		document.getElementById("cheque").readOnly = true;
		document.getElementById("bco").readOnly = true;
		document.getElementById("fecha_cheque").readOnly = true;

	}else{
		document.getElementById("cheque").readOnly = false;
		document.getElementById("bco").readOnly = false;
		document.getElementById("fecha_cheque").readOnly = false;
	}
}	


function miniventana() {
	/* alert("hola");  */
	/* window.open(url,"ventana1","width=300,height=300,scrollbars=NO");  */
	window.open("http://www.desarrolloweb.com" , "ventana1" , "width=120,height=300,scrollbars=NO") 
}

/* div que contiene una table (oculta-muesta toda la table)*/
function oculta_muestra() {
	if(document.getElementById('div1').style.display == 'none') {
 		document.getElementById('div1').style.display = 'block';

 	} else {
 		document.getElementById('div1').style.display = 'none';
 	}
}


function oculta() {
 	document.getElementById('div1').style.display = 'none';
}


function confirmar_borrado4(nombre,id) {
	var nombre = document.getElementById("nombre").value; 
    if(confirm('¿Estas seguro de borrar a :'+nombre+' ?')) {
     	var request = $.ajax({
    	    type: "GET",
    	    url: "{% url 'EliminaPac' id %}",
    	    data: {
    	        "csrfmiddlewaretoken": "{{ csrf_token }}",
    	        "id": id                    
    	    },
    		});
   			request.done(function(response) {
   		});
 	}
}

/* para probar */
/*
var rut = "145694841";
// retorna true si es válido
if($.validateRut(rut)) {
	alert("El rut es válido!");
}
*/

/*
$(document).ready(function(){
 	$('#rut').blur(function(evento){
	alert("..entró,..y ahora que? !!");
  	});
});
*/


/*
$(document).ready(function(){
	$("#rut").blur(function(evento){
	var rut = $("#rut").val()	
		$.ajax({
			url:'{% url siexisterut99 %}',
			type:'get',
			data : {rut: rut},
			timeout: 10000,	
	
			beforeSend: function(){
				$("#resultado").html("Buscando rut="+rut); 
			},
         	success: function(data){
            	alert("Entró al success");
          	},
  	
		});
    });
});
*/


/* Valida FICHA de RECETA de ingreso de un farmaco */ 
function ValidaFichaReceta() {
	var descrip = document.getElementById("descrip").value
	var fecha_prescri = document.getElementById("fecha_prescri").value 
	var via_sumi = document.getElementById("via_sumi").value 
	var frecuencia = document.getElementById("frecuencia").value 

	if (descrip == ''){
		alert("No ha especificado el farmaco ó suministros a ingresar !!");
		document.getElementById('descrip').focus()
		document.getElementById('descrip').style.border = '2px solid red';		
		return false;	
	}

	if(fecha_prescri === ""){
		alert("La FECHA DE PRESCRIPCION es obligatoria");
		document.getElementById('fecha_prescri').focus()
		document.getElementById('fecha_prescri').style.border = '2px solid red';
		return false;
	}

	if(via_sumi === ""){
		alert("Debe seleccionar VIA SUMINISTRO es obligatoria");
		document.getElementById('via_sumi').focus()
		document.getElementById('via_sumi').style.border = '2px solid red';
		return false;
	}

	if(frecuencia === ""){
		alert("Debe ingresar la FRECUENCIA ");
		document.getElementById('frecuencia').focus()
		document.getElementById('frecuencia').style.border = '2px solid red';
		return false;
	}

}


/* VALIDA FECHA DE prescricion de farmacos de una RECETA */
function validaFechaFarmaco() {
	var fecha_prescri = document.getElementById("fecha_prescri").value
    var RegExPattern = /^\d{1,4}\-\d{1,2}\-\d{1,2}$/;
    if (fecha_prescri.match(RegExPattern)) {
    	document.getElementById("fecha_prescri").style.border = '';
        return true;
    } else {
		/* document.getElementById('fe_ini').style.border = '2px solid red'; */
      	alert("Error!! formato de FECHA INICIO debe ser aaaa-mm-dd, los separadores son signos menos");
		document.getElementById('fecha_prescri').style.border = '2px solid red';
      	return false;
    }
}


/* pacientes */
function ayuda1() {
	alert('Al hacer clic en PASIVO implicará que a ese paciente no podrán hacerle pautas pero aparecerá en los demás informes.\nPor otra parte, el paciente que se va de alta se le deberá obviamente colocar la fecha de ALTA y el sistema automaticamente al momento de grabar lo dejará como PASIVO y eliminará la fecha de INICIO.\nEn caso de reingreso del paciente, se deberá borrar la fecha de alta manualmente, sacar el ticket de PASIVO y poner la nueva fecha de INICIO.');
}

/* cuidadores */
function ayuda2() {
	alert('La forma de poner fotos a una FICHA DE CUIDADOR es de la iguiente manera:\n Al ingresar al sistema, debes seleccionar el link ADMIN desde la pantalla inicial de identificacion de usuario. Estando en el ADMIN, se debe seleccionar la tabla CUIDADORES. Clic en el nombre de la cuidadora, y hacia abajo buscamos el campo llamado MEDIA. Clic en SELECCIONAR ARCHIVO, entonces se debe elejir la foto cuyo nombre sea el rut del cuidador, por ejemplo: 21022645-1.jpg\nla cual has seleccionado y preparado previamente');
}

/* grid nuevo farmaco */
function ayuda44() {
	alert('Incorpora nuevo fármaco a la receta del paciente');
}

function ayuda_login() {
	alert('Claves de perfiles a usar en el módulo ADMIN:\n'+
	'grid_pcteselimina => Botón elimina paciente desde la grid\n'+
	'btn_elim_gridcui => Botón elimina cuidador desde la grid\n'+
	'btn_acep_fichapac => Botón graba desde ficha de paciente\n'+
	'btn_acep_fichaant => Botón graba desde ficha anticipo\n'+
	'btn_elim_gridrecet => Botón elimina desde grid receta\n'+
	'btn_acep_fichapod => Botón aceptar desde ficha apoderado\n'+	
	'btn_acep_fichapaut => Botón aceptar desde ficha pauta\n'+
	'btn_acep_fichaparam => Botón aceptar desde ficha de parametros\n'+
	'actualiza_pac => link sobre nombre de paciente en la grid\n'+
	'actualiza_cui => link sobre nombre de cuidador en la grid\n'+
	'btn_acep_fichafar => botón aceptar desde ficha farmaco\n'
	)
}


function confirmaelimcui2(nombre,id){
	var opcion=confirm('¿Seguro de borrar a paciente: '+nombre+' ?');
	if (opcion == true) {
      	var request = $.ajax({
            type: 'GET',
            url: "{% url 'Eliminapac_nuevo' %}",
	 	    data: {"id": id },
    	    /*    	
	 	    data: {
    	        "csrfmiddlewaretoken": "{{ csrf_token }}",
    	        "id": id },
			*/
        });
        alert("No funcó!! :"+request);
        request.done(function(response) {
            alert("Registro eliminado");
        });	

 	}else{
		return false;
	}
}


/* Toma el focus del objeto */
function ayuda4(mensajetexto){
	/* lo despliega en el span de la PLANTILLA_BASE */
	$('#mensaje').html(mensajetexto);
}

/* Abandona el focus del objeto */
function ayuda5(){
	/* lo despliega en el span de la PLANTILLA_BASE */
	$('#mensaje').html("");
}


/* NO BORRAR */
function confirmaelimcui(){
	var nombre = document.getElementById("nombre").value; 
	$('#mensaje').html("No está autorizado para borrar !!");
	/* en plantilla HTML: <div style="color:#F7021C" id="mensaje"></div> 
	Y LA ACCION QUE DISPARA: onclick="confirmaelimcui();"
	*/
}

/*
function funcionprueba(){
	var rut = document.getElementById("rut").value;
	$('#mensaje').html(rut);
}
"use strict";
let map;
function initMap2() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -36.489491,
      lng: -72.712028,
    },
    zoom: 8
  });
}
function initMap() {
  var myLatLng = {lat: -33.485815, lng: -70.592673};
  map = new google.maps.Map(document.getElementById("map"), {
  center: {
      lat: -33.485815,
      lng: -70.592673,
    },
    zoom: 17,
  });
  var marker = new google.maps.Marker({
    map:map,
    position: myLatLng,
    title:"Puedes arrastrarme",
    draggable: true,
  })
  
}
/*
$(document).ready(function(){
	$('#rut').blur(function(){
 		var rut = $('input#rut').val();
		var request = $.ajax({
	    	url: 'https://www.google.com/', 
	    	type: "GET",
    		success: function(response) {
                $('#mensaje').html(response);
            }
        });
		request.fail( function(jqXHR, textStatus, errorThrown) {
   			 if (jqXHR.status === 0) {
			   alert('Sin coenxión: Revise la Network. => jqXHR.status='+jqXHR.status.toString());
			 } else if (jqXHR.status == 404) {
			   alert('La página solicitada no existe [404]'); 
			 } else if (jqXHR.status == 500) {
			   alert('Error interno del servidor [500].');
			 } else if (textStatus === 'parsererror') {
			   alert('Requested JSON parse failed.');
			 } else if (textStatus === 'timeout') {
			   alert('Error de expiración de tiempo.');
			 } else if (textStatus === 'abort') {
			   alert('Solicitud Ajax abortada.');
			 } else {
			   alert('Uncaught Error: ' + jqXHR.responseText);
			 }
		})
  	});
});
*/

function ValidaFichaReceta() {
	var celu = document.getElementById("celu").value
    var tele = ["+56"];
 	$("#celu").celu({
      source: tele
    });
}

/* valida cada caracter que se digita sea un numero */
function valideKey(evt){
    var code = (evt.which) ? evt.which : evt.keyCode;
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}

/* valida el número de total digitos del celu */
function val_longitud() {
	var celu = document.getElementById("celu").value;
	var digitos = celu.length;
	if(digitos!=0){
		if(digitos != 9){
			alert("El número de dígitos es erróneo!!, En total son nueve. Useted ha digitado: "+digitos);
			document.getElementById('celu').focus()
			return false;
		} 	
	}
}

function mayusculas() {
	var x=document.getElementById("nombre").value
	document.getElementById("nombre").value=x.toUpperCase()
}


function oculta() {
	document.getElementById('form-register').style.display == 'none' 
}

function selecciona(codigo) {
	alert("valor del combo: "+ id+" "+codigo);
   	/* document.getElementById("datepicker2").value=fenac; */
	alert("x teiene el valor:"+x)
}



/* botones ELIMINA */
function elimina(id) {
	if (id=="elimina1")
		document.getElementById("caja1").value = ""; 

	else if (id=="elimina2")
		document.getElementById("caja2").value = ""; 

	else if (id=="elimina3")
		document.getElementById("caja3").value = ""; 

	else if (id=="elimina4")
		document.getElementById("caja4").value = ""; 

	return false;
}


$(document).ready(function () {
    $("#id_promo").on('change', function () {            
        var pr = $(this).val();
      	
		if ($('#caja1').val().length == 0 && pr != "SELECCIONE PROMO...") 
			document.getElementById("caja1").value = pr;
			/* document.getElementById("codigo1").value = codpr; */

        else if ($('#caja2').val().length == 0 && pr != "SELECCIONE PROMO...") 
        	document.getElementById("caja2").value = pr;
        
        else if  ($('#caja3').val().length == 0 && pr != "SELECCIONE PROMO...") 
        	document.getElementById("caja3").value = pr;

        else if  ($('#caja4').val().length == 0 && pr != "SELECCIONE PROMO...") 
        	document.getElementById("caja4").value = pr;

	});
});


/* ENVOLTURAS - ENVOLTURAS -ENVOLTURAS -ENVOLTURAS -ENVOLTURAS -ENVOLTURAS -ENVOLTURAS -ENVOLTURAS -ENVOLTURAS */
$(document).ready(function () {
    $("#id_env1").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot1").value = cmb;
 		suma_cambios();
	});

    $("#id_env2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot2").value = cmb;
 		suma_cambios();
	});

    $("#id_env3").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot3").value = cmb;
 		suma_cambios();
	});

    $("#id_env4").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot4").value = cmb;
		suma_cambios();
	});

    $("#id_env5").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot5").value = cmb;
 		suma_cambios();
	});

    $("#id_env6").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot6").value = cmb;
 		suma_cambios();
	});

    $("#id_env7").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot7").value = cmb;
 		suma_cambios();
	});

    /* RELLENOS PROMO1 - RELLENOS PROMO1 - RELLENOS PROMO1 - RELLENOS PROMO1 */
    $("#relle1_tot").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub1_rell").value = rell;
 		suma_cambios();
 	});

	$("#relle2_tot").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub2_rell").value = rell;
 		suma_cambios();
	});

    $("#relle3_tot").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub3_rell").value = rell;
 		suma_cambios();
	});

    $("#relle4_tot").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub4_rell").value = rell;
 		suma_cambios();
	});

    $("#relle5_tot").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub5_rell").value = rell;
 		suma_cambios();
	});

    $("#relle6_tot").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub6_rell").value = rell;
 		suma_cambios();
	});

    $("#relle7_tot").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub7_rell").value = rell;
 		suma_cambios();
	});

    /* ENVOLTORIO PROMO2  */
    $("#id_env1_2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot1_2").value = cmb;
 		suma_cambios();
	});
    $("#id_env2_2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot2_2").value = cmb;
 		suma_cambios();
	});
    $("#id_env3_2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot3_2").value = cmb;
 		suma_cambios();
	});

    $("#id_env4_2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot4_2").value = cmb;
 		suma_cambios();
	});

    $("#id_env5_2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot5_2").value = cmb;
 		suma_cambios();
	});
    $("#id_env6_2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot6_2").value = cmb;
 		suma_cambios();
	});

    $("#id_env7_2").on('change', function () {            
        var cmb = $(this).val();
    	document.getElementById("subtot7_2").value = cmb;
 		suma_cambios();
	});

    /* RELLENO PROMO2 */
    $("#relle1_tot2").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub1_rell2").value = rell;
 		suma_cambios();
	});
    $("#relle2_tot2").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub2_rell2").value = rell;
 		suma_cambios();
	});
    $("#relle3_tot2").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub3_rell2").value = rell;
 		suma_cambios();
	});
    $("#relle4_tot2").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub4_rell2").value = rell;
 		suma_cambios();
	});
    $("#relle5_tot2").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub5_rell2").value = rell;
 		suma_cambios();
	});
    $("#relle6_tot2").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub6_rell2").value = rell;
 		suma_cambios();
	});
    $("#relle7_tot2").on('change', function () {            
        var rell = $(this).val();
    	document.getElementById("sub7_rell2").value = rell;
 		suma_cambios();
	});

});


/* valida si seleccionó una o mas promos*/
function val_eligio() {
	var caja1 = document.getElementById("caja1").value;
	if(caja1 === "") {
		Swal.fire({
		  icon: 'error',
		  title: 'Debes seleccionar una promoción!',
		  footer: '<a href>Para disfrutar los sushis mas deliciosos del mundo</a>',
		  allowOutsideClick:false,
		  confirmButtonText: "Aceptar",
		  width: '700px'
		})
		return false;
	}	
}

/* SUMA FINAL PARA EL TOTAL DE LA(S) PROMOS PEDIDAS */
function suma_cambios() {
    var vtot_aux = document.getElementById("vtot_aux").value;
    var npromo = document.getElementById("npromo").value;
    var cmb1    = document.getElementById("subtot1").value;
    var cmb2    = document.getElementById("subtot2").value;
    var cmb3    = document.getElementById("subtot3").value;
    var cmb4    = document.getElementById("subtot4").value;
    var cmb5    = document.getElementById("subtot5").value;
    var cmb6    = document.getElementById("subtot6").value;
    var cmb7    = document.getElementById("subtot7").value;
    var rell1   = document.getElementById("sub1_rell").value;
    var rell2   = document.getElementById("sub2_rell").value;
    var rell3   = document.getElementById("sub3_rell").value;
    var rell4   = document.getElementById("sub4_rell").value;
    var rell5   = document.getElementById("sub5_rell").value;
    var rell6   = document.getElementById("sub6_rell").value;
    var rell7   = document.getElementById("sub7_rell").value;

	var new_tot1 =  parseInt(vtot_aux) + parseInt(cmb1) + parseInt(cmb2) +
 		parseInt(cmb3)+ parseInt(cmb4) + parseInt(cmb5) + parseInt(cmb6) + parseInt(cmb7)+
		parseInt(rell1) + parseInt(rell2) + parseInt(rell3)+ parseInt(rell4) +
		parseInt(rell5) + parseInt(rell6) + parseInt(rell7) ;

		new_tot = new_tot1;	
	
	if(npromo === '2') { 
		var cmb1_2  = document.getElementById("subtot1_2").value; 
		var cmb2_2  = document.getElementById("subtot2_2").value;
		var cmb3_2  = document.getElementById("subtot3_2").value; 
		var cmb4_2  = document.getElementById("subtot4_2").value; 
		var cmb5_2  = document.getElementById("subtot5_2").value; 
		var cmb6_2  = document.getElementById("subtot6_2").value; 
		var cmb7_2  = document.getElementById("subtot7_2").value; 

    	var rell1_2   = document.getElementById("sub1_rell2").value;
    	var rell2_2   = document.getElementById("sub2_rell2").value;
    	var rell3_2   = document.getElementById("sub3_rell2").value;
    	var rell4_2   = document.getElementById("sub4_rell2").value;
    	var rell5_2   = document.getElementById("sub5_rell2").value;
    	var rell6_2   = document.getElementById("sub6_rell2").value;
    	var rell7_2   = document.getElementById("sub7_rell2").value;
 		
 		var new_tot2 = parseInt(cmb1_2) + parseInt(cmb2_2) +
 		parseInt(cmb3_2) + parseInt(cmb4_2) + parseInt(cmb5_2) + parseInt(cmb6_2) + parseInt(cmb7_2)+
		parseInt(rell1_2) + parseInt(rell2_2) + parseInt(rell3_2)+ parseInt(rell4_2) +
		parseInt(rell5_2) + parseInt(rell6_2) + parseInt(rell7_2);

		new_tot = new_tot1 + new_tot2;	
	}	

	/*var new_tot = parseInt(tot_promo1); */
	document.getElementById('vtot').value = new_tot.toString();
}


/* OCULTA ROLLS (que no proceden) */
$(document).ready(function () {
	if(document.getElementById("caja3").value === "readonly") {
		document.getElementById('caja3').style.display = 'none';
		document.getElementById('id_env3').style.display = 'none';
		document.getElementById('subtot3').style.display = 'none';
	}

	if(document.getElementById("caja4").value === "readonly") {
		document.getElementById('caja4').style.display = 'none';
		document.getElementById('id_env4').style.display = 'none';
		document.getElementById('subtot4').style.display = 'none';
	}
	if(document.getElementById("caja5").value === "readonly") {
		document.getElementById('caja5').style.display = 'none';
		document.getElementById('id_env5').style.display = 'none';
		document.getElementById('subtot5').style.display = 'none';
	}
	if(document.getElementById("caja6").value === "readonly") {
		document.getElementById('caja6').style.display = 'none';
		document.getElementById('id_env6').style.display = 'none';
		document.getElementById('subtot6').style.display = 'none';
	}
	if(document.getElementById("caja7").value === "readonly") {
		document.getElementById('caja7').style.display = 'none';
		document.getElementById('id_env7').style.display = 'none';
		document.getElementById('subtot7').style.display = 'none';
	}

	/*var texto = $("#relle1:selected").text();  */
	/*var texto = $( "#rrelle1 option:selected" ).text();*/
	
	/* RELLENOS */
	if(document.getElementById("caja3").value === "readonly") {
		document.getElementById('relle3').style.display = 'none';
		document.getElementById('relle3_tot').style.display = 'none';
		document.getElementById('sub3_rell').style.display = 'none';
	}

	if(document.getElementById("caja4").value === "readonly") {
		document.getElementById('relle4').style.display = 'none';
		document.getElementById('relle4_tot').style.display = 'none';
		document.getElementById('sub4_rell').style.display = 'none';
	}
	
	if(document.getElementById("caja5").value === "readonly") {
		document.getElementById('relle5').style.display = 'none';
		document.getElementById('relle5_tot').style.display = 'none';
		document.getElementById('sub5_rell').style.display = 'none';
	}

	if(document.getElementById("caja6").value === "readonly") {
		document.getElementById('relle6').style.display = 'none';
		document.getElementById('relle6_tot').style.display = 'none';
		document.getElementById('sub6_rell').style.display = 'none';
	}
	if(document.getElementById("caja7").value === "readonly") {
		document.getElementById('relle7').style.display = 'none';
		document.getElementById('relle7_tot').style.display = 'none';
		document.getElementById('sub7_rell').style.display = 'none';
	}

	/* PROMO2 ENVOLTURAS */
	if(document.getElementById("caja3_2").value === "readonly") {
		document.getElementById('caja3_2').style.display = 'none';
		document.getElementById('id_env3_2').style.display = 'none';
		document.getElementById('subtot3_2').style.display = 'none';
	}

	if(document.getElementById("caja4_2").value === "readonly") {
		document.getElementById('caja4_2').style.display = 'none';
		document.getElementById('id_env4_2').style.display = 'none';
		document.getElementById('subtot4_2').style.display = 'none';
	}

	if(document.getElementById("caja5_2").value === "readonly") {
		document.getElementById('caja5_2').style.display = 'none';
		document.getElementById('id_env5_2').style.display = 'none';
		document.getElementById('subtot5_2').style.display = 'none';
	}

	if(document.getElementById("caja6_2").value === "readonly") {
		document.getElementById('caja6_2').style.display = 'none';
		document.getElementById('id_env6_2').style.display = 'none';
		document.getElementById('subtot6_2').style.display = 'none';
	}
	if(document.getElementById("caja7_2").value === "readonly") {
		document.getElementById('caja7_2').style.display = 'none';
		document.getElementById('id_env7_2').style.display = 'none';
		document.getElementById('subtot7_2').style.display = 'none';
	}
	/* PROMO2 RELLENOS */
	if(document.getElementById("caja3_2").value === "readonly") {
		document.getElementById('relle3_2').style.display = 'none';
		document.getElementById('relle3_tot2').style.display = 'none';
		document.getElementById('sub3_rell2').style.display = 'none';
	}
	if(document.getElementById("caja4_2").value === "readonly") {
		document.getElementById('relle4_2').style.display = 'none';
		document.getElementById('relle4_tot2').style.display = 'none';
		document.getElementById('sub4_rell2').style.display = 'none';
	}
	if(document.getElementById("caja5_2").value === "readonly") {
		document.getElementById('relle5_2').style.display = 'none';
		document.getElementById('relle5_tot2').style.display = 'none';
		document.getElementById('sub5_rell2').style.display = 'none';
	}
	if(document.getElementById("caja6_2").value === "readonly") {
		document.getElementById('relle6_2').style.display = 'none';
		document.getElementById('relle6_tot2').style.display = 'none';
		document.getElementById('sub6_rell2').style.display = 'none';
	}
	if(document.getElementById("caja7_2").value === "readonly") {
		document.getElementById('relle7_2').style.display = 'none';
		document.getElementById('relle7_tot2').style.display = 'none';
		document.getElementById('sub7_rell2').style.display = 'none';
	}

});
