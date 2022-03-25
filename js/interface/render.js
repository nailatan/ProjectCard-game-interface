import Player from "../Player/player";

export const pintarUnJugador = (jugador) => {
  let filaJugador = document.createElement("tr");
  let celdaOrdenJugador = document.createElement("td");
  let celdaNombreJugador = document.createElement("td");
  let celdaColorJugador = document.createElement("td");
  celdaOrdenJugador.appendChild(crearImagenBorrarJugador(jugador.getPlayer()));
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

export const pintarJugadores = (jugadores) => {
  let tablaJugadores = document.querySelector("tbody");

  const eliminarTodosJugadores = () => {
    tablaJugadores.textContent = "";
  };

  eliminarTodosJugadores();
  jugadores.map((jugador) => {
    tablaJugadores.appendChild(pintarUnJugador(jugador));
  });
  maximoJugadores(jugadores);
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

export const pintarMesaJugador = (jugador) => {
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
  divOpciones.textContent = "OPCIONES";
  divOpciones.id = `opciones_${jugador.getPlayer()}`;
  divNombreJugador.appendChild(h2NombreJugador);

  divCartasJugador.appendChild(divCartas);
  divCartasJugador.appendChild(divOpciones);

  divMesaJugador.appendChild(divNombreJugador);
  divMesaJugador.appendChild(divCartasJugador);

  return divMesaJugador;
};

export const deshabilitarEntradaJugadores = () => {
  let divEntradaJugadores = document.querySelector("#nuevoJugador");
  divEntradaJugadores.style.display = "none";
};

export const habilitaMesaJuego = () => {
  let divMesaJuego = document.querySelector("#juego");
  divMesaJuego.classList.remove("noVisible");
  divMesaJuego.classList.add("FColumn");
};

export const repintarMesaJugador = (jugador) => {
  const divMesa = document.getElementById(`jugador_${jugador.getPlayer()}`);
  const divCartas = divMesa.querySelector(`#cartas_${jugador.getPlayer()}`);

  for (let carta of jugador.getHand()) {
    let imagenCarta = document.createElement("img");
    imagenCarta.src = `./Images/Cards/${carta.getNumber()}${carta.getSuit()}.jpg`;
    divCartas.appendChild(imagenCarta);
  }
};

const crearImagenBorrarJugador = (jugador) => {
  let img = document.createElement("img");
  img.setAttribute("src", "./images/delete.svg");
  img.addEventListener("click", function (event) {
    onClickEliminarJugador(jugador);
  });
  return img;
};

const maximoJugadores = (jugadores) => {
  let anyadirJugador = document.querySelector("img[src='../images/plus.svg']");
  anyadirJugador.style.display = jugadores.length === 3 ? "none" : "block";
};

const onClickEliminarJugador = (nombreJugador) => {
  jugadores = jugadores.filter(
    (jugador) => jugador.getPlayer() !== nombreJugador
  );
  pintarJugadores(jugadores);
};
