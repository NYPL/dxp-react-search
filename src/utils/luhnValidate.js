/**
 * Open source luhn-algorithm from https://simplycalc.com/luhn-source.php
 * with modifications. It's a checksum algorithm used for credit card
 * and other sequence numbers.
 */

/**
 * luhnChecksum(num)
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit.
 *
 * @param {number | string} num
 */
const luhnChecksum = (num) => {
  const arr = `${num}`
    .split("")
    .reverse()
    .map((x) => parseInt(x, 10));
  const lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );
  sum += lastDigit;
  const checksum = sum % 10;
  return checksum === 0 ? 0 : 10 - checksum;
};

/**
 * luhnValidate(fullcode)
 * Return true if specified code (with check digit) is valid.
 *
 * @param {string | number} fullcode
 */
const luhnValidate = (fullcode) => luhnChecksum(fullcode) === 0;

export default luhnValidate;
