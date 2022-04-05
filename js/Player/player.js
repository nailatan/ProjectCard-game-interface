import Hand from "../HandsCard/Hand";

class Player {
  constructor(name, colour, isTheBank, isBoot) {
    this._name = name;
    this._colour = colour;
    this._isTheBank = isTheBank;
    this._hand = new Hand();
    this._gameTurn = false;
    this._stopGame = false;
    this._isBoot = isBoot;
  }
  getPlayer() {
    return this._name;
  }
  getColour() {
    return this._colour;
  }
  isTheBank() {
    return this._isTheBank;
  }
  setIsTheBank(value) {
    this._isTheBank = value;
  }
  getTotalPoints() {
    return this._hand.getTotalPoints();
  }
  getTotalPointsVisibleCards() {
    return this._hand.getTotalPointsVisibleCards();
  }

  printHandConsole() {
    this._hand.printHandConsole();
  }
  getHand() {
    return this._hand.getHand();
  }
  addCard(card) {
    this._hand.addCard(card);
  }
  getGameTurn() {
    return this._gameTurn;
  }
  setGameTurn(isTurn) {
    this._gameTurn = isTurn;
  }
  getStopGame() {
    return this._stopGame;
  }
  setStopGame(stop) {
    this._stopGame = stop;
  }
  vaciarMano() {
    this._hand = new Hand();
  }
  setIsBoot(isBoot) {
    this._isBoot = isBoot;
  }
  isBoot() {
    return this._isBoot;
  }
}
export default Player;
