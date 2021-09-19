const testExample = require('../models/testExample');

test('Prints Testing Suite Status', () => {
  expect(testExample("Testing using Jest has been successfully setup!")).toBe("Testing using Jest has been successfully setup!");
});