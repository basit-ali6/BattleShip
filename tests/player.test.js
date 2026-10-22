import Player from "../src/modules/player.js";
import Ship from "../src/modules/ship.js";
import { jest } from "@jest/globals";

// 1. Test human player type
describe("Player", () => {
  test("creates a human player", () => {
    const player = new Player("human");

    expect(player.type).toBe("human");
  });

  // 2. Test separate gameboards
  test("gives each player a separate gameboard", () => {
    const playerOne = new Player("human");
    const playerTwo = new Player("computer");

    expect(playerOne.gameboard).not.toBe(playerTwo.gameboard);
  });

  // 1. Test that the computer can attack the opponent's board.
  test("allows the computer to attack the opponent's board", () => {
    const computer = new Player("computer");
    const opponent = new Player("human");
    const ship = new Ship(2);

    opponent.gameboard.placeShip(ship, [2, 3]);
    jest.spyOn(Math, "random")
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3);
    computer.attack(opponent.gameboard, [2, 3]);

    expect(ship.hits).toBe(1);
  });

  // 2. Test that computer attack coordinates are valid.
  test("uses valid attack coordinates", () => {
    const computer = new Player("computer");
    const opponent = new Player("human");

    computer.attack(opponent.gameboard, [2, 3]);

    const [row, col] = opponent.gameboard.attackedCoordinates[0];

    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThanOrEqual(9);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThanOrEqual(9);
  });

  // 3. Test that the computer cannot attack the same coordinate twice.
  test("does not repeat an attack on the same coordinate", () => {
    const computer = new Player("computer");
    const opponent = new Player("human");
    const ship = new Ship(2);

    opponent.gameboard.placeShip(ship, [2, 3]);

    jest.spyOn(Math, "random")
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.5);

    computer.attack(opponent.gameboard, [2, 3]);
    computer.attack(opponent.gameboard, [2, 3]);

    expect(ship.hits).toBe(1);
    expect(opponent.gameboard.attackedCoordinates).toHaveLength(2);
    expect(opponent.gameboard.attackedCoordinates).toContainEqual([2, 3]);
    expect(opponent.gameboard.attackedCoordinates).toContainEqual([4, 5]);
  });

  // 4. Test that computer attacks are registered on the opponent's board.
  test("registers computer attacks on the opponent's board", () => {
    const computer = new Player("computer");
    const opponent = new Player("human");
    jest.spyOn(Math, "random")
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3);

    computer.attack(opponent.gameboard, [2, 3]);

    expect(opponent.gameboard.attackedCoordinates).toContainEqual([2, 3]);
    expect(computer.gameboard.attackedCoordinates).toHaveLength(0);
  });
});
