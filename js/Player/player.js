class Player {
  constructor(name, colour, isTheBank) {
    this._name = name;
    this._colour = colour;
    this._isTheBank = isTheBank;
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
}
export default Player;
