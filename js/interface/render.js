import Player from "../Player/player";
import { puedesSeguirJugando, resultado } from "../Juego/juego";

export const pintarJugadores = (jugadores) => {
  let tablaJugadores = document.querySelector("tbody");

  const pintarUnJugador = (jugador) => {
    let filaJugador = document.createElement("tr");
    let celdaOrdenJugador = document.createElement("td");
    let celdaNombreJugador = document.createElement("td");
    let celdaColorJugador = document.createElement("td");
    let celdaBancaJugador = document.createElement("td");
    celdaOrdenJugador.appendChild(
      crearImagenBorrarJugador(jugador.getPlayer())
    );
    celdaNombreJugador.innerText = jugador.getPlayer();
    celdaColorJugador.innerText = jugador.getColour();
    celdaColorJugador.style.backgroundColor = celdaColorJugador.innerText;
    celdaColorJugador.style.color = celdaColorJugador.innerText;
    celdaColorJugador.style.margin = ".4rem";
    celdaBancaJugador.innerText = "";
    if (jugador.isTheBank()) {
      celdaBancaJugador.innerText = "SI";
      celdaBancaJugador.setAttribute("title", "Juega como banquero");
    }
    filaJugador.appendChild(celdaOrdenJugador);
    filaJugador.appendChild(celdaNombreJugador);
    filaJugador.appendChild(celdaColorJugador);
    filaJugador.appendChild(celdaBancaJugador);

    return filaJugador;
  };

  const crearImagenBorrarJugador = (jugador) => {
    let img = document.createElement("img");
    img.setAttribute("src", "./images/delete.svg");
    img.setAttribute("title", `Eliminar el jugador ${jugador}`);
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
  revisarCheckBanca(jugadores);
};

const existeJugadorBanca = (jugadores) => {
  return jugadores.some((jugador) => jugador.isTheBank() === true);
};

const revisarCheckBanca = (jugadores) => {
  let checkBanca = document.querySelector("input[name='banca']");
  let hayJugadorBanca = existeJugadorBanca(jugadores);

  //Obligamos a que si introducimos un cuarto jugador sea la banca
  if (!hayJugadorBanca && jugadores.length === 3) checkBanca.checked = true;
  checkBanca.disabled = hayJugadorBanca;
};

const pintarMesaJugador = (jugador) => {
  let tipoMesa = jugador.isTheBank() ? "mesaBanca" : "mesaJugador";
  let divMesaJugador = document.createElement("div");
  divMesaJugador.classList.add(tipoMesa, "FColumn");
  divMesaJugador.id = `jugador_${jugador.getPlayer()}`;
  divMesaJugador.setAttribute(
    "style",
    `border: 4px solid ${jugador.getColour()}`
  );

  let divNombreJugador = document.createElement("div");
  divNombreJugador.classList.add("FRow", "jCenter");

  let divPuntuacion = document.createElement("div");
  divPuntuacion.id = `puntuacion_${jugador.getPlayer()}`;
  divPuntuacion.textContent = `Puntos: ${jugador.getTotalPoints()}`;
  divPuntuacion.setAttribute("style", "margin:auto");

  let h2NombreJugador = document.createElement("h2");
  h2NombreJugador.textContent = jugador.getPlayer();
  h2NombreJugador.setAttribute(
    "style",
    `color: ${jugador.getColour()}; flex: 1; text-align:center;`
  );

  let divCartasJugador = document.createElement("div");
  divCartasJugador.classList.add("fColumn", "flexAll");

  let divCartas = document.createElement("div");
  divCartas.id = `cartas_${jugador.getPlayer()}`;

  let divOpciones = document.createElement("div");
  divOpciones.classList.add("FRow", "jStart", "opciones");
  divOpciones.id = `opciones_${jugador.getPlayer()}`;
  divNombreJugador.appendChild(h2NombreJugador);
  divNombreJugador.appendChild(divPuntuacion);

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
  divBanca.textContent = "";
  divBanca.appendChild(pintarMesaJugador(banca));
};

export const repintarMesa = (
  jugadores,
  functionPedirCarta,
  functionPlantarse,
  functionGirarCarta
) => {
  jugadores.map((jugador) =>
    repintarMesaJugador(
      jugador,
      functionPedirCarta,
      functionPlantarse,
      functionGirarCarta
    )
  );
};

export const repintarMesaBanca = (
  banca,
  functionPedirCarta,
  functionPlantarse,
  functionGirarCarta
) => {
  repintarMesaJugador(
    banca,
    functionPedirCarta,
    functionPlantarse,
    functionGirarCarta,
    true
  );
};

const actualizarSeguimientoTurno = (jugador) => {
  const texto =
    jugador != undefined ? `Turno de la ${jugador.getPlayer()}.` : "";

  let divSeguimiento = document.getElementById("seguimiento");
  divSeguimiento.textContent = texto;
};

const pintarCartasJugador = (jugador, functionGirarCarta, mostrarTodas) => {
  const divMesa = document.getElementById(`jugador_${jugador.getPlayer()}`);
  const divCartas = divMesa.querySelector(`#cartas_${jugador.getPlayer()}`);
  divCartas.textContent = "";

  let manoCartas = jugador.getHand();
  for (let i = 0; i < manoCartas.length; i++) {
    let carta = manoCartas[i];
    let imagenCarta = document.createElement("img");

    if (
      carta.isVisible() ||
      jugador.getTotalPoints() > 7.5 ||
      jugador.isTheBank() ||
      mostrarTodas
    ) {
      imagenCarta.src = `./Images/Cards/${carta.getNumber()}${carta.getSuit()}.jpg`;
    } else {
      imagenCarta.src = `./Images/Cards/trasera.jpg`;
    }
    //Solo el jugador con el turno, puede girar su ??ltima carta
    if (
      jugador.getGameTurn() &&
      functionGirarCarta != "" &&
      functionGirarCarta != undefined &&
      (i === manoCartas.length - 1 || !carta.isVisible())
    ) {
      imagenCarta.addEventListener("click", (event) => {
        functionGirarCarta(jugador, carta);
      });
    }
    divCartas.appendChild(imagenCarta);
  }
};

export const repintarMesaJugador = (
  jugador,
  functionPedirCarta,
  functionPlantarse,
  functionGirarCarta,
  mostrarTodas = false
) => {
  const divMesa = document.getElementById(`jugador_${jugador.getPlayer()}`);

  const actualizarPuntuacion = () => {
    let divPuntuacion = divMesa.querySelector(
      `#puntuacion_${jugador.getPlayer()}`
    );
    if (mostrarTodas || !puedesSeguirJugando(jugador)) {
      divPuntuacion.textContent = `Puntos: ${jugador.getTotalPoints()}`;
    } else {
      divPuntuacion.textContent = `Puntos: ${jugador.getTotalPointsVisibleCards()}`;
    }
  };
  pintarCartasJugador(jugador, functionGirarCarta, mostrarTodas);

  let divOpciones = divMesa.querySelector(`#opciones_${jugador.getPlayer()}`);
  divOpciones.textContent = "";

  actualizarPuntuacion(jugador);
  actualizarSeguimientoTurno(jugador);

  //Activamos acciones de juego si es el turno del jugador
  if (!jugador.isBoot()) {
    if (jugador.getGameTurn() && !jugador.getStopGame()) {
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
    } else if (jugador.getTotalPoints() > 7.5) {
      let divResultado = document.createElement("div");
      divResultado.textContent = "Te has pasado";
      divOpciones.appendChild(divResultado);
    } else if (jugador.getStopGame()) {
      let divResultado = document.createElement("div");
      divResultado.textContent = "Te has plantado";
      divOpciones.appendChild(divResultado);
    }
  }
};

const deshabilitarEntradaJugadores = () => {
  let divEntradaJugadores = document.querySelector("#nuevoJugador");
  divEntradaJugadores.style.display = "none";
  let tablaJugadores = document.querySelector("tbody");
  tablaJugadores.textContent = "";
};

const habilitaMesaJuego = () => {
  let divMesaJuego = document.querySelector("#juego");
  divMesaJuego.classList.remove("noVisible");
  divMesaJuego.classList.add("FColumn");
};

export const activarEntradaJugadores = () => {
  deshabilitaMesaJuego();
  habilitarEntradaJugadores();
  let checkBanca = document.querySelector("input[name='banca']");
  let jugador = document.querySelector("input[name='nombre']");
  checkBanca.checked = false;
  checkBanca.disabled = false;
  jugador.value = "";
};

const habilitarEntradaJugadores = () => {
  let divEntradaJugadores = document.querySelector("#nuevoJugador");
  divEntradaJugadores.style.display = "block";
};

const deshabilitaMesaJuego = () => {
  let divMesaJuego = document.querySelector("#juego");
  divMesaJuego.classList.remove("FColumn");
  divMesaJuego.classList.add("noVisible");
};

const maximoJugadores = (jugadores) => {
  let anyadirJugador = document.querySelector("img[src='../images/plus.svg']");
  anyadirJugador.style.display = jugadores.length === 4 ? "none" : "block";
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

const traducirResultado = (resultado) => {
  let texto = "";
  switch (resultado) {
    case "G":
      texto = "Has ganado!!!";
      break;
    case "P":
      texto = "Has perdido";
      break;
    case "E":
      texto = "Has empatado";
      break;
    default:
      "Ni idea";
  }
  return texto;
};

export const pintarResultados = (resultados, jugadores, jugadorBanca) => {
  jugadores.map((jugador) => repintarMesaJugador(jugador, "", "", "", true));
  repintarMesaBanca(jugadorBanca, "", "", "", true);
  resultados.map((resultado) => {
    let divOpciones = document.getElementById(`opciones_${resultado.jugador}`);
    divOpciones.style.color = resultado.resultado === "G" ? "blue" : "red";
    divOpciones.style.fontSize = "2rem";
    divOpciones.textContent = "";
    divOpciones.textContent = `${traducirResultado(resultado.resultado)}`;
  });
  actualizarSeguimientoTurno();
};

export const getNombreJugador = () =>
  document.querySelector("input[name='nombre']").value;

export const getColorJugador = () =>
  document.querySelector("input[name='color']").value;

export const getIsBanca = () =>
  document.querySelector("input[name='banca']").checked;

export const resetDatosJugador = () => {
  let nombre = document.querySelector("input[name='nombre']");
  let isBanca = document.querySelector("input[name='banca']");
  let color = document.querySelector("input[name='color']");

  nombre.value = "";
  isBanca.checked = false;
  color.value = generarNuevoColor();
};

const generarNuevoColor = () => {
  let simbolos = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color = color + simbolos[Math.floor(Math.random() * 16)];
  }
  return color;
};
