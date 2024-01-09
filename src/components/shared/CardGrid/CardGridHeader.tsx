import * as React from "react";
import { Box, HStack, Icon, Link } from "@nypl/design-system-react-components";
import Heading from "../Heading";

export interface CardGridHeaderProps {
  id: string;
  title?: string;
  headingColor?: string;
  link?: string;
  hrefText?: string;
}

export default function CardGridHeader({
  id,
  title,
  headingColor = "brand.primary",
  link,
  hrefText,
}: CardGridHeaderProps) {
  if (link && hrefText && title) {
    return (
      <Box mb=".75em">
        <HStack alignItems="baseline">
          <Heading id={id} level="h2" color={headingColor}>
            {title}
          </Heading>
          <Link href={link}>
            <a
              style={{
                display: "inline-flex",
                flexFlow: "row nowrap",
                lineHeight: "1",
                fontSize: ".875rem",
                fontWeight: 600,
                letterSpacing: ".04em",
                color: "#c60917",
                marginLeft: "10px",
                textDecoration: "none",
              }}
            >
              {hrefText}
              <span style={{ marginLeft: "5px" }}>
                <Icon
                  size="small"
                  name="arrow"
                  decorative={true}
                  iconRotation="rotate270"
                  color="brand.primary"
                />
              </span>
            </a>
          </Link>
        </HStack>
      </Box>
    );
  } else if (title) {
    return (
      <Heading id={id} level="h2" color={headingColor}>
        {title}
      </Heading>
    );
  } else {
    return null;
  }
}
