import Card from "../Card/Card";
import _ from "underscore";

class DeckCards {
  cardsNumber = [1, 2, 3, 4, 5, 6, 7, "Sota", "Caballo", "Rey"];
  constructor() {
    this.cards = [];
    this.suits = ["Bastos", "Oros", "Espadas", "Copas"];
  }

  inicializateDeck() {
    this.cards = this.cards.concat(
      ...this.suits.map((value) => {
        return this.cardsNumber.map((item) => {
          return new Card(item, value);
        });
      })
    );
  }
  suffleCards() {
    this.cards = _.shuffle(this.cards);
  }
  printDeck() {
    this.cards.map((value) => value.printConsole());
  }
  printDeckWithWorth() {
    this.cards.map((value) => value.printWithWorthConsole());
  }
  takeCard() {
    return this.cards.shift();
  }
}
export default DeckCards;
