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
    jugadorBanca.addCard(baraja.takeCard());
    repintarMesaBanca(jugadorBanca, pedirOtraCartaBanca, plantarseBanca);
    jugadorBanca.setGameTurn(false);
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
  let carta = baraja.takeCard();
  jugador.addCard(carta);

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
  reiniciarJuego();
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
