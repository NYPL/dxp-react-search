import React from "react";
// Components
import {
  Box,
  HorizontalRule,
  Link,
  Text,
} from "@nypl/design-system-react-components";
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
          {slug && <Link href={slug}>{title}</Link>}
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
