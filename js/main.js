import "../css/style.css";

import Player from "./Player/player";
import DeckCards from "./DeckCards/DeckCards";
// MODELO
let jugadores = [];
let baraja;

// Funciones gestión de creación/Eliminación de jugadores
const onClickAnyadirJugador = () => {
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
  anyadirJugador.style.display = jugadores.length === 3 ? "none" : "block";
};

const colorDuplicado = () => {
  const colorActual = document.querySelector("input[name='color']").value;
  return jugadores.some((jugador) => jugador.getColour() === colorActual);
};

const jugadorDuplicado = () => {
  const nombre = document.querySelector("input[name='nombre']").value;
  return jugadores.some((jugador) => jugador.getPlayer() === nombre);
};

const nombreVacio = () => {
  let nombre = document.querySelector("input[name='nombre']");
  return nombre.value === "";
};

const onClickEliminarJugador = (nombreJugador) => {
  jugadores = jugadores.filter(
    (jugador) => jugador.getPlayer() !== nombreJugador
  );
  pintarJugadores();
};

const crearImagenBorrarJugador = (jugador) => {
  let img = document.createElement("img");
  img.setAttribute("src", "./images/delete.svg");
  img.addEventListener("click", function (event) {
    onClickEliminarJugador(jugador);
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
  celdaOrdenJugador.appendChild(crearImagenBorrarJugador(jugador.getPlayer()));
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
  divCartas.innerHTML = '<img src="./Images/Cards/1Bastos.jpg">';

  let divOpciones = document.createElement("div");
  divOpciones.classList.add("FRow", "jEnd", "flexAll", "aEnd");
  divOpciones.textContent = "OPCIONES";
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

const empezarJuego = () => {
  baraja = new DeckCards();
  baraja.inicializateDeck();
  baraja.suffleCards();
  baraja.printDeckWithWorth();
};

const onClickJugar = () => {
  if (jugadores.length < 1) {
    alert(`Faltan jugadores ${jugadores.length}`);
  } else {
    pintarMesa();
    empezarJuego();
  }
};

// Tratamiento de eventos
let anyadirJugador = document.querySelector("img[src='../images/plus.svg']");
let botononClickJugar = document.querySelector("#Jugar");
let formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  onClickAnyadirJugador();
});

botononClickJugar.addEventListener("click", onClickJugar);
anyadirJugador.addEventListener("click", onClickAnyadirJugador);
