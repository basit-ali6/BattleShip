
import Player from "./player";

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
});
