function empezarJuego() {
    const contenedorPreguntas = document.querySelector('.contenedorPreguntas');
    contenedorPreguntas.style.opacity = '1';
    contenedorPreguntas.style.pointerEvents = 'auto'; 
    mostrarPreguntas(0);
    contadorDePreguntas(1);
    iniciarTiempo(valorTiempo);
    iniciarTiempoLinea(0);
}

let preguntas = [
    {
        numero: 1,
        pregunta: "¿Qué bloque genera luz natural?",
        respuesta: "Piedra luminosa",
        opcionesRespuestas: [
            "Tolva",
            "Piedra luminosa",
            "Observador"
        ]
    },
    {
        numero: 2,
        pregunta: "¿Qué es la Redstone?",
        respuesta: "Un mineral para crear circuitos y mecanismos",
        opcionesRespuestas: [
            "Un mineral para crear herramientas",
            "Un nuevo tipo de madera de color rojo",
            "Un mineral para crear circuitos y mecanismos"
        ]
    },
    {
        numero: 3,
        pregunta: "¿Cómo se activa un pistón?",
        respuesta: "Con una señal de Redstone",
        opcionesRespuestas: [
            "Con una señal de Redstone",
            "Con una cubeta de agua",
            "Con mucha madera de abeto"
        ]
    },
    {
        numero: 4,
        pregunta: "¿Para qué sirve una tolva?",
        respuesta: "Transportar ítems",
        opcionesRespuestas: [
            "Clonar ítems",
            "Transportar ítems",
            "Quemar ítems"
        ]
    },
    {
        numero: 5,
        pregunta: "¿Cuántos ticks hay en un segundo en Minecraft?",
        respuesta: "20 ticks en un segundo",
        opcionesRespuestas: [
            "2 ticks en un segundo",
            "20 ticks en un segundo",
            "60 ticks en un segundo"
        ]
    }    

];

let numeroPregunta = 0;
let numero = 1;
let contadorSegundos;
let contadorLinea;
let valorTiempo = 60;
let anchoLinea = 0;
let puntuacion = 0;

function iniciarTiempo(tiempo){
    const contenedorPreguntas = document.querySelector('.contenedorPreguntas');
    const contadorDeTiempo = contenedorPreguntas.querySelector(".contador .contadorTiempo");
    contadorSegundos = setInterval(timer, 1000);
    function timer(){
        contadorDeTiempo.textContent = tiempo + 's';
        tiempo--;
        if(tiempo < 0){
            bandera = true;
            clearInterval(contadorDeTiempo);
            contadorDeTiempo.textContent = "0" + 's'; 
            const listaOpciones = document.querySelector(".listaRespuestas");
            let todasOpciones = listaOpciones.children;
            for (let i = 0; i < todasOpciones.length; i++) {
                todasOpciones[i].classList.add("deshabilitar");       
            }
            alert('¡Se ha agotado el tiempo!'); 

            clearInterval(contadorSegundos);
            clearInterval(contadorLinea);
            mostrarResultadoFinal();

        }
        
    }
}

function iniciarTiempoLinea(tiempo){
    const contenedorPreguntas = document.querySelector('.contenedorPreguntas');
    const lineaDeTiempo = contenedorPreguntas.querySelector("header .lineaTiempo");
    contadorLinea = setInterval(timer, 110);
    function timer(){
        tiempo += 1;
        lineaDeTiempo.style.width = tiempo + "px";
        if(tiempo > 549){
            clearInterval(contadorLinea);

        }
    }
}


function siguientePregunta(){
    if(numeroPregunta < preguntas.length - 1){
        numeroPregunta++;
        numero++;
        mostrarPreguntas(numeroPregunta);
        contadorDePreguntas(numero);       
    } else {
        console.log("Preguntas Completadas");
        clearInterval(contadorSegundos);
        clearInterval(contadorLinea);
        mostrarResultadoFinal();
    }
}

function mostrarPreguntas(index) {
    const textoPregunta = document.querySelector("#pregunta");
    const listaOpciones = document.querySelector(".listaRespuestas");
    const preguntaActual = preguntas[index];

    let etiquetaPregunta = '<label>' + preguntaActual.numero + '. '+preguntaActual.pregunta + '</label>';
    textoPregunta.innerHTML = etiquetaPregunta;

    listaOpciones.innerHTML = "";
    preguntaActual.opcionesRespuestas.forEach((opcion, i) => {
        let etiquetaRespuesta = '<label><input type="radio" name="r1" value="' + opcion + '">' + ' ' + opcion + '</label>';
        let divRespuesta = document.createElement("div");
        divRespuesta.classList.add("respuesta");
        divRespuesta.innerHTML = etiquetaRespuesta;
        listaOpciones.appendChild(divRespuesta);
    });
    const listaDeOpciones = document.querySelector('.listaRespuestas');
    const opcionAnalizar = listaDeOpciones.querySelectorAll('.respuesta');
    
    for (let i = 0; i < opcionAnalizar.length; i++) {
        opcionAnalizar[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


function optionSelected(respuesta){
    const preguntaActual = preguntas[numeroPregunta];
    let respuestaSeleccionada = respuesta.textContent.trim().toLowerCase();
    let respuestaCorrecta = preguntaActual.respuesta.trim().toLowerCase();
    const listaOpciones = document.querySelector(".listaRespuestas");
    let todasOpciones = listaOpciones.children;
    if(respuestaSeleccionada == respuestaCorrecta){
        respuesta.classList.add("correcta")
        puntuacion += 1;
        console.log(puntuacion);
        console.log("Respuesta Correcta");
    } else{
        respuesta.classList.add("incorrecta")
        console.log("Respuesta Incorrecta");
        for (let i = 0; i < todasOpciones.length; i++) {
            todasOpciones[i].classList.add("deshabilitar");       
        }
    }


    for (let i = 0; i < todasOpciones.length; i++) {
        todasOpciones[i].classList.add("deshabilitar");       
    }
}

function contadorDePreguntas(index){
    const contenedorPreguntas = document.querySelector('.contenedorPreguntas');
    const contadorPreguntas = contenedorPreguntas.querySelector('.cantidadPreguntas');
    let totalPreguntas = '<span><p>'+ index + '</p>de<p>'+ preguntas.length +'</p>Preguntas</span>'
    contadorPreguntas.innerHTML = totalPreguntas;
}

function mostrarResultadoFinal(){
    const verResultado = document.querySelector(".resultado");
    const contenedorPreguntas = document.querySelector('.contenedorPreguntas');
    contenedorPreguntas.style.opacity = '0';
    const verBotonInicio = document.querySelector(".botonInicio")
    verBotonInicio.classList.add("verBoton");

    if (puntuacion == 3) {
        const verCertificado = document.querySelector(".certificado2 img");
        verCertificado.classList.add("verCertificado");
    } else if(puntuacion == 4){
        const verCertificado = document.querySelector(".certificado3 img");
        verCertificado.classList.add("verCertificado");
    } else if(puntuacion == 5){
        const verCertificado = document.querySelector(".certificado1 img");
        verCertificado.classList.add("verCertificado");
    } else if(puntuacion < 3){
        verResultado.classList.add("mostrarResultado");
        const textoPuntuacion = verResultado.querySelector(".punteoFinal");
        let punteo = '<span>No lograste el 60%</span>' + '<span>Preguntas Correctas: <p>' + puntuacion + '</p> de <p>' + 
                     preguntas.length +  '</p></span>' + '<span>¡Vuelve a Intentarlo!</span>';
        textoPuntuacion.innerHTML = punteo;
    }
}