import Ship from "../src/modules/ship.js";

// 1. Test hit registration
describe("Ship", () => {
  test("registers a hit", () => {
    const ship = new Ship(3);

    expect(ship.hits).toBe(0);

    ship.hit();

    expect(ship.hits).toBe(1);
  });

  // 2. Test sunk status
  test("sinks when hits reach its length", () => {
    const ship = new Ship(2);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
 