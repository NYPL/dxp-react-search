import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  TextInput,
} from "@nypl/design-system-react-components";

export interface ExternalSearchProps {
  /** The id of the external search component. */
  id: string;
  /** The heading of the external search component. */
  title: string;
  /** The heading color of the external search component. */
  headingColor?: string;
  /** The description of the external search component. */
  description: string;
  /** The search type of the form, to be used for the generating the url. */
  searchType: "catalog" | "research_catalog" | "website" | "vega";
  /** The placeholder text for the external search form input. */
  formPlaceholder: string;
}

export default function ExternalSearch({
  id,
  title,
  headingColor,
  description,
  searchType = "catalog",
  formPlaceholder,
}: ExternalSearchProps) {
  const [input, setInput] = React.useState("");
  const finalInput = encodeURIComponent(input);

  // Defaults to search type "catalog".
  let searchLabel = "Search the catalog";
  let searchUrl = "";
  let formBaseUrl = "";

  switch (searchType) {
    case "research_catalog":
      searchLabel = "Search the research catalog";
      formBaseUrl = "https://www.nypl.org/research/research-catalog/search";
      searchUrl = `${formBaseUrl}?q=${finalInput}`;
      break;
    case "website":
      searchLabel = "Search the website";
      formBaseUrl = "https://www.nypl.org";
      searchUrl = `${formBaseUrl}/search/${finalInput}`;
      break;
    case "vega":
      searchLabel = "Search the catalog";
      formBaseUrl = "https://nypl.na2.iiivega.com/search";
      searchUrl = `${formBaseUrl}?query=${finalInput}`;
      break;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    window.location.href = searchUrl;
  }

  return (
    <Box id={`external-search-${id}`} mb="l">
      <Heading level="two" color={headingColor}>
        {title}
      </Heading>
      <Box as="p" dangerouslySetInnerHTML={{ __html: description }} />
      <form
        id="external-search-form"
        role="search"
        aria-label={searchLabel}
        onSubmit={handleSubmit}
      >
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <TextInput
            id="external-search-form-input"
            labelText={searchLabel}
            showLabel={false}
            placeholder={formPlaceholder}
            isRequired={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            flex={{ md: "1 1 auto" }}
          />
          <Button id="external-search-form-button" type="submit">
            <Icon name="search" align="left" size="small" />
            Search
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
