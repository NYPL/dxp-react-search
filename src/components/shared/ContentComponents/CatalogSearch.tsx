import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  TextInput,
} from "@nypl/design-system-react-components";

export interface CatalogSearchProps {
  /** The id of the catalog search component. */
  id: string;
  /** The heading of the catalog search component. */
  title: string;
  /** The heading color of the catalog search component. */
  headingColor?: string;
  /** The description of the catalog search component. */
  description: string;
  /** The catalog type of the form, to be used for the generating the url. */
  catalogType: "research_catalog" | "vega";
  /** The placeholder text for the search form input. */
  formPlaceholder: string;
}

export default function CatalogSearch({
  id,
  title,
  headingColor,
  description,
  catalogType,
  formPlaceholder,
}: CatalogSearchProps) {
  const [input, setInput] = React.useState("");

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    let searchUrl = "";
    let formBaseUrl = "";

    if (catalogType === "research_catalog") {
      formBaseUrl = "https://www.nypl.org/research/research-catalog/search";
      searchUrl = `${formBaseUrl}?q=${input}`;
    }

    if (catalogType === "vega") {
      formBaseUrl = "https://nypl.na2.iiivega.com/search";
      searchUrl = `${formBaseUrl}?query=${input}`;
    }

    window.location.href = searchUrl;
  }

  return (
    <Box id={`catalog-search-${id}`} mb="l">
      <Heading level="two" color={headingColor}>
        {title}
      </Heading>
      <Box as="p" dangerouslySetInnerHTML={{ __html: description }} />
      <form
        id="catalog-search-form"
        role="search"
        aria-label="Catalog search form"
        onSubmit={handleSubmit}
      >
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <TextInput
            id="catalog-search-form-input"
            labelText={"Search the Research Catalog"}
            showLabel={false}
            placeholder={formPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            flex={{ md: "1 1 auto" }}
          />
          <Button id="catalog-search-form-button" type="submit">
            <Icon name="search" align="left" size="small" />
            Search
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
