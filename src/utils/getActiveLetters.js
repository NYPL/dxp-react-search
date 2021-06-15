
function getActiveLetters(items) {
  let activeLetters = [];
  items?.forEach(item => {
    // Get first char, cast to uppercase, and trim white space.
    const itemLetter = item.name.charAt(0).toUpperCase().trim();
    if (itemLetter && activeLetters.includes(itemLetter) === false) { 
      activeLetters.push(itemLetter);
    }
  });
  return activeLetters
}

export default getActiveLetters;