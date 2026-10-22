import Gameboard from './gameboard.js';

// Represents a human or computer player.
class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }
    // Attack a valid, un-attacked coordinate on the opponent's board.
    attack(opponentGameboard, coordinates) {
        if (this.type === "computer") {
            const attackedCoordinates = opponentGameboard.attackedCoordinates;
            // Generate random coordinates until an un-attacked cell is found
            do {
                coordinates = [
                    Math.floor(Math.random() * 10),
                    Math.floor(Math.random() * 10),
                ];
            } while (
                attackedCoordinates.some(
                    ([row, col]) =>
                        row === coordinates[0] && col === coordinates[1]
                )
            )
        }
        // Register the attack on the opponent's gameboard.
        opponentGameboard.receiveAttack(coordinates);
    }
}

export default Player;
