import "../css/style.css";

import Player from "./Player/player";
import DeckCards from "./DeckCards/DeckCards";
import {
  pintarJugadores,
  pintarMesa,
  repintarMesa,
  repintarMesaJugador,
  repintarMesaBanca,
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

const finalizarJuego = () => {
  const puntosBanca = jugadorBanca.getTotalPoints();

  jugadores.map((jugador) => {
    console.log(`BANCA CONTRA ${jugador.getPlayer()}`);
    if (puntosBanca > 7.5 && jugador.getTotalPoints() <= 7.5) {
      console.log(
        `El jugador  ${jugador.getPlayer()} ha ganado. La banca se ha pasado`
      );
    } else if (puntosBanca > 7.5 && jugador.getTotalPoints() > 7.5) {
      console.log(
        `Ni el jugador ${jugador.getPlayer()} ni la banca ganan. Se han pasado`
      );
    } else if (
      (puntosBanca > jugador.getTotalPoints() && puntosBanca <= 7.5) ||
      jugador.getTotalPoints() > 7.5
    ) {
      console.log(`La banca gana al jugador ${jugador.getPlayer()}`);
    } else if (
      jugador.getTotalPoints() > puntosBanca &&
      jugador.getTotalPoints() <= 7.5
    ) {
      console.log(`Gana el jugador ${jugador.getPlayer()}`);
    } else if (puntosBanca === jugador.getTotalPoints()) {
      console.log(`El jugador ${jugador.getPlayer()} empata`);
    }
  });
};

const jugadaBanca = () => {
  while (jugadorBanca.getTotalPoints() < 7.5) {
    jugadorBanca.addCard(baraja.takeCard());
    setTimeout(jugadaBanca, 2 * 1000);
    repintarMesaBanca(jugadorBanca);
    setTimeout(jugadaBanca, 2 * 1000);
  }
};

const pasarTurno = (jugador) => {
  console.log(`Pasando el turno de ${jugador.getPlayer()}`);
  jugadores.find((jugador, indice) => {
    let turnoSiguiente;
    if (jugador.getGameTurn()) {
      console.log(`Quitamos el turno a ${jugador.getPlayer()} `);
      jugador.setGameTurn(false);
      if (++indice < jugadores.length) {
        jugadores[indice].setGameTurn(true);
        turnoSiguiente = jugadores[indice];
        console.log(`Le damos el turno a ${turnoSiguiente.getPlayer()}`);
      } else {
        console.log(`LE toca jugar a la banca`);
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
    console.log(`${jugador.getPlayer()} se ha pasado`);
    pasarTurno(jugador);
    repintarMesa(jugadores, pedirOtraCarta, plantarse);
  } else {
    repintarMesaJugador(jugador, pedirOtraCarta, plantarse);
  }
};
const plantarse = (jugador) => {
  jugador.setStopGame(true);
  pasarTurno(jugador);
  console.log(`EL jugador ${jugador.getPlayer()} se ha plantado`);
  repintarMesa(jugadores, pedirOtraCarta, plantarse);
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
