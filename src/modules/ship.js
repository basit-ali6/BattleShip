
// Represents a ship in the Battleship game.
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  // Registers a hit on the ship.
  hit() {
    this.hits++;
  }

  // Checks whether the ship has sunk.
  isSunk() {
    return this.hits >= this.length;
  }
}

export default Ship;

