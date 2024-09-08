document.addEventListener("DOMContentLoaded", () => {
    const mostrarTablero = document.getElementById("game-board")
    const botonIniciarJuego = document.getElementById("startButton")
    const contadorMovimientos = document.getElementById("movements");
    const contadorTiempo = document.getElementById("timeElapsed");
    //crear arreglo de imagenes 
    const imagenesDeCartas = [
        'imagenes/img-1.png', 'imagenes/img-1.png',
        'imagenes/img-2.png', 'imagenes/img-2.png',
        'imagenes/img-3.png', 'imagenes/img-3.png',
        'imagenes/img-4.png', 'imagenes/img-4.png',
        'imagenes/img-5.png', 'imagenes/img-5.png',
        'imagenes/img-6.png', 'imagenes/img-6.png',
        'imagenes/img-7.png', 'imagenes/img-7.png',
        'imagenes/img-8.png', 'imagenes/img-8.png',
    ];

    let cartas = [...imagenesDeCartas]
    let cartasVolteadas = [];
    let bloqueado = false;
    let parejasEncontradas = 0;
    // Variable para controlar el estado del juego
    let juegoIniciado = false
    let movimientos = 0;
    let tiempoTranscurrido = 0;
    let temporizador; // Para almacenar el temporizador

        // funcion para mezclar las cartas 
        function mezclarCartas(arreglo) {
            for (let i = arreglo.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio
                [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]]; // Intercambia las cartas
            }
        }
    
    //Función para crear la carta
    function crearCarta (rutaDeImagen) {
        const card = document.createElement("div")
        card.className = "card"
        const imagen = document.createElement("img")
        imagen.src = rutaDeImagen;
        imagen.style.display = "none"
        card.appendChild(imagen)

        //funcion para voltear la carta 
        card.addEventListener("click", () => {
            if (!juegoIniciado) {
               alert("Por favor, haz clic en el botón 'Iniciar Juego' para comenzar.")
               return; 
            }
            // No hace nada si está bloqueado o ya está visible
            if(bloqueado || imagen.style.display === "block") return;
            imagen.style.display = "block"
            cartasVolteadas.push({card, imagen})

            movimientos++; // Incrementar movimientos
            contadorMovimientos.textContent = movimientos; // Actualizar en el DOM

        // si hacemos click sobre dos imagenes entonces activamos a 
        //funcion para verificar si son parejas o no    
            if (cartasVolteadas.length === 2) {
                verificarParejas();
            } 
        })
        return card;
    }


    //funcion para verificar si las cartas volteadas son parejas 
    function verificarParejas () {
        // Bloquea clics adicionales mientras se verifica
        bloqueado = true;
        
        const [carta1, carta2] = cartasVolteadas;
        if (carta1.imagen.src === carta2.imagen.src) {
            // Las cartas coinciden, mantenerlas visibles
            cartasVolteadas = [];
            // Incrementa el contador de parejas encontradas
            parejasEncontradas++
            //nuevamente bloqueamos los clicks 
            bloqueado = false

        // Verifica si se han encontrado todas las parejas en todo nuestro
        //arreglo
        //se verifica si este contador es igual a la mitad del total de cartas 
        //(cartas.length / 2). Si es así, significa que todas las parejas han sido encontradas.
        if (parejasEncontradas === cartas.length / 2) {
            clearInterval(temporizador) // Detener el temporizador al ganar
            setTimeout(() => {
                alert("¡Felicidades! Has ganado el juego."); // Muestra la alerta después de un breve retraso
            }, 500); // Espera 0.5 segundos antes de mostrar la alerta
        }

        } else {
            // Las cartas no coinciden, ocultarlas después de un breve tiempo
            setTimeout(()=> {
                carta1.imagen.style.display = "none";
                carta2.imagen.style.display = "none";
                cartasVolteadas = []
                bloqueado = false;
               //esperamos un segundos para ocultar las cartas 
            }, 1000) 
        }
    }

    //funcion para inicializar el tablero 
    function inicializarElTablero () {
        mostrarTablero.innerHTML = "";
        mezclarCartas(cartas)
        cartas.forEach((rutaDeImagen) => {
            const carta = crearCarta(rutaDeImagen)
            mostrarTablero.appendChild(carta)
        })
    }

    function iniciarTemporizador() {
        temporizador = setInterval(() => {
            tiempoTranscurrido++;
            contadorTiempo.textContent = tiempoTranscurrido; // Actualizar tiempo en el DOM
        }, 1000); // Incrementa cada segundo
    }

    // Función para manejar el evento de clic del botón "Iniciar Juego"
    botonIniciarJuego.addEventListener("click", () => {
        juegoIniciado = true; // Cambia el estado del juego a iniciado
        movimientos = 0; // Reinicia el contador de movimientos
        tiempoTranscurrido = 0; // Reinicia el tiempo
        parejasEncontradas = 0; // Reinicia el contador de parejas encontradas
        contadorMovimientos.textContent = movimientos; // Actualiza movimientos en el DOM
        contadorTiempo.textContent = tiempoTranscurrido; // Actualiza tiempo en el DOM
        clearInterval(temporizador); // Detener cualquier temporizador previo
        iniciarTemporizador(); // Inicia el temporizador
        inicializarElTablero(); // Inicializa el tablero

    })

    inicializarElTablero();
})