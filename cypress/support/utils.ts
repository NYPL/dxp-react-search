interface SearchOptions {
  textboxName: string;
  resultsId: string;
  autoSuggest: boolean;
}

export function search(term: string, options: SearchOptions) {
  const { textboxName, resultsId, autoSuggest } = options;

  let typedString = term;
  if (autoSuggest) {
    typedString = `${term}{downarrow}{downarrow}`;
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
