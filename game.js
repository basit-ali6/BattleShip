import "./style.css";
import Player from './player.js';
import Ship from './ship.js';

// Initialize both players.
const humanPlayer = new Player("human")
const computerPlayer = new Player("computer");

// Select the main game container.
const gameContainer = document.querySelector("#game-container");


const randomPlacementButton = document.createElement("button");
randomPlacementButton.id = "random-placement-btn";
randomPlacementButton.textContent = "Random Ship Placement";

gameContainer.prepend(randomPlacementButton);


// Create separate sections for both players.
const humanSection = document.createElement("section");
const computerSection = document.createElement("section");

let gameOver = false;

const gameMessage = document.createElement("h2");
gameMessage.textContent = "";
gameContainer.prepend(gameMessage);

function checkGameOver() {
    if (computerPlayer.gameboard.allShipsSunk()) {
        gameMessage.textContent = "You Win!";
        gameOver = true;
    } else if (humanPlayer.gameboard.allShipsSunk()) {
        gameMessage.textContent = "Computer Wins!";
        gameOver = true;
    }
}

// Add section headings.
const humanHeading = document.createElement("h2");
humanHeading.textContent = "Your Fleet";

const computerHeading = document.createElement("h2");
computerHeading.textContent = "Enemy Fleet"

// Assemble the sections.
humanSection.append(humanHeading);
computerSection.append(computerHeading);

gameContainer.append(humanSection, computerSection);

// Create a 10x10 grid for each player.
const humanGrid = document.createElement("div");
humanGrid.classList.add("human-grid");

const computerGrid = document.createElement("div");
computerGrid.classList.add("computer-grid");

// Generate 100 cells for each grid.
for (let i = 0; i < 100; i++) {
    const humanCell = document.createElement("div");
    humanCell.classList.add("grid-cell")
    humanCell.dataset.row = Math.floor(i / 10)
    humanCell.dataset.col = i % 10;

    humanGrid.append(humanCell);

    const computerCell = document.createElement("div");
    computerCell.classList.add("grid-cell");
    computerCell.dataset.row = Math.floor(i / 10);
    computerCell.dataset.col = i % 10;



    computerGrid.append(computerCell);
}
// Handle attacks when the human clicks an enemy cell.
computerGrid.addEventListener("click", (event) => {
    const cell = event.target.closest(".grid-cell");

    if (!cell) return;
    if (gameOver) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    const coordinates = [row, col];

    // Prevent repeated human attacks.
    const alreadyAttacked =
        computerPlayer.gameboard.attackedCoordinates.some(
            ([attackedRow, attackedCol]) =>
                attackedRow === row && attackedCol === col
        );

    if (alreadyAttacked) return;

    // Human attacks the computer's board.
    const ship = computerPlayer.gameboard.board[row][col];
    computerPlayer.gameboard.receiveAttack(coordinates);

    cell.classList.add(ship ? "hit" : "miss");

    // Computer attacks the human's board.
    computerPlayer.attack(humanPlayer.gameboard);

    const computerAttack =
        humanPlayer.gameboard.attackedCoordinates.at(-1);

    if (!computerAttack) return;

    const [computerRow, computerCol] = computerAttack;

    const humanCell = humanGrid.querySelector(
        `[data-row="${computerRow}"][data-col="${computerCol}"]`
    );

    if (!humanCell) return;

    const humanShip =
        humanPlayer.gameboard.board[computerRow][computerCol];

    humanCell.classList.add(humanShip ? "hit" : "miss");

    checkGameOver();
});
    // Add each grid to its section.
    humanSection.append(humanGrid);
    computerSection.append(computerGrid);


const humanShips = [new Ship(3), new Ship(2)];

function placeHumanShipsRandomly() {
    // Clear the previous human ship positions.
    humanPlayer.gameboard.board =
        Array.from({ length: 10 }, () => Array(10).fill(null));

    humanPlayer.gameboard.missedAttacks = [];
    humanPlayer.gameboard.attackedCoordinates = [];

    humanShips.forEach((ship) => {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 1000) {
            attempts++;

            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const horizontal = Math.random() < 0.5;

            const coordinates = [];

            for (let i = 0; i < ship.length; i++) {
                const shipRow = row + (horizontal ? 0 : i);
                const shipCol = col + (horizontal ? i : 0);

                if (
                    shipRow >= 10 ||
                    shipCol >= 10 ||
                    humanPlayer.gameboard.board[shipRow][shipCol] !== null
                ) {
                    break;
                }

                coordinates.push([shipRow, shipCol]);
            }

            if (coordinates.length === ship.length) {
                placed = coordinates.every(([shipRow, shipCol]) =>
                    humanPlayer.gameboard.placeShip(ship, [shipRow, shipCol])
                );
            }
        }

        if (!placed) {
            throw new Error("Unable to place human ships.");
        }
    });

    // Display the human ships on the grid.
    humanGrid.querySelectorAll(".grid-cell").forEach((cell) => {
        cell.classList.remove("ship-cell");
    });

    humanPlayer.gameboard.board.forEach((row, rowIndex) => {
        row.forEach((ship, colIndex) => {
            if (ship !== null) {
                const cell = humanGrid.querySelector(
                    `[data-row="${rowIndex}"][data-col="${colIndex}"]`
                );

                cell?.classList.add("ship-cell");
            }
        });
    });
}


randomPlacementButton.addEventListener("click", () => {
    if (gameOver) return;

    placeHumanShipsRandomly();
});


placeHumanShipsRandomly();



    // Place two ships on the computer board.
    const enemyShipOne = new Ship(3);
    computerPlayer.gameboard.placeShip(enemyShipOne, [1, 1]);
    computerPlayer.gameboard.placeShip(enemyShipOne, [1, 2]);
    computerPlayer.gameboard.placeShip(enemyShipOne, [1, 3]);

    const enemyShipTwo = new Ship(2);
    computerPlayer.gameboard.placeShip(enemyShipTwo, [4, 5]);
    computerPlayer.gameboard.placeShip(enemyShipTwo, [4, 6])
