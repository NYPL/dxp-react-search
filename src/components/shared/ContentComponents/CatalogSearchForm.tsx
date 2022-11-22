import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  TextInput,
} from "@nypl/design-system-react-components";

export interface CatalogSearchFormProps {
  /** The id of the catalog search component. */
  id: string;
  /** The heading of the catalog search component. */
  title: string;
  /** The heading color of the catalog search component. */
  headingColor?: string;
  /** The description of the catalog search component. */
  description: string;
  /** The base url of the search form, to be used for the generating the url. */
  formBaseUrl: string;
  /** The placeholder text for the search form input. */
  formPlaceholder: string;
}

// @TODO rename CatalogSearch ?
export default function CatalogSearchForm({
  id,
  title,
  headingColor,
  description,
  formBaseUrl,
  formPlaceholder,
}: CatalogSearchFormProps) {
  const [input, setInput] = React.useState("");

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    let searchUrl = "www.nypl.org/research/research-catalog/search";
    // Vega catalog.
    if (formBaseUrl.includes("nypl.na2.iiivega.com")) {
      searchUrl = `${formBaseUrl}?query=${input}`;
    }
    // NYPL research catalog.
    if (formBaseUrl.includes("www.nypl.org/research/research-catalog/search")) {
      searchUrl = `${formBaseUrl}?q=${input}`;
    }

    window.location.href = searchUrl;
  }

  return (
    <Box id={`catalog-search-form-${id}`} mb="l">
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
