const passLen = require('../public/js/passcheck');

// checks the length of the password is greater than 6
test("Password character length checked", () => {
  expect(passLen("test123!")).toBe(8);
  expect(passLen("test")).toBe(4);
});
