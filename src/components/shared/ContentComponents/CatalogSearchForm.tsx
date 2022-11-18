import * as React from "react";
import {
  Box,
  Heading,
  Icon,
  TextInput,
  Button,
  Flex,
} from "@nypl/design-system-react-components";

export interface CatalogSearchFormProps {
  /** The id of the donation component. */
  id: string;
  /** The heading of the donation component. */
  title: string;
  /** The description of the donation component. */
  description: string;
}

export default function CatalogSearchForm({
  id,
  title,
  description,
}: CatalogSearchFormProps) {
  const [input, setInput] = React.useState("");

  function handleSubmit(event: React.SyntheticEvent): void {
    const baseUrl = `https://nypl.na2.iiivega.com/search?query=${input}`;
    event.preventDefault();
    window.location.href = baseUrl;
  }

  return (
    <Box id={id} mb="l">
      <Heading level="two">{title}</Heading>
      <Box
        as="p"
        fontWeight="500"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <form
        id="catalog-search-form"
        role="search"
        aria-label="Catalog search form"
        onSubmit={handleSubmit}
      >
        <Flex width="100%">
          <TextInput
            id="catalog-search-form-input"
            labelText={"Search the Research Catalog"}
            showLabel={false}
            placeholder={"Search the Research Catalog"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
