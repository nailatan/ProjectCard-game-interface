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

const pintarMesaBanca = (jugador) => {
  let divMesaJugador = document.createElement("div");
  divMesaJugador.classList.add("mesaBanca", "FColumn");
  divMesaJugador.id = `jugador_banca`;

  let divNombreJugador = document.createElement("div");
  divNombreJugador.classList.add("FRow", "jCenter");

  let h2NombreJugador = document.createElement("h2");
  h2NombreJugador.textContent = jugador.getPlayer();
  h2NombreJugador.setAttribute("style", `color: ${jugador.getColour()}`);

  let divCartasJugador = document.createElement("div");
  divCartasJugador.classList.add("fColumn", "flexAll");

  let divCartas = document.createElement("div");
  divCartas.id = `cartas_banca`;

  let divOpciones = document.createElement("div");
  divOpciones.classList.add("FRow", "jStart", "opciones");
  divOpciones.id = `opciones_banca`;
  divNombreJugador.appendChild(h2NombreJugador);

  divCartasJugador.appendChild(divOpciones);
  divCartasJugador.appendChild(divCartas);

  divMesaJugador.appendChild(divNombreJugador);
  divMesaJugador.appendChild(divCartasJugador);

  return divMesaJugador;
};

const pintarMesaJugador = (jugador) => {
  let divMesaJugador = document.createElement("div");
  divMesaJugador.classList.add("mesaJugador", "FColumn");
  divMesaJugador.id = `jugador_${jugador.getPlayer()}`;
  divMesaJugador.setAttribute(
    "style",
    `border: 3px solid ${jugador.getColour()}`
  );

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
  divOpciones.classList.add("FRow", "jStart", "opciones");
  divOpciones.id = `opciones_${jugador.getPlayer()}`;
  divNombreJugador.appendChild(h2NombreJugador);

  divCartasJugador.appendChild(divOpciones);
  divCartasJugador.appendChild(divCartas);

  divMesaJugador.appendChild(divNombreJugador);
  divMesaJugador.appendChild(divCartasJugador);

  return divMesaJugador;
};

export const pintarMesa = (jugadores, banca) => {
  deshabilitarEntradaJugadores();
  habilitaMesaJuego();

  let divJugadores = document.getElementById("jugadores");
  let divBanca = document.getElementById("banca");
  divJugadores.textContent = "";

  jugadores.map((jugador) =>
    divJugadores.appendChild(pintarMesaJugador(jugador))
  );
  divBanca.appendChild(pintarMesaBanca(banca));
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

export const repintarMesaBanca = (banca) => {
  const divMesa = document.getElementById("jugador_banca");
  const divCartas = divMesa.querySelector(`#cartas_banca`);
  divCartas.textContent = "";

  for (let carta of banca.getHand()) {
    let imagenCarta = document.createElement("img");
    imagenCarta.src = `./Images/Cards/${carta.getNumber()}${carta.getSuit()}.jpg`;
    divCartas.appendChild(imagenCarta);
  }
  let divOpciones = divMesa.querySelector("#opciones_banca");
  divOpciones.textContent = "";
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

  let divOpciones = divMesa.querySelector(`#opciones_${jugador.getPlayer()}`);
  divOpciones.textContent = "";

  //Activamos acciones de juego si es el turno del jugador
  if (jugador.getGameTurn()) {
    let buttonCarta = document.createElement("button");
    buttonCarta.innerText = "Carta";

    buttonCarta.addEventListener("click", () => {
      functionPedirCarta(jugador);
    });
    let buttonPlantar = document.createElement("button");
    buttonPlantar.innerText = "Me planto";
    buttonPlantar.addEventListener("click", () => {
      functionPlantarse(jugador);
    });

    divOpciones.appendChild(buttonCarta);
    divOpciones.appendChild(buttonPlantar);
  } else if (jugador.getStopGame()) {
    let divResultado = document.createElement("div");
    divResultado.textContent = "Te has plantado";
    divOpciones.appendChild(divResultado);
  } else if (!jugador.getStopGame() && jugador.getTotalPoints() > 7.5) {
    let divResultado = document.createElement("div");
    divResultado.textContent = "Te has pasado";
    divOpciones.appendChild(divResultado);
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
