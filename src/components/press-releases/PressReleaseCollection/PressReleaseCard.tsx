import React from "react";
// Components
import { HorizontalRule, Box } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";
import NextDsLink from "../../shared/Link/NextDsLink";
// Type
import { PressReleaseItem } from "./PressReleaseCardType";

interface PressReleaseCardProps {
  item: PressReleaseItem;
}

function PressReleaseCard({ item }: PressReleaseCardProps) {
  const { id, title, slug, date } = item;
  return (
    <Box>
      <Box py={"s"} pr={"s"} id={`pressRelease-card-${id}`}>
        <Heading level="h3" sx={{ my: "xxs" }}>
          {slug && <NextDsLink href={slug}>{title}</NextDsLink>}
        </Heading>
        <Box>{date}</Box>
      </Box>
      <HorizontalRule />
    </Box>
  );
}

export default PressReleaseCard;
