import Gameboard from './gameboard.js';

// Represents a human or computer player.
class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }
}

export default Player;
