
// Represents the game board in Battleship.
class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missedAttacks = [];
    this.attackedCoordinates = [];
  }

  // Places a ship at the specified coordinates.
  placeShip(ship, coordinates) {
    const [row, column] = coordinates;
    this.board[row][column] = ship
  }

  // Records attacks and registers ship hits.
  receiveAttack(coordinates) {

    const [row, column] = coordinates;

    // Ignore coordinates that have already been attacked.
    const alreadyAttacked = this.attackedCoordinates.some(
      ([attackedRow, attackedColumn]) =>
        attackedRow === row && attackedColumn === column
    );

    if (alreadyAttacked) return;

    this.attackedCoordinates.push(coordinates);


    
    const ship = this.board[row][column];

    if (ship) {
      ship.hit();
    } else {
      this.missedAttacks.push(coordinates);
    }
  }

  // Checks whether all ships on the board are sunk.
  allShipsSunk() {
    const ships = this.board.flat().filter((cell) => cell !== null)

    return ships.length > 0 && ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
