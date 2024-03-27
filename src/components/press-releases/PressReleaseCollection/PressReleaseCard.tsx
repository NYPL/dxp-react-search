import React from "react";
// Components
import {
  Box,
  HorizontalRule,
  // Link,
  Text,
} from "@nypl/design-system-react-components";
import NextDsLink from "../../shared/Link/NextDsLink";
import Heading from "../../shared/Heading";
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
        <Heading level="h3" sx={{ my: "xxs", a: { textDecor: "none" } }}>
          {/* @note This is a temporary fix until the imperva WAF is more stable
          and stops blocking nextjs client side routing. */}
          {slug && <NextDsLink href={slug}>{title}</NextDsLink>}
        </Heading>
        <Text size="subtitle2" noSpace>
          {date}
        </Text>
      </Box>
      <HorizontalRule />
    </Box>
  );
}

export default PressReleaseCard;
