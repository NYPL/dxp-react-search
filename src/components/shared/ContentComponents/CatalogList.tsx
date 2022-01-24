import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
  Card,
  CardContent,
  CardHeading,
  ImageRatios,
  ImageSizes,
  CardLayouts,
  Grid,
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
    <Box id={`${type}-${id}`} mb="xl">
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
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
                layout={CardLayouts.Row}
                center
                imageComponent={
                  <Box
                    w="100%"
                    maxWidth={["100%", "100%", "225px", "165px"]}
                    mr={[null, null, "m"]}
                    mb={["m", null]}
                  >
                    <NextImage
                      src={`${coverImageUri}/${item.isbn}/Medium/Empty`}
                      layout="responsive"
                      width={256}
                      height={360}
                      quality={90}
                    />
                  </Box>
                }
                imageAspectRatio={ImageRatios.Original}
              >
                <CardHeading level={HeadingLevels.Three}>
                  <a href={catalogLink}>{item.title}</a>
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