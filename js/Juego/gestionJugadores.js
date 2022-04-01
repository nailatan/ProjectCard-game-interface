import Player from "../Player/player";
import {
  getColorJugador,
  getNombreJugador,
  getIsBanca,
  resetDatosJugador,
} from "../interface/render";
import { jugadores } from "../Juego/juego";

const colorDuplicado = () => {
  const colorActual = getColorJugador();
  return jugadores.some((jugador) => jugador.getColour() === colorActual);
};

const jugadorDuplicado = () => {
  const nombre = getNombreJugador();
  return jugadores.some((jugador) => jugador.getPlayer() === nombre);
};

const nombreVacio = () => {
  let nombre = document.querySelector("input[name='nombre']");
  return nombre.value === "";
};

export const validarNuevoJugador = () => {
  let valido = true;
  if (jugadores.length >= 4) {
    alert("Se han alcanzado el máximo de jugadores");
    valido = false;
  } else if (nombreVacio()) {
    alert("Falta el nombre del jugador");
    valido = false;
  } else if (jugadorDuplicado(jugadores)) {
    alert("Existe otro jugador con el mismo nombre");
    valido = false;
  } else if (colorDuplicado(jugadores)) {
    alert("Existe otro jugador con el mismo color");
    valido = false;
  }
  return valido;
};
export const crearJugador = () => {
  let nombre = getNombreJugador();
  let color = getColorJugador();
  let isBanca = getIsBanca();

  let jugador = new Player(nombre, color, isBanca, false);
  jugadores.push(jugador);
  resetDatosJugador();
};
