import React from "react";
import { Box, Flex } from "@nypl/design-system-react-components";
import FeaturedCard from "./FeaturedCard";
import { ImageType } from "../../shared/Image";

export interface FeaturedCard {
  id: string;
  heading: string;
  description: string;
  image: ImageType;
  imageDirection: string;
  link: string;
  linkText: string;
  bgColor: string;
}

interface FeaturedCardGridProps {
  id: string;
  type: string;
  items?: FeaturedCard[];
}

function FeaturedCardGrid({ id, type, items }: FeaturedCardGridProps) {
  return (
    <Box
      id={`${type}-${id}`}
      mb="l"
      // This forces the component background to go full width, edge to edge.
      marginTop={type === "card_grid_secondary" ? "calc(-1 * 6rem)" : undefined}
      marginX={
        type === "card_grid_secondary"
          ? "calc(.5rem + calc(-50vw + 50%))"
          : undefined
      }
      paddingX={
        type === "card_grid_secondary"
          ? "calc(.5rem + calc(-50vw + 50%))"
          : undefined
      }
      bg={type === "card_grid_secondary" ? "ui.bg.default" : undefined}
    >
      <Flex
        as="ul"
        listStyleType="none"
        gap="l"
        flexDirection={{ base: "column", lg: "row" }}
        maxWidth={type === "card_grid_secondary" ? "1280px" : undefined}
        margin={type === "card_grid_secondary" ? "0 auto" : undefined}
        paddingY={type === "card_grid_secondary" ? "4rem" : undefined}
        paddingX={
          type === "card_grid_secondary"
            ? "calc(1rem + calc(-50vw + calc(1280px / 2)))"
            : undefined
        }
      >
        {items &&
          items.map((item: FeaturedCard) => {
            return (
              <Flex
                as="li"
                key={item.id}
                flexDirection={{ base: "column" }}
                marginBottom="l"
                paddingX={{ base: "m" }}
                bgGradient={{
                  base: `linear-gradient(to bottom, transparent 0, transparent 1.5rem, ${item.bgColor} 0)`,
                }}
                flexGrow={{ lg: 1 }}
                flexShrink={{ lg: 0 }}
                flexBasis={{ lg: "calc(33% - 2rem)" }}
              >
                <FeaturedCard
                  heading={item.heading}
                  description={item.description}
                  image={item.image}
                  link={item.link}
                  linkText={item.linkText}
                  bgColor={item.bgColor}
                />
              </Flex>
            );
          })}
      </Flex>
    </Box>
  );
}

export default FeaturedCardGrid;
