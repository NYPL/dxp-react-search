interface SearchOptions {
  textboxName: string;
  resultsId: string;
}

export function basicSearch(term: string, options: SearchOptions) {
  const { textboxName, resultsId } = options;

  return cy
    .log(`Searching for: ${term}`)
    .findByRole("textbox", {
      name: textboxName,
    })
    .type(term)
    .log("Submit the form")
    .get("form")
    .findByRole("button", { name: "Search" })
    .click()
    .wait(3000)
    .get(resultsId)
    .as("getSearchResults");
}

export function advancedSearch(term: string, options: SearchOptions) {
  const { textboxName, resultsId } = options;

  return (
    cy
      .log(`Searching for: ${term}`)
      .findByRole("textbox", {
        name: textboxName,
      })
      .type(term)
      // Autosuggest
      .type("{downarrow}")
      .type("{downarrow}")
      .click()
      .log("Submit the form")
      .get("form")
      .findByRole("button", { name: "Search" })
      .click()
      .wait(3000)
      .get(resultsId)
      .as("getSearchResults")
  );
}
