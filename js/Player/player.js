import Hand from "../HandsCard/Hand";

class Player {
  constructor(name, colour, isTheBank) {
    this._name = name;
    this._colour = colour;
    this._isTheBank = isTheBank;
    this._hand = new Hand();
    this._gameTurn = false;
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
}
export default Player;
