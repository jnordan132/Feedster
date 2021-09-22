const { not } = require('expect');
const passLen = require('../public/js/passcheck');

// checks the length of the password is greater than 6
test("Password character length checked", () => {
// https://jestjs.io/docs/expect
  expect(passLen("test123!")).toBe(8);
  expect(passLen("test")).not.toBe(8);
  expect(passLen("Password1!")).toBeGreaterThanOrEqual(6);
  expect(passLen("Password2!")).not.toBeNull();
  expect(passLen("password3!")).not.toBeNaN();
});
