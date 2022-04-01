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
import {
  resultado,
  compararResultados,
  validarInicioJuego,
  existeJugadorBanca,
} from "./Juego/juego";

// MODELO
let jugadores = [];
const colorBanca = "#000000";
let jugadorBanca = new Player("Banca", colorBanca, true, true);
let baraja;

// Funciones gestión de creación/Eliminación de jugadores
const onClickAnyadirJugador = () => {
  if (jugadores.length >= 4) {
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
  let isBanca = document.querySelector("input[name='banca']");

  let jugador = new Player(nombre.value, color.value, isBanca.checked, false);
  jugadores.push(jugador);
  nombre.value = "";
  isBanca.checked = false;
  color.value = generarNuevoColor();
};

const finalizarJuego = () => {
  let resultados = compararResultados(jugadores, jugadorBanca);
  pintarResultados(resultados, jugadorBanca);
};

const jugadaBanca = () => {
  if (jugadorBanca.isBoot()) {
    jugadorBanca.setGameTurn(true);
    jugadorBanca.addCard(baraja.takeCard());
    repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
    jugadorBanca.setGameTurn(false);
    if (
      jugadorBanca.getTotalPoints() < 7.5 &&
      7.5 - jugadorBanca.getTotalPoints() > 0.5
    ) {
      setTimeout(jugadaBanca, 2 * 1000);
    } else {
      repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
      finalizarJuego();
    }
  } else {
    jugadorBanca.setGameTurn(true);
    repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
  }
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
        repintarMesa(jugadores, pedirOtraCarta, plantarse);
        jugadaBanca();
        return jugadorBanca;
      }
      return jugador;
    }
  });
};

const pedirOtraCartaBanca = (banca) => {
  let carta = baraja.takeCard();
  banca.addCard(carta);
  repintarMesaBanca(banca, pedirOtraCartaBanca, plantarseBanca);

  if (banca.getTotalPoints() >= 7.5) {
    banca.setStopGame(true);
    finalizarJuego();
  }
};

const plantarseBanca = (banca) => {
  banca.setStopGame(true);
  finalizarJuego();
};

const pedirOtraCarta = (jugador) => {
  let carta = baraja.takeCard();
  jugador.addCard(carta);

  if (jugador.getTotalPoints() > 7.5) {
    pasarTurno(jugador);
  } else {
    repintarMesaJugador(jugador, pedirOtraCarta, plantarse);
  }
};

const plantarse = (jugador) => {
  jugador.setStopGame(true);
  pasarTurno(jugador);
};

const empezarJuego = (reiniciar = false) => {
  if (!reiniciar) {
    if (existeJugadorBanca(jugadores)) {
      jugadorBanca = jugadores.find((jugador) => jugador.isTheBank());
      let jugadores2 = jugadores.filter(
        (jugador) => jugador.isTheBank() === false
      );
      jugadores.splice(0, jugadores.length, ...jugadores2);
    } else {
      jugadorBanca = new Player("Banca", colorBanca, true, true);
    }
  }
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
  repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
};

const onClickJugar = () => {
  let msg = "";
  if (jugadores.length < 1) {
    alert(`Faltan jugadores ${jugadores.length}`);
  } else if ((msg = validarInicioJuego(jugadores)) != "") {
    alert(`${msg}`);
  } else {
    empezarJuego();
  }
};

const onClickReiniciar = () => {
  jugadores.map((jugador) => {
    jugador.vaciarMano();
  });
  jugadorBanca.vaciarMano();
  empezarJuego(true);
};
const onClickNuevoJuego = () => {
  jugadores = [];
  jugadorBanca = new Player("Banca", colorBanca, true, true);
  activarEntradaJugadores();
  pintarJugadores(jugadores);
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
