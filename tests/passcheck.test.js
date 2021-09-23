const {not} = require('expect');
const passLen = require('../public/js/passcheck');
test('Prints Testing Suite Status', () => {
  // this will pass since its an empty test function
});

// describe groups test together
describe("Password Requirements Checks", () => {
  test("Testing password Length > 6", () => {
    // https://jestjs.io/docs/expect
    expect(passLen("test123!")).toBe(8);
    expect(passLen("Password1!")).toBeGreaterThanOrEqual(6);
  });
  test("Testing password Length < 6", () => {
    expect(passLen("test")).not.toBe(8);
  });
  test("Testing password should not be null", () => {
    expect(passLen("Password2!")).not.toBeNull();
  });
  test("Testing password should not be NaN", () => {
    expect(passLen("password3!")).not.toBeNaN();
  });

});