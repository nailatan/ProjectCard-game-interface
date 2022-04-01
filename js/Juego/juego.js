export class resultado {
  constructor(nombre, puntos, resultado) {
    this.jugador = nombre;
    this.puntos = puntos;
    this.resultado = resultado;
  }
}

export const compararResultados = (jugadores, jugadorBanca) => {
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

export const existeJugadorBanca = (jugadores) => {
  return jugadores.some((jugador) => jugador.isTheBank() === true);
};

export const validarInicioJuego = (jugadores) => {
  if (existeJugadorBanca(jugadores) && jugadores.length < 2) {
    return "Falta al menos un jugador";
  } else if (!existeJugadorBanca(jugadores) && jugadores.length < 1) {
    return "Falta";
  }
  return "";
};
