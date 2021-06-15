/**
 * Converts an array of objects to an array of letters, without duplicates.
 *
 * @param {array} items - an array of objects.
 * @param {string} fieldName - name of the field to use inside object.
 * @return {array} activeLetters - an array of letters.
 */
function getActiveLetters(items, fieldName) {
  let activeLetters = [];
  items?.forEach(item => {    
    // Get first char, cast to uppercase, and trim white space.
    const itemLetter = item[fieldName]
      .trim()
      .charAt(0)
      .toUpperCase();
    if (itemLetter && activeLetters.includes(itemLetter) === false) { 
      activeLetters.push(itemLetter);
    }
  });
  return activeLetters;
}

export default getActiveLetters;