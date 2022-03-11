import React from "react";
// Components
import {
  Card,
  CardHeading,
  CardContent,
  HeadingLevels,
  HorizontalRule,
} from "@nypl/design-system-react-components";
import NextDsLink from "../../shared/Link/NextDsLink";

interface PressReleaseCardProps {
  item?: any;
}
function PressReleaseCard({ item }: PressReleaseCardProps) {
  const { title, date } = item;
  console.log(item);
  return (
    <>
      <Card>
        <CardHeading level={HeadingLevels.Three}>{title}</CardHeading>
        <CardContent>{date}</CardContent>
      </Card>
      <HorizontalRule />
    </>
  );
}

export default PressReleaseCard;
