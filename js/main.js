
var frutas=[];
var puntaje = 0;
var habilitarBotonSiguiente = false;
const PREGUNTA_UNO= 1;
const PREGUNTA_TRES= 3;

$(document).ready(function(){

var au = $('<audio src="audio/intro.mp3" autoplay type="audio/mpeg" loop="true"></audio>');
$("body").append(au); 

$.ajax({
    dataType: "json",
    async: false, 
    url: "js/frutas.json",
    'success': function (json) {
        jsonVar=json;
        jsonText= JSON.stringify(jsonVar);
        frutas= json.frutas;      
    }
});

// var frutas = [ {nombre:"cereza.png",id:"cereza"},{nombre:"guineo.png",id:"guineo"},{nombre:"manzana.png",
//         id:"manzana"}];    

    $.each(frutas, function(key, fruta) {
    var enlaceFrutas = $('<a href="#" ><img src="images/FRUTAS/'+fruta.nombre +'" id="'+fruta.id+'" class="img-fluid frutas"></a>')      
    $("#containerFrutas").append(enlaceFrutas);   
    });


//Creación de clases
class Frutas {  
    constructor(color, forma) {
        this.color = color;
        this.forma= forma;        
    }
  }

let obj= new Frutas("rojo","redondeada");
console.log(obj);
console.log(frutas);


    $("#colorP1").css({"color": "red"});
    $("#colorP2").css({"color": "#f4bc0f"});
    $("#colorP3").css({"color": "red"});

  
var frutasRepasadas= [false, false, false];
var contadorFrutas=0;

    $(".frutas").click(function(){ 

        if($(this).attr("id")=="guineo"){ 
            $(this).hide();                                    
            aprenderOptimizado("guineo");                   
            frutasRepasadas[0]==true;  
            contadorFrutas++;                     

        }else if($(this).attr("id")=="cereza"){                           
            $(this).hide();        
            aprenderOptimizado("cereza");                         
            frutasRepasadas[1]==true; 
            contadorFrutas++;     
             
        }else if($(this).attr("id")=="manzana"){
            aprenderOptimizado("manzana");           
            $(this).hide(); 
            frutasRepasadas[2]==true;  
            contadorFrutas++;      
            }
      
          if((frutasRepasadas.length)==contadorFrutas){                        
            $("#canasta").show();  
            $("#btnEvaluar").show();    
          }        
          
    });            



function aprenderOptimizado(tipoFruta){   
 
    var au = $('<audio src="audio/'+tipoFruta+'.mp3" autoplay type="audio/mpeg"></audio>');            
    $("body").append(au); 


  $("#colgante").attr("src","images/FRUTAS/"+tipoFruta+"Info.png");    
    $("#colgante").css({"display": "block"});

   setTimeout(function() {
        $("#colgante").css({"display": "none"});         
     }, 10000); 

  } 

     $("#btnIniciar").click(function(){    
        aparecerPopupInstruc();      
        $("#tituloIntro").fadeOut();            
        $("#seccionIntro").fadeOut();   
        $("#seccionAprendizaje").fadeIn();      
     });      

}); 
      
//SECCIÓN DE EVALUACIÓN

EvaluarPregunta();

function EvaluarPregunta(){
    for (var preguntaNumero = PREGUNTA_UNO ; preguntaNumero<=PREGUNTA_TRES; preguntaNumero++){ 

		$("#seccionPreg"+preguntaNumero).each(function(index) {                               
			var frutaOk=$("#btnRespuestaOk_Pregunta"+preguntaNumero);
			var frutaErr1=$("#btnRespuestaErr1_Pregunta"+preguntaNumero);
			var frutaErr12=$("#btnRespuestaErr2_Pregunta"+preguntaNumero);          
			VerificarRespuestaCorrecta(frutaOk, preguntaNumero);
			VerificarPrimeraRespuestaErronea(frutaErr1, preguntaNumero);
            VerificarSegundaRespuestaErronea(frutaErr12, preguntaNumero);       
       });
    }
}

function VerificarRespuestaCorrecta(frutaOk, preguntaNumero){
	
		if (frutaOk==$("#btnRespuestaOk_Pregunta"+preguntaNumero).on({   
			click: function(){                 
					$(this).addClass("btn-success");         
                setTimeout(function() {
                    var au = $('<audio src="../audio/ganador.mp3" autoplay type="audio/mpeg"></audio>'); 
                    $("body").append(au);
                }, 400);          

                    $("#btnRespuestaErr1_Pregunta"+preguntaNumero).prop("disabled", true);                  
                    $("#btnRespuestaErr2_Pregunta"+preguntaNumero).prop("disabled", true);  
                    $("#btnRespuestaOk_Pregunta"+preguntaNumero).prop("disabled", true);                  
					puntaje+=5;    
                    $("#puntaje").html("" + puntaje);   
                    habilitarBotonSiguiente = true;                      
				}  
		    })
		   ){
		   };
}

function VerificarPrimeraRespuestaErronea(frutaErr1, preguntaNumero){
	
	if(frutaErr1==$("#btnRespuestaErr1_Pregunta"+preguntaNumero).on({   
			click: function(){
                $(this).addClass("btn-danger");  
                    puntaje-=2;
                    setTimeout(function() {  
		      	    $("#btnRespuestaErr1_Pregunta"+preguntaNumero).prop("disabled", true);       
                    $("#puntaje").html("" + puntaje);
                    habilitarBotonSiguiente = false;
                    var au = $('<audio src="../audio/oh_no.mp3" autoplay type="audio/mpeg"></audio>'); 
                    $("body").append(au);
                }, 400);
	               }
		 })
	   )
	   {
	   }
}

function VerificarSegundaRespuestaErronea(frutaErr12, preguntaNumero){
	if(frutaErr12==$("#btnRespuestaErr2_Pregunta"+preguntaNumero).on({   
			click: function(){
            $(this).addClass("btn-danger");  
            puntaje-=2; 
            setTimeout(function() {      
			$("#btnRespuestaErr2_Pregunta"+preguntaNumero).prop("disabled", true);    
			$("#puntaje").html("" + puntaje);
            habilitarBotonSiguiente = false;
            var au = $('<audio src="../audio/oh_no.mp3" autoplay type="audio/mpeg"></audio>'); 
            $("body").append(au);
        }, 400);
		  }
       })
	  ){
	  }
}

var contadorDePregunta = 1;

  $("#btnSiguientePregunta").on({   
    click: function(){
		if (habilitarBotonSiguiente){			
			habilitarBotonSiguiente = false;			
            ocultarOMostrarSeccionPregunta();             
        }
     }
  });

  function ocultarOMostrarSeccionPregunta(){
    var numeroDePreguntaSiguiente = contadorDePregunta+1;    
    if(contadorDePregunta == PREGUNTA_TRES) {
        $("#seccionPreg"+ contadorDePregunta).show();
        aparecerPopupWinner();       
    } 
    else{
      $("#seccionPreg"+contadorDePregunta).hide();
      $("#seccionPreg"+numeroDePreguntaSiguiente).show();
      contadorDePregunta++;
    }

}

          
function aparecerPopupInstruc(){
    var au = $('<audio src="audio/instrucciones.mp3" autoplay type="audio/mpeg"></audio>');
    $("body").append(au);  
    var mpopup = $('#instrucmpopupBox');//Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show();//Muestra el pop up
    $(".close").on('click',function(){//Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
        var au = $('<audio src="audio/aprendizaje.mp3" autoplay type="audio/mpeg"></audio>');
        $("body").append(au);  
       
    });

    $(window).on('click', function(e) {//Al dar click fuera de la pantalla, se escondera el pop up
        if(e.target == mpopup[0]){//Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
            mpopup.hide();//Se esconde el pop up
            var au = $('<audio src="audio/aprendizaje.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);    
       
        }
    });        
        
}
    
function aparecerPopupWinner(){
    var au = $('<audio src="../audio/felicidades.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);       
       $('#conPuntaje').html("HAS RECOPILADO "+puntaje+" PUNTOS");
    var mpopup = $('#popwinner');//Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show();//Muestra el pop up
    $(".close").on('click',function(){//Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
       /*  location.reload(); //me retorna al indice */
        
     });
    
    $(window).on('click', function(e) {//Al dar click fuera de la pantalla, se escondera el pop up
        if(e.target == mpopup[0]){//Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
        mpopup.hide();//Se esconde el pop up 
        $("#seccionEvaluacion").fadeOut();     
        $("#despedida").fadeIn(); 
        var au = $('<audio src="../audio/despedida.mp3" autoplay type="audio/mpeg"></audio>');
        $("body").append(au);       
        }
    });
}
