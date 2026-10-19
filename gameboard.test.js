
import Gameboard from "./gameboard";
import Ship from "./ship";

// 1. Test empty board initialization
describe("Gameboard", () => {
  test("Gameboard creates an empty board", () => {
    const gameboard = new Gameboard();

    expect(gameboard.board).toHaveLength(10);

    gameboard.board.forEach((row) => {
      expect(row).toHaveLength(10);
    });
  });

  // 2. Test ship placement
  test("places a ship at specific coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, [2, 3]);

    expect(gameboard.board[2][3]).toBe(ship);
  });

  // 3. Test missed attacks
  test("records missed attacks", () => {
    const gameboard = new Gameboard();

    gameboard.receiveAttack([4, 5]);

    expect(gameboard.missedAttacks).toContainEqual([4, 5]);
  });

  // 4. Test ship hit registration
test("registers a hit on an attacked ship", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [2, 3]);
  gameboard.receiveAttack([2, 3]);

  expect(ship.hits).toBe(1);
});
// 5. Test when the board has no ships
test("returns false when no ships are on the board", () => {
  const gameboard = new Gameboard();

  expect(gameboard.allShipsSunk()).toBe(false);
});

// 6. Test when a ship is not sunk
test("returns false when a ship is not sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [2, 3]);

  expect(gameboard.allShipsSunk()).toBe(false);
});

// 7. Test when all ships are sunk
test("returns true when all ships are sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);

  gameboard.placeShip(ship, [2, 3]);
  gameboard.receiveAttack([2, 3]);
  gameboard.receiveAttack([2, 3]);

  expect(gameboard.allShipsSunk()).toBe(true);
});
});
