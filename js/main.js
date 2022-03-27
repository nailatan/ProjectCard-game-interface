import "../css/style.css";

import Player from "./Player/player";
import DeckCards from "./DeckCards/DeckCards";
import {
  pintarJugadores,
  pintarMesa,
  repintarMesa,
  repintarMesaJugador,
  repintarMesaBanca,
  pintarResultados,
  activarEntradaJugadores,
} from "./interface/render";
import { resultado, compararResultados } from "./Juego/juego";

// MODELO
let jugadores = [];
let jugadorBanca = new Player("Banca", "#000000", true);
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

const finalizarJuego = () => {
  let resultados = compararResultados(jugadores, jugadorBanca);
  pintarResultados(resultados);
};

const jugadaBanca = () => {
  jugadorBanca.setGameTurn(true);
  while (jugadorBanca.getTotalPoints() < 7.5) {
    jugadorBanca.addCard(baraja.takeCard());
    setTimeout(jugadaBanca, 2 * 1000);
    repintarMesaBanca(jugadorBanca);
    setTimeout(jugadaBanca, 2 * 1000);
  }
  jugadorBanca.setGameTurn(false);
};

const pasarTurno = (jugador) => {
  jugadores.find((jugador, indice) => {
    let turnoSiguiente;
    if (jugador.getGameTurn()) {
      jugador.setGameTurn(false);
      if (++indice < jugadores.length) {
        jugadores[indice].setGameTurn(true);
        turnoSiguiente = jugadores[indice];
        repintarMesa(jugadores, pedirOtraCarta, plantarse);
      } else {
        jugadaBanca();
        finalizarJuego();
        return jugadorBanca;
      }
      return jugador;
    }
  });
};

const pedirOtraCarta = (jugador) => {
  let carta = baraja.takeCard();
  jugador.addCard(carta);

  if (jugador.getTotalPoints() > 7.5) {
    pasarTurno(jugador);
    // repintarMesa(jugadores, pedirOtraCarta, plantarse);
  } else {
    repintarMesaJugador(jugador, pedirOtraCarta, plantarse);
  }
};
const plantarse = (jugador) => {
  jugador.setStopGame(true);
  pasarTurno(jugador);
  // repintarMesa(jugadores, pedirOtraCarta, plantarse);
};
const empezarJuego = () => {
  pintarMesa(jugadores, jugadorBanca);
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
  repintarMesaBanca(jugadorBanca);
};

const onClickJugar = () => {
  if (jugadores.length < 1) {
    alert(`Faltan jugadores ${jugadores.length}`);
  } else {
    empezarJuego();
  }
};

const onClickReiniciar = () => {
  jugadores.map((jugador) => {
    jugador.vaciarMano();
  });
  jugadorBanca.vaciarMano();
  empezarJuego();
};
const onClickNuevoJuego = () => {
  jugadores = [];
  jugadorBanca.vaciarMano();
  activarEntradaJugadores();
};

// Tratamiento de eventos
let anyadirJugador = document.querySelector("img[src='../images/plus.svg']");
let botononClickJugar = document.querySelector("#Jugar");
let formElement = document.querySelector("form");
let botonReiniciar = document.querySelector("#reiniciar");
let botonNuevoJuego = document.querySelector("#nuevoJuego");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  onClickAnyadirJugador();
});

botononClickJugar.addEventListener("click", onClickJugar);
anyadirJugador.addEventListener("click", onClickAnyadirJugador);
botonReiniciar.addEventListener("click", onClickReiniciar);
botonNuevoJuego.addEventListener("click", onClickNuevoJuego);
