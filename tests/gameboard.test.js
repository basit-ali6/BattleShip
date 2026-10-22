
import Gameboard from "../src/modules/gameboard.js";
import Player from "../src/modules/player.js";
import Ship from "../src/modules/ship.js";

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

    expect(gameboard.allShipsSunk()).toBe(false);
  });


  test("records an attack on an empty cell", () => {
    const gameboard = new Gameboard();

    gameboard.receiveAttack([2, 3]);

    expect(gameboard.missedAttacks).toContainEqual([2, 3]);
  });

  test("increases the hit count when a ship is attacked", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, [2, 3]);
    gameboard.receiveAttack([2, 3]);

    expect(ship.hits).toBe(1);
  });

  test("does not register the same attack more than once", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, [2, 3]);

    gameboard.receiveAttack([2, 3]);
    gameboard.receiveAttack([2, 3]);

    expect(ship.hits).toBe(1);
    expect(gameboard.missedAttacks).not.toContainEqual([2, 3]);
  });
  // 8. Test that attacks are registered on the enemy board
  test("registers attacks on the enemy board, not the human board", () => {
    const humanPlayer = new Player("human");
    const computerPlayer = new Player("computer");
    const ship = new Ship(2);

    computerPlayer.gameboard.placeShip(ship, [2, 3]);

    computerPlayer.gameboard.receiveAttack([2, 3]);

    expect(ship.hits).toBe(1);
    expect(humanPlayer.gameboard.attackedCoordinates).toHaveLength(0);
  });

  // 9. Test that a successful hit increases the ship's hit count
  test("increases the ship hit count after a successful attack", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(2);

    gameboard.placeShip(ship, [2, 3]);
    gameboard.receiveAttack([2, 3]);

    expect(ship.hits).toBe(1);
  });

  // 10. Test that repeated attacks do not increase the hit count
  test("does not increase hit count for a repeated attack", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(2);

    gameboard.placeShip(ship, [2, 3]);
    gameboard.receiveAttack([2, 3]);
    gameboard.receiveAttack([2, 3]);

    expect(ship.hits).toBe(1);
  });
});
