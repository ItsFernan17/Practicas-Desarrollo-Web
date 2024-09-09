const apiKey = "0b13a37a8a09983a002c050505307772"; //Key de la API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //URL de la API
const iconoDelClima = document.getElementById("iconoClima");

const consultar = async(ciudad)=> { //Función flecha async la cual resive el parametro de la ciudad a consultar
    try {
        const respuesta = await fetch(apiUrl + ciudad + `&appid=${apiKey}&lang=es` );
        //La constante respuesta hace una peticion HTTP fetch a la API para consultar el clima de una Ciudad/País 
        //Con await espera la respuesta antes de continuar con la ejecución del resto del código

        if(respuesta.status == 404){ //Verificación de una Ciudad o País Válido
            document.querySelector(".ciudadNoEncontrada").style.display = "block"; //Muestra el mensaje de error
            document.querySelector(".clima").style.display = "none"; //Oculta la información del clima
        } else if(respuesta.status == 502 || respuesta.status == 504){
            document.querySelector(".ciudadNoEncontrada").innerHTML = "Problemas de Red"
            document.querySelector(".ciudadNoEncontrada").style.display = "block"; //Muestra el mensaje de error
            document.querySelector(".clima").style.display = "none"; //Oculta la información del clima
        }
            else{ //Si la Ciudad/País es Válido obtiene toda la información del clima
            var datos = await respuesta.json();
            //En la variable datos almacena la respuesta HTTP JSON en un objeto de JavaScript
            console.log(datos);
    
            document.getElementById("ciudad").innerHTML = datos.name; //Coloca el nombre de la Ciudad/País 
            document.getElementById("temperatura").innerHTML = Math.round(datos.main.temp) + "°C"; //Coloca la temperatura
            document.getElementById("textoHumedad").innerHTML = datos.main.humidity + "%"; //Coloca el porcentaje de humedad
            document.getElementById("textoViento").innerHTML = datos.wind.speed + " km/h"; //Coloca la velocidad del viento
    
            if(datos.weather[0].main == "Clouds"){ // Cóndicones las cuales verifica como esta el clima y coloca el icono
                iconoDelClima.src = "nubes.png"
            } else if(datos.weather[0].main == "Clear"){
                iconoDelClima.src = "despejado.png"
            } else if(datos.weather[0].main == "Rain"){
                iconoDelClima.src = "lluvia.png"
            } else if(datos.weather[0].main == "Drizzle"){
                iconoDelClima.src = "llovizna.png"
            } else if(datos.weather[0].main == "Mist"){
                iconoDelClima.src = "neblina.png"
            }
    
            document.querySelector(".clima").style.display = "block"; //Muestra la información del clima
            document.querySelector(".ciudadNoEncontrada").style.display = "none"; //Oculta el mensaje de error
        }
        
    } catch (error) {
        console.log(error)
    }
}

const boton = document.getElementById("boton");
const ciudadBuscar = document.querySelector(".busqueda input");

boton.addEventListener("click", ()=> { //Crea un evento Listener Click con una función flecha
    consultar(ciudadBuscar.value); //Llama a la funcion consultar y le manda como parametro la Ciudad/País a buscar
})