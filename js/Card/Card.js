class Card {
  constructor(number, suit, image) {
    this._suit = suit;
    this._number = number;
    this._isVisible = false;
    this._value = isNaN(number) ? 0.5 : number;
    this._image = image;
  }

  getCardName() {
    return `${this._number}  de ${this._suit}`;
  }
  isVisible() {
    return this._isVisible;
  }
  setVisibility(visible) {
    this._isVisible = visible;
  }
  getSuit() {
    return this._suit;
  }
  getNumber() {
    return this._number;
  }
  getValue() {
    return this._value;
  }
  printConsole() {
    console.log(`   - ${this.getCardName()}`);
  }
  printWithWorthConsole() {
    console.log(`  - ${this.getCardName()} ( ${this.getValue()} points)`);
  }
  getImage() {
    return this._image;
  }
}
export default Card;
