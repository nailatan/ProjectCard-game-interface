import "../css/style.css";

import Player from "./Player/player";
import DeckCards from "./DeckCards/DeckCards";
import {
  pintarJugadores,
  pintarMesa,
  repintarMesa,
  repintarMesaJugador,
} from "./interface/render";

// MODELO
let jugadores = [];
let jugadorBanca = new Player("Banca", "#aaaaaa", true);
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
    pintarJugadores(jugadores);
  }
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

const pasarTurno = () => {
  jugadores.find((jugador, indice) => {
    if (jugador.getGameTurn()) {
      jugador.setGameTurn(false);
      console.log(`Le quitamos el turno a ${jugador.getPlayer()}`);
      if (++indice < jugadores.length) {
        jugadores[indice].setGameTurn(true);
        console.log(`El turno es para  ${jugadores[indice].getPlayer()}`);
      }
      return jugador;
    }
  });
};

const pedirOtraCarta = (jugador) => {
  console.log(
    `Puntos de ${jugador.getPlayer()}  son ${jugador.getTotalPoints()}`
  );

  console.log(`${jugador.getPlayer()} pide Otra carta`);
  let carta = baraja.takeCard();
  jugador.addCard(carta);

  console.log(
    `Puntos de ${jugador.getPlayer()}  son ${jugador.getTotalPoints()}`
  );
  if (jugador.getTotalPoints() > 7.5) {
    pasarTurno();
    repintarMesa(jugadores, pedirOtraCarta, pasarTurno);
  } else {
    repintarMesaJugador(jugador, pedirOtraCarta, plantarse);
  }
};
const plantarse = () => {
  console.log("ME planto");
  pasarTurno();
  repintarMesa(jugadores, pedirOtraCarta, plantarse);
};
const empezarJuego = () => {
  pintarMesa(jugadores);
  baraja = new DeckCards();
  baraja.inicializateDeck();
  baraja.suffleCards();

  //Repartimos una carta a cada jugador
  jugadores.forEach((jugador, indice) => {
    jugador.setGameTurn(indice === 0); //El primer jugador tiene el turno
    jugador.addCard(baraja.takeCard());
    repintarMesaJugador(jugador, pedirOtraCarta, plantarse);
  });
  jugadorBanca.addCard(baraja.takeCard());
};

const onClickJugar = () => {
  if (jugadores.length < 1) {
    alert(`Faltan jugadores ${jugadores.length}`);
  } else {
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
