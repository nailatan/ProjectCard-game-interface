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
    console.log(`BANCA CONTRA ${jugador.getPlayer()}`);
    if (puntosBanca > 7.5 && jugador.getTotalPoints() <= 7.5) {
      //   console.log(
      //     `El jugador  ${jugador.getPlayer()} ha ganado. La banca se ha pasado`
      //   );
      resultados.push(
        new resultado(jugador.getPlayer(), jugador.getTotalPoints(), "G")
      );
    } else if (puntosBanca > 7.5 && jugador.getTotalPoints() > 7.5) {
      //   console.log(
      //     `Ni el jugador ${jugador.getPlayer()} ni la banca ganan. Se han pasado`
      //   );
      resultados.push(
        new resultado(jugador.getPlayer(), jugador.getTotalPoints(), "P")
      );
    } else if (
      (puntosBanca > jugador.getTotalPoints() && puntosBanca <= 7.5) ||
      jugador.getTotalPoints() > 7.5
    ) {
      //   console.log(`La banca gana al jugador ${jugador.getPlayer()}`);
      resultados.push(
        new resultado(jugador.getPlayer(), jugador.getTotalPoints(), "P")
      );
    } else if (
      jugador.getTotalPoints() > puntosBanca &&
      jugador.getTotalPoints() <= 7.5
    ) {
      //   console.log(`Gana el jugador ${jugador.getPlayer()}`);
      resultados.push(
        new resultado(jugador.getPlayer(), jugador.getTotalPoints(), "G")
      );
    } else if (puntosBanca === jugador.getTotalPoints()) {
      //   console.log(`El jugador ${jugador.getPlayer()} empata`);
      resultados.push(
        new resultado(jugador.getPlayer(), jugador.getTotalPoints(), "E")
      );
    }
  });
  return resultados;
};
