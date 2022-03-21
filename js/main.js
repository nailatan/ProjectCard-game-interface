import "../css/style.css";

import Player from "./Player/player";

// MODELO
let jugadores = [];

// Funciones gestión de creación/Eliminación de jugadores
const anyadirNuevoJugador = () => {
  if (jugadores.length >= 3) {
    alert("Se han alcanzado el máximo de jugadores");
  } else if (nombreVacio()) {
    alert("Falta el nombre del jugador");
  } else if (jugadorDuplicado()) {
    alert("Existe otro jugador con el mismo nombre");
  } else if (colorDuplicado()) {
    alert("Existe otro jugador con el mismo color");
  } else {
    crearJugador();
    pintarJugadores();
  }
};

const maximoJugadores = () => {
  let anyadirJugador = document.querySelector("img[src='../images/plus.svg']");

  if (jugadores.length === 3) {
    anyadirJugador.style.display = "none";
  } else {
    anyadirJugador.style.display = "block";
  }
};

const colorDuplicado = () => {
  let nombre = document.querySelector("input[name='color']");
  let tablaJugadores = document.querySelector("tbody");
  for (let i = 0; i < jugadores.length; i++) {
    if (nombre.value === jugadores[i].getColour()) {
      return true;
    }
  }
  return false;
};

const jugadorDuplicado = () => {
  let nombre = document.querySelector("input[name='nombre']");
  let tablaJugadores = document.querySelector("tbody");

  for (let i = 0; i < jugadores.length; i++) {
    if (nombre.value === jugadores[i].getPlayer()) {
      return true;
    }
  }
  return false;
};

const nombreVacio = () => {
  let nombre = document.querySelector("input[name='nombre']");
  return nombre.value === "";
};

const eliminarJugador = (nombreJugador) => {
  jugadores = jugadores.filter(
    (jugador) => jugador.getPlayer() !== nombreJugador
  );
  pintarJugadores();
};

const crearImagenEliminarJugador = (jugador) => {
  let img = document.createElement("img");
  img.setAttribute("src", "./images/delete.svg");
  img.addEventListener("click", function (event) {
    eliminarJugador(jugador);
  });
  return img;
};

const generarNuevoColor = () => {
  let simbolos = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color = color + simbolos[Math.floor(Math.random() * 16)];
  }
  return color;
};

const crearJugador = () => {
  let nombre = document.querySelector("input[name='nombre']");
  let color = document.querySelector("input[name='color']");

  let jugador = new Player(nombre.value, color.value, false);
  jugadores.push(jugador);
  nombre.value = "";
  color.value = generarNuevoColor();
};

const pintarUnJugador = (jugador) => {
  let filaJugador = document.createElement("tr");
  let celdaOrdenJugador = document.createElement("td");
  let celdaNombreJugador = document.createElement("td");
  let celdaColorJugador = document.createElement("td");
  celdaOrdenJugador.appendChild(
    crearImagenEliminarJugador(jugador.getPlayer())
  );
  celdaNombreJugador.innerText = jugador.getPlayer();
  celdaColorJugador.innerText = jugador.getColour();
  celdaColorJugador.style.backgroundColor = celdaColorJugador.innerText;
  celdaColorJugador.style.color = celdaColorJugador.innerText;
  celdaColorJugador.style.margin = ".4rem";
  filaJugador.appendChild(celdaOrdenJugador);
  filaJugador.appendChild(celdaNombreJugador);
  filaJugador.appendChild(celdaColorJugador);

  return filaJugador;
};

const pintarJugadores = () => {
  let tablaJugadores = document.querySelector("tbody");

  const eliminarTodosJugadores = () => {
    let tablaJugadores = document.querySelector("tbody");
    tablaJugadores.textContent = "";
  };

  eliminarTodosJugadores();
  jugadores.map((jugador) => {
    tablaJugadores.appendChild(pintarUnJugador(jugador));
  });
  maximoJugadores();
};

const deshabilitarEntradaJugadores = () => {
  let divEntradaJugadores = document.querySelector("#nuevoJugador");
  divEntradaJugadores.style.display = "none";
};

const habilitaMesaJuego = () => {
  let divMesaJuego = document.querySelector("#juego");
  divMesaJuego.classList.remove("noVisible");
  divMesaJuego.classList.add("FColumn");
};

const pintarMesaJugador = (jugador) => {
  let divMesaJugador = document.createElement("div");
  divMesaJugador.classList.add("mesaJugador", "FColumn");

  let divNombreJugador = document.createElement("div");
  divNombreJugador.classList.add("FRow", "jCenter");

  let h2NombreJugador = document.createElement("h2");
  h2NombreJugador.textContent = jugador.getPlayer();
  h2NombreJugador.setAttribute("style", `color: ${jugador.getColour()}`);

  let divCartasJugador = document.createElement("div");
  divCartasJugador.classList.add("fColumn", "flexAll");

  let divCartas = document.createElement("div");
  divCartas.textContent = "CARTAS";

  let divOpciones = document.createElement("div");
  divOpciones.classList.add("FRow", "jEnd", "flexAll", "aEnd");

  divNombreJugador.appendChild(h2NombreJugador);

  divCartasJugador.appendChild(divCartas);
  divCartasJugador.appendChild(divOpciones);

  divMesaJugador.appendChild(divNombreJugador);
  divMesaJugador.appendChild(divCartasJugador);

  return divMesaJugador;
};

const pintarMesa = () => {
  deshabilitarEntradaJugadores();
  habilitaMesaJuego();

  let divJugadores = document.getElementById("jugadores");
  divJugadores.textContent = "";

  jugadores.map((jugador) =>
    divJugadores.appendChild(pintarMesaJugador(jugador))
  );
};

const jugar = () => {
  if (jugadores.length < 1) {
    alert(`Faltan jugadores ${jugadores.length}`);
  } else {
    pintarMesa();
  }
};

// Tratamiento de eventos
let anyadirJugador = document.querySelector("img[src='../images/plus.svg']");
let botonJugar = document.querySelector("#Jugar");
let formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  anyadirNuevoJugador();
});

botonJugar.addEventListener("click", jugar);
anyadirJugador.addEventListener("click", anyadirNuevoJugador);
