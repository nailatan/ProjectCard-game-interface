import Player from "../Player/player";
import DeckCards from "../DeckCards/DeckCards";

const colorBanca = "#000000";
export let jugadores = [];
export let jugadorBanca = new Player("Banca", colorBanca, true, true);
export let baraja;

export class resultado {
  constructor(nombre, puntos, resultado) {
    this.jugador = nombre;
    this.puntos = puntos;
    this.resultado = resultado;
  }
}

export const recogerCartas = () => {
  jugadores.map((jugador) => {
    jugador.vaciarMano();
  });
  jugadorBanca.vaciarMano();
};

export const reiniciarJuego = () => {
  jugadores = [];
  jugadorBanca = new Player("Banca", colorBanca, true, true);
  prepararBaraja();
};

export const prepararJugadores = () => {
  if (existeJugadorBanca(jugadores)) {
    jugadorBanca = jugadores.find((jugador) => jugador.isTheBank());
    let jugadores2 = jugadores.filter(
      (jugador) => jugador.isTheBank() === false
    );
    jugadores.splice(0, jugadores.length, ...jugadores2);
  } else {
    jugadorBanca = new Player("Banca", colorBanca, true, true);
  }
};

export const finalizarJuego = () => {
  return compararResultados();
};

const compararResultados = () => {
  const puntosBanca = jugadorBanca.getTotalPoints();
  let resultados = [];

  jugadores.map((jugador) => {
    let puntosJugador = jugador.getTotalPoints();
    let strResultado = "";

    if (puntosBanca > 7.5 && puntosJugador <= 7.5) {
      strResultado = "G";
    } else if (puntosBanca > 7.5 && puntosJugador > 7.5) {
      strResultado = "P";
    } else if (
      (puntosBanca > puntosJugador && puntosBanca <= 7.5) ||
      puntosJugador > 7.5
    ) {
      strResultado = "P";
    } else if (puntosJugador > puntosBanca && puntosJugador <= 7.5) {
      strResultado = "G";
    } else if (puntosBanca === puntosJugador) {
      strResultado = "E";
    }
    resultados.push(
      new resultado(jugador.getPlayer(), puntosJugador, strResultado)
    );
  });
  return resultados;
};

const existeJugadorBanca = () => {
  return jugadores.some((jugador) => jugador.isTheBank() === true);
};

export const validarInicioJuego = () => {
  if (jugadores.length < 1) {
    alert(`Faltan jugadores. Hay ${jugadores.length}`);
  } else if (existeJugadorBanca(jugadores) && jugadores.length < 2) {
    return "Falta al menos un jugador";
  } else if (!existeJugadorBanca(jugadores) && jugadores.length < 1) {
    return "Falta";
  }
  return "";
};

export const prepararBaraja = () => {
  baraja = new DeckCards();
  baraja.inicializateDeck();
  baraja.suffleCards();
};

export const hayJugadores = () => {
  return jugadores.length >= 1;
};

export const sigueJugandoBanca = () => {
  //Faltaria añadir logica:
  // - Si todos los jugadores se han pasado -> Puede plantarse.
  // - Si los jugadores que no se han pasado, tienen menos puntos --> Puede plantarse, no hace falta arriesgar más
  let sigoJugando = false;
  if (
    jugadorBanca.getTotalPoints() < 7.5 &&
    7.5 - jugadorBanca.getTotalPoints() > 0.5
  ) {
    sigoJugando = true;
  }
  return sigoJugando;
};

export const puedesSeguirJugando = (jugador) => {
  return jugador.getTotalPoints() <= 7.5;
};

export const pasarTurno = (jugador) => {
  let turnoSiguiente;
  jugadores.find((jugador, indice) => {
    if (jugador.getGameTurn()) {
      jugador.setGameTurn(false);
      if (++indice < jugadores.length) {
        jugadores[indice].setGameTurn(true);
        turnoSiguiente = jugadores[indice];
      } else {
        turnoSiguiente = jugadorBanca;
      }
      return turnoSiguiente;
    }
  });
  return turnoSiguiente;
};

export const darCarta = (jugador) => {
  let carta = baraja.takeCard();
  jugador.addCard(carta);
};

export const repartirCartaATodos = () => {
  jugadores.forEach((jugador, indice) => {
    jugador.setGameTurn(indice === 0); //El primer jugador tiene el turno
    jugador.addCard(baraja.takeCard());
  });
};
