import Player from "../Player/player";

export const pintarJugadores = (jugadores) => {
  let tablaJugadores = document.querySelector("tbody");

  const pintarUnJugador = (jugador) => {
    let filaJugador = document.createElement("tr");
    let celdaOrdenJugador = document.createElement("td");
    let celdaNombreJugador = document.createElement("td");
    let celdaColorJugador = document.createElement("td");
    celdaOrdenJugador.appendChild(
      crearImagenBorrarJugador(jugador.getPlayer())
    );
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

  const crearImagenBorrarJugador = (jugador) => {
    let img = document.createElement("img");
    img.setAttribute("src", "./images/delete.svg");
    img.addEventListener("click", function (event) {
      onClickEliminarJugador(jugador, jugadores);
    });
    return img;
  };

  const eliminarTodosJugadores = () => {
    tablaJugadores.textContent = "";
  };

  eliminarTodosJugadores();
  jugadores.map((jugador) => {
    tablaJugadores.appendChild(pintarUnJugador(jugador));
  });
  maximoJugadores(jugadores);
};

const pintarMesaJugador = (jugador) => {
  let divMesaJugador = document.createElement("div");
  divMesaJugador.classList.add("mesaJugador", "FColumn");
  divMesaJugador.id = `jugador_${jugador.getPlayer()}`;

  let divNombreJugador = document.createElement("div");
  divNombreJugador.classList.add("FRow", "jCenter");

  let h2NombreJugador = document.createElement("h2");
  h2NombreJugador.textContent = jugador.getPlayer();
  h2NombreJugador.setAttribute("style", `color: ${jugador.getColour()}`);

  let divCartasJugador = document.createElement("div");
  divCartasJugador.classList.add("fColumn", "flexAll");

  let divCartas = document.createElement("div");
  divCartas.id = `cartas_${jugador.getPlayer()}`;

  let divOpciones = document.createElement("div");
  divOpciones.classList.add("FRow", "jEnd", "flexAll", "aEnd");
  divOpciones.id = `opciones_${jugador.getPlayer()}`;
  divNombreJugador.appendChild(h2NombreJugador);

  divCartasJugador.appendChild(divCartas);
  divCartasJugador.appendChild(divOpciones);

  divMesaJugador.appendChild(divNombreJugador);
  divMesaJugador.appendChild(divCartasJugador);

  return divMesaJugador;
};

export const pintarMesa = (jugadores) => {
  deshabilitarEntradaJugadores();
  habilitaMesaJuego();

  let divJugadores = document.getElementById("jugadores");
  divJugadores.textContent = "";

  jugadores.map((jugador) =>
    divJugadores.appendChild(pintarMesaJugador(jugador))
  );
};

export const repintarMesa = (
  jugadores,
  functionPedirCarta,
  functionPlantarse
) => {
  jugadores.map((jugador) =>
    repintarMesaJugador(jugador, functionPedirCarta, functionPlantarse)
  );
};

export const repintarMesaJugador = (
  jugador,
  functionPedirCarta,
  functionPlantarse
) => {
  const divMesa = document.getElementById(`jugador_${jugador.getPlayer()}`);
  const divCartas = divMesa.querySelector(`#cartas_${jugador.getPlayer()}`);
  divCartas.textContent = "";

  for (let carta of jugador.getHand()) {
    let imagenCarta = document.createElement("img");
    imagenCarta.src = `./Images/Cards/${carta.getNumber()}${carta.getSuit()}.jpg`;
    divCartas.appendChild(imagenCarta);
  }
  console.log(
    `Repintando la mesa del jugador ${jugador.getPlayer()}. Tiene turno? ${jugador.getGameTurn()} `
  );
  let divOpciones = divMesa.querySelector(`#opciones_${jugador.getPlayer()}`);
  divOpciones.textContent = "";

  //Activamos acciones de juego si es el turno del jugador
  if (jugador.getGameTurn()) {
    let buttonCarta = document.createElement("button");
    buttonCarta.innerText = "CARTA";

    buttonCarta.addEventListener("click", () => {
      functionPedirCarta(jugador);
    });
    let buttonPlantar = document.createElement("button");
    buttonPlantar.innerText = "PLANTARSE";
    buttonPlantar.addEventListener("click", () => {
      functionPlantarse(jugador);
    });

    divOpciones.appendChild(buttonCarta);
    divOpciones.appendChild(buttonPlantar);
  }
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

const maximoJugadores = (jugadores) => {
  let anyadirJugador = document.querySelector("img[src='../images/plus.svg']");
  anyadirJugador.style.display = jugadores.length === 3 ? "none" : "block";
};

const onClickEliminarJugador = (nombreJugador, jugadores) => {
  // Lo implemento asi porque las variables se pasan por "valor" y
  // no modificaria los valores originales del array jugadores
  let jugadores2 = jugadores.filter(
    (jugador) => jugador.getPlayer() !== nombreJugador
  );
  jugadores.splice(0, jugadores.length, ...jugadores2);
  pintarJugadores(jugadores);
};
