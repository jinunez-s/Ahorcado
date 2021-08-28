var canvas = document.getElementById('fondo');
var lapiz = canvas.getContext('2d');
var btnIntentar = document.getElementById('btn-intentar');
var letra = document.getElementById('txt-intentos');
var palabraAdivinar = document.getElementById('lbl-palabra');
var palabraAuxiliar = '';
var respuesta = validar(intento);
var lblIntentos = document.getElementById('lbl-intentos');

/**
 * Las propiedades descritas como canvas, lapiz btnIntentar no hacen refencia
 * al html, son variable creadas en el jsn que obtienen valores del html por 
 * medio de las etiquetas 
 */
var palabra = '';
var numeroImagen = 0;
var intentos = 5;
var contador = 5;
/**
 * Se coloca 5 intentos porque unicamente tenemos 5 imagenes
 */
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
var ahorcadoUno = {
    url:'./assets/img/1.png',
    imagen: Image
}
var ahorcadoDos = {
    url:'./assets/img/2.png',
    imagen: Image
}
/*La propiedad imagen es de tipo objeto Image*/
/**
 * se hace referencia a la imagen que se encuentra en assets de manera manual
 */
var ahorcadoTres = {
    url:'./assets/img/3.png',
    imagen: Image
}
var ahorcadoCuatro = {
    url:'./assets/img/4.png',
    imagen: Image
}
var ahorcadoCinco = {
    url:'./assets/img/5.png',
    imagen: Image
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
ahorcadoUno.imagen = new Image();
ahorcadoUno.imagen.src = ahorcadoUno.url;
ahorcadoUno.imagen.addEventListener('load', function(){dibujar()});

ahorcadoDos.imagen = new Image();
ahorcadoDos.imagen.src = ahorcadoDos.url;
ahorcadoUno.imagen.addEventListener('load', function(){dibujar()});

ahorcadoTres.imagen = new Image();
ahorcadoTres.imagen.src = ahorcadoTres.url;
ahorcadoTres.imagen.addEventListener('load', function(){dibujar()});


ahorcadoCuatro.imagen = new Image();
ahorcadoCuatro.imagen.src = ahorcadoCuatro.url;
ahorcadoCuatro.imagen.addEventListener('load', function(){dibujar()});

ahorcadoCinco.imagen = new Image();
ahorcadoCinco.imagen.src = ahorcadoCinco.url;
ahorcadoCinco.imagen.addEventListener('load', function(){dibujar()});

/**---------------------------------------------------------------------------------------------------------------------------------------------- */
btnIntentar.addEventListener('click', function(){
    var intento = letra.value;
    var respuesta = validar(intento);
    var transicion = '';
    
    for(i =0; i< palabraAuxiliar.length; i++){
        if(palabraAuxiliar.substring(i,i+1) === '#'){
            if(palabraAuxiliar.substring(i,i+1) === respuesta.substring(i,i+1)){
                transicion = transicion + palabraAuxiliar.substring(i,i+1);
                /**Aqui pasa por cada letra */
            }else{
                transicion = transicion + respuesta.substring(i,i+1);
                /**Aqui cuenta cuantos correctos hay */
            }
        }else{
            transicion = transicion + palabraAuxiliar.substring(i,i+1);
            /**Aqui cuenta cuantas ya se adivinaron */
        }   /**Aqui pasa por cada letra */
    }
    /*
    if( palabraAuxiliar === transicion){
        contador = contador - 1;
        if( contador === 0 ){
            canvas.drawImage(ahorcadoCinco.url);

            alert('Lo siento, has perdido!');
            location.reload();
        }
        if( contador > 1){
            alert('Te quedan ' +  contador  + ' intentos.');
        }
        if(contador === 1 ){
            alert('Te quedan ' +  contador  + ' intento.');
        }
    }
    */
    if(transicion === palabra){
        alert('felicidades!!! has ganado');
        location.reload();
    }else{
        if(ValidarRespuesta(respuesta) === true){
            intentos = intentos -1;
            numeroImagen = numeroImagen + 1;
            dibujar();
            if(intentos === 0){
                alert('Ahorcado!! has perdido el juego!')
                location.reload();
            }else{
                numeroImagen = numeroImagen + 1;
                dibujar();
                lblIntentos.innerHTML = `<span class="badge bg-danger">${intentos}</span>`;
            }
        }else{
            palabraAuxiliar = transicion;
            palabraAdivinar.innerHTML = palabraAuxiliar;     
        }
    }
});
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
function dibujar(){
    if(numeroImagen == 1){
        lapiz.drawImage(ahorcadoUno.imagen, -250,-20);
        }else if(numeroImagen == 2){
            lapiz.drawImage(ahorcadoDos.imagen, -250,-20);
        }else if(numeroImagen == 3){
            lapiz.drawImage(ahorcadoTres.imagen, -250,-20);
        }else if(numeroImagen == 4){
            lapiz.drawImage(ahorcadoCuatro.imagen, -250,-20);
        }else if(numeroImagen == 5){
            lapiz.drawImage(ahorcadoCinco.imagen, -250,-20);
            alert('Ahorcado!! has perdido en el juego ;(')
        }
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
function ValidarRespuesta(cadena){
    var resultado = false;
    for(var i = 0; i < cadena.length; i++){
        if(cadena.substring(i, i+1) != '#'){
            resultado = true;
            break;
        }
    }
    return resultado;
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
    /** 
     * alert(obtenerPalabraAdivinar(aleatorio(1,5))); 
     * alert('${Math.floor(Math.random() * (5-1+1)))}');
     *  alert('${Math.floor(Math.random() * (5-1+1)) + 1 )}')');
    */
    /**palabraAdivinar.innerHTML = letra.value;
    alert(letra.value);*/

function aleatorio(minimo, maximo){
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
function obtenerPalabraAdivinar(numero){
    var fruta = '';
    switch(numero){
        case 1:
            fruta = 'manzana';
            break;
        case 2:
            fruta = 'pera';
            break;
        case 3:
            fruta = 'mandarina';
            break;
        case 4:
            fruta = 'papaya';
            break;
        case 5:
            fruta = 'sandia';
            break;
    }
    return fruta;
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
function codificarPalabra(palabra){
    var respuesta = '';
    for(i = 0; i < palabra.length; i++){
        if(palabra.substring(i,i+1) != '#'){
            respuesta = respuesta + '#';
        }
    }
    return respuesta;
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */

function validar(letra){
    var respuesta = '';
    for(i = 0; i < palabra.length; i++){
        if(letra === palabra.substring(i,i+1)){
            respuesta = respuesta + letra;  

        }else{
            respuesta = respuesta + '#';
        }
    }
    
    return respuesta;
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
function iniciar(){
    palabra = obtenerPalabraAdivinar(aleatorio(1,5));
    palabraAuxiliar = codificarPalabra(palabra);
    palabraAdivinar.innerHTML = palabraAuxiliar;
}
/**---------------------------------------------------------------------------------------------------------------------------------------------- */
iniciar();

/**Jquery funciones para que busque todos los elementos con la clase, id */
$(function(){
    $('#asterisco').click(function(){
        $('*').addClass('selector');
    });
    $('#numeral-correo').click(function(){
        $('#correo').addClass('selector');
    })
    $('#campo').click(function(){
        $('.campo').addClass('selector');
    });
    $('#div').click(function(){
        $('div').addClass('selector')
    });
    $('#parrafo').click(function(){
        $('p').addClass('selector')
    });
    $('#input').click(function(){
        $('input').addClass('selector')
    });
});

