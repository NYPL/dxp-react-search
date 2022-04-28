import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
  Grid,
  Link,
} from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";
// Utils
import { getImageTransformation } from "./../../shared/Image/imageUtils";

interface CardListProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  items: CardItem[];
}

interface CardItem {
  id: string;
  title: string;
  description: string;
  image?: any;
  link: string;
}

function CardList({ id, type, heading, description, items }: CardListProps) {
  return (
    <Box id={`${type}-${id}`} mb="xl">
      {heading && <Heading level="two" text={heading} />}
      {description && <TextFormatted html={description} />}
      <Grid
        as="ul"
        listStyleType="none"
        gap="l"
        templateColumns="repeat(1, 1fr)"
      >
        {items.map((item: CardItem) => {
          return (
            <li key={item.id}>
              <Box
                display={{ lg: "flex" }}
                flexFlow={{ lg: "row" }}
                alignItems={{ lg: "flex-start" }}
              >
                {item.image && (
                  <Box
                    flex={{ lg: "0 0 165px" }}
                    mr={{ lg: "l" }}
                    mb={{ base: "s", lg: 0 }}
                  >
                    <a href={item.link}>
                      <Box
                        alignItems="center"
                        backgroundColor="ui.gray.light-warm"
                        display="flex"
                        height={{ base: "300px", lg: "165px" }}
                        justifyContent="center"
                        overflow="hidden"
                      >
                        <Box
                          as="img"
                          maxHeight="100%"
                          width="auto"
                          src={getImageTransformation(
                            "max_width_960",
                            item.image.transformations
                          )}
                          alt={item.image.alt}
                        />
                      </Box>
                    </a>
                  </Box>
                )}
                <Box>
                  <Heading level="three">
                    <Link href={item.link}>{item.title}</Link>
                  </Heading>
                  <TextFormatted html={item.description} />
                </Box>
              </Box>
            </li>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CardList;
