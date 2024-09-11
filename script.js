document.addEventListener("DOMContentLoaded", ()=> {
    const mostrarTablero = document.getElementById("game-board")
    const mostrarMovimientos = document.getElementById("movements")
    const mostrarTiempoTranscurrido = document.getElementById("timeElapsed")

    const botonIniciarJuego = document.getElementById("startButton")
        //crear arreglo de imagenes 
    const imagenesDeCartas = [
        "imagenes/img-1.png", "imagenes/img-1.png", 
        "imagenes/img-2.png", "imagenes/img-2.png", 
        "imagenes/img-3.png", "imagenes/img-3.png", 
        "imagenes/img-4.png", "imagenes/img-4.png", 
        "imagenes/img-5.png", "imagenes/img-5.png", 
        "imagenes/img-6.png", "imagenes/img-6.png", 
        "imagenes/img-7.png", "imagenes/img-7.png", 
        "imagenes/img-8.png", "imagenes/img-8.png", 
    ]

    let cartas = [...imagenesDeCartas]
    let cartasVolteadas = [];
    let bloqueado = false;
   
    let movimientos = 0;

    let tiempoTranscurrido = 0
    let temporizador; 
    let temporizadorIniciado = false;
    let parejasEncontradas = 0

    let juegoIniciado = false;
    //funcion para crear la carta
    function crearCartas (rutasDeImagen) {
        const carta = document.createElement("div")
        carta.classList.add("card")
        const imagen = document.createElement("img")
        imagen.src = rutasDeImagen
        imagen.style.display = "none"
        carta.appendChild(imagen)

        //funcion para voltear la carta 
        carta.addEventListener("click", ()=> {

            if (!juegoIniciado) {
                alert("Por favor, haz clic en el botón 'Iniciar Juego' para comenzar.");
                return;
            }

            if (bloqueado || imagen.style.display === "block") return;
            imagen.style.display = "block"
            cartasVolteadas.push(imagen)
         //incrementar los movimientos los movimientos 
          movimientos++
          mostrarMovimientos.textContent = movimientos; 
          // Iniciar el temporizador solo si no ha comenzado
            if (!temporizadorIniciado) {
                iniciarTemporizados();
                temporizadorIniciado = true;
            }
            
            if (cartasVolteadas.length === 2) {
                verificarParejas();
            }

        })

        return carta
    }

// función para mezclar las cartas 
function mezclarCartas (arreglo) {
    for (let i = arreglo.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]]
    }
}

// función para verificar si las cartas volteadas son parejas 
 function verificarParejas () {
    bloqueado = true;
    const [carta1, carta2] = cartasVolteadas;
    if (carta1.src === carta2.src) {
        cartasVolteadas = [];
        bloqueado = false;
        parejasEncontradas++;

        if (parejasEncontradas === cartas.length / 2) {
            clearInterval(temporizador)
            temporizadorIniciado = false;
            setTimeout(() => {
                alert("¡Felicidades! Has ganado el juego.")
                
            }, 500) 
        }
    } else {
        setTimeout(()=> {
            carta1.style.display = "none"
            carta2.style.display = "none"
            cartasVolteadas = [];
            bloqueado = false;
        }, 1000)
    } 

 }

 

//funcion para inicializar el tablero 
    function inicializarTablero () {
        mostrarTablero.innerHTML = "";
        mezclarCartas(cartas)
        cartas.forEach((rutasDeImagen) => {
            const carta = crearCartas(rutasDeImagen);
            mostrarTablero.appendChild(carta)
        })
    }

   
   //funcion para iniciar el temporizador 
  function iniciarTemporizados () {
    temporizador = setInterval (() => {
        tiempoTranscurrido++;
        mostrarTiempoTranscurrido.textContent = tiempoTranscurrido 

    }, 1000) 
  }
// Función para manejar el evento de clic del botón "Iniciar Juego"
botonIniciarJuego.addEventListener("click", ()=> {
    juegoIniciado = true;
    movimientos = 0;
    parejasEncontradas = 0;
    tiempoTranscurrido = 0;
    mostrarMovimientos.textContent = movimientos;
    mostrarTiempoTranscurrido.textContent = tiempoTranscurrido;
    clearInterval(temporizador)
    iniciarTemporizados();
    inicializarTablero();
})


    inicializarTablero();

})


