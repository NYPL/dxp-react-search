import React from "react";
import {
  Box,
  Heading,
  Card,
  CardContent,
  CardHeading,
  Grid,
  Link,
} from "@nypl/design-system-react-components";
import { default as NextImage } from "next/image";

interface CatalogListProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  items: CatalogListItem[];
}

interface CatalogListItem {
  id: string;
  title: string;
  description: string;
  isbn: string;
  bNumber: string;
}

function CatalogList({
  id,
  type,
  heading,
  description,
  items,
}: CatalogListProps) {
  // Used for generating the remote image stored on content cafe, based on isbn.
  const coverImageUri =
    "https://contentcafecloud.baker-taylor.com/Jacket.svc/D65D0665-050A-487B-9908-16E6D8FF5C3E";
  // Used for generating the catalog link.
  const catalogUri = "https://browse.nypl.org/iii/encore/record/C__Rb";

  return (
    <Box id={`${type}-${id}`} mb="l">
      {heading && <Heading level="two" text={heading} />}
      {description && <Box dangerouslySetInnerHTML={{ __html: description }} />}
      <Grid
        as="ul"
        gap="l"
        templateColumns="repeat(1, 1fr)"
        sx={{ listStyleType: "none" }}
      >
        {items.map((item: CatalogListItem) => {
          const catalogLink = item.bNumber
            ? `${catalogUri}${item.bNumber}`
            : "#";
          return (
            <Box as="li" key={item.id}>
              <Card
                layout="row"
                isCentered
                imageProps={{
                  component: (
                    <a href={catalogLink}>
                      <NextImage
                        alt={item.title}
                        src={`${coverImageUri}/${item.isbn}/Medium/Empty`}
                        layout="responsive"
                        objectFit="cover"
                        width={960}
                        height={960}
                        quality={90}
                      />
                    </a>
                  ),
                  size: "small",
                }}
              >
                <CardHeading level="three">
                  <Link href={catalogLink}>{item.title}</Link>
                </CardHeading>
                <CardContent>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  ></Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CatalogList;
