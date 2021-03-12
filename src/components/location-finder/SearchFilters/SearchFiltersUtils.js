// Sets the dropdown label name with appended filter count.
function setDropdownLabel(vocab, searchFilters) {
  let filterCount = '';
  if (
    searchFilters[vocab.id] !== undefined 
    && searchFilters[vocab.id].terms.length > 0
  ) {
    filterCount = `(${searchFilters[vocab.id].terms.length})`;
  }
  return `${vocab.name} ${filterCount}`;
}

function setDropdownCheckedProp(vocabId, dropdownIds) {
  let dropdownChecked = false;
  if (dropdownIds !== undefined && dropdownIds.indexOf(`dropdown-${vocabId}`) > -1) {
    dropdownChecked = true;
  }
  return dropdownChecked;
}

// Returns true or false whether a dropdown has selectedItems.
function hasSelectedItems(vocab, searchFilters) {
  let hasSelectedItems = false;
  if (
    searchFilters[vocab.id] !== undefined 
    && searchFilters[vocab.id].terms.length > 0
  ) {
    hasSelectedItems = true;
  }
  return hasSelectedItems;
}

export { setDropdownLabel, setDropdownCheckedProp, hasSelectedItems };