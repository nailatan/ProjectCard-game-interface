import "../css/style.css";

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
  validarInicioJuego,
  reiniciarJuego,
  prepararJugadores,
  finalizarJuego,
  prepararBaraja,
  recogerCartas,
  hayJugadores,
  sigueJugandoBanca,
  puedesSeguirJugando,
  pasarTurno as gestionaPasarTurno,
  darCarta,
  repartirCartaATodos,
} from "./Juego/juego";
import { validarNuevoJugador, crearJugador } from "./Juego/gestionJugadores";

// MODELO
import { jugadores, jugadorBanca, baraja } from "./Juego/juego";

// Funciones gestión de creación/Eliminación de jugadores
const onClickAnyadirJugador = () => {
  if (validarNuevoJugador()) {
    crearJugador();
    pintarJugadores(jugadores);
  }
};

const jugadaBanca = () => {
  if (jugadorBanca.isBoot()) {
    jugadorBanca.setGameTurn(true);
    darCarta(jugadorBanca);
    repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);

    if (sigueJugandoBanca()) {
      setTimeout(jugadaBanca, 2 * 1000);
    } else {
      repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
      let resultados = finalizarJuego();
      pintarResultados(resultados, jugadorBanca);
    }
  } else {
    jugadorBanca.setGameTurn(true);
    repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
  }
};

const pasarTurno = (jugador) => {
  let turnoSiguiente = gestionaPasarTurno(jugador);

  if (turnoSiguiente.isTheBank()) {
    repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
    jugadaBanca();
  } else {
    repintarMesa(jugadores, pedirOtraCarta, plantarse);
  }
};

const pedirOtraCartaBanca = (banca) => {
  darCarta(banca);
  repintarMesaBanca(banca, pedirOtraCartaBanca, plantarseBanca);
  if (!puedesSeguirJugando(banca)) {
    banca.setStopGame(true);
    let resultados = finalizarJuego();
    pintarResultados(resultados, jugadorBanca);
  }
};

const plantarseBanca = (banca) => {
  banca.setStopGame(true);
  finalizarJuego();
};

const pedirOtraCarta = (jugador) => {
  darCarta(jugador);
  if (!puedesSeguirJugando(jugador)) {
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
    prepararJugadores();
  }
  pintarMesa(jugadores, jugadorBanca);
  prepararBaraja();
  repartirCartaATodos();
  repintarMesa(jugadores, pedirOtraCarta, plantarse);
  jugadorBanca.addCard(baraja.takeCard());
  repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
};

const onClickJugar = () => {
  let msg = "";
  if ((msg = validarInicioJuego()) != "") {
    alert(`${msg}`);
  } else {
    empezarJuego();
  }
};

const onClickReiniciar = () => {
  if (hayJugadores()) {
    recogerCartas();
    empezarJuego(true);
  }
};
const onClickNuevoJuego = () => {
  reiniciarJuego(false);
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
