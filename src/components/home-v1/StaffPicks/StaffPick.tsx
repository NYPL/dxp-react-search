import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
//Component
import { GridItem, Box, Text, Image, Link } from "@chakra-ui/react";
// Type
import { StaffPicksItem } from "./StaffPicksTypes";

interface StaffPickProps {
  item: StaffPicksItem;
}
const QuoteBg = () => {
  const styles = useStyleConfig("QuoteBg");
  return <Box sx={styles}></Box>;
};
function StaffPick({ item }: StaffPickProps) {
  const { id, quote, image, author, location } = item;
  return (
    <GridItem as="li" id={id}>
      <Box h={{ base: "264px", xl: "374px" }} position="relative">
        <QuoteBg />
        <Text
          pl={{ base: 4, xl: 8 }}
          pr={{ base: "120px", lg: "157px", xl: "220px" }}
          position="absolute"
          bottom="13%"
          fontFamily="Milo-Light"
          fontStyle="italic"
          lineHeight="none"
          fontSize={{ base: "xl", lg: "2.5xl", xl: "4xl" }}
          textAlign="left"
        >
          {quote}
        </Text>
        <Link
          display="inline-block"
          float="right"
          position="absolute"
          bottom="0px"
          right="0px"
        >
          <Image
            src={image}
            zIndex={1}
            maxHeight={{ base: "175px", lg: "233px", xl: "320px" }}
            maxWidth={{ base: "115px", lg: "153px", xl: "212px" }}
          />
        </Link>
      </Box>
      <Box
        color="brand.100"
        mt={{ base: 4, xl: 5 }}
        fontWeight="bold"
        fontFamily="Kievit-Book"
      >
        <Text
          pt={{ base: 5, xl: 9 }}
          pb={1}
          fontSize={{ base: "lg", xl: "xl" }}
        >
          {author}
        </Text>
        <Text fontSize="md">{location}</Text>
      </Box>
    </GridItem>
  );
}

export default StaffPick;
