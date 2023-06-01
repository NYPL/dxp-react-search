interface SearchOptions {
  textboxName: string;
  resultsId: string;
  autoSuggest: boolean;
  autoSuggestDownArrowCount: number;
}

export function search(term: string, options: SearchOptions) {
  const { textboxName, resultsId, autoSuggest, autoSuggestDownArrowCount } =
    options;

  let typedString = term;
  if (autoSuggest && autoSuggestDownArrowCount) {
    let downArrowsString = "";
    for (let i = 0; i < autoSuggestDownArrowCount; i++) {
      downArrowsString += "{downArrow}";
    }

    typedString = `${term}${downArrowsString}`;
  }

  return cy
    .log(`Searching for: ${term}`)
    .findByRole("textbox", {
      name: textboxName,
    })
    .type(typedString)
    .click()
    .log("Submit the form")
    .get("form")
    .findByRole("button", { name: "Search" })
    .click()
    .wait(3000)
    .get(resultsId)
    .as("getSearchResults");
}
