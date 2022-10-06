import * as React from "react";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Link,
} from "@nypl/design-system-react-components";

export interface CardGridHeaderProps {
  id: string;
  title?: string;
  headingColor?: string;
  href?: string;
  hrefText?: string;
}

export default function CardGridHeader({
  id,
  title,
  headingColor,
  href,
  hrefText,
}: CardGridHeaderProps) {
  if (href && hrefText && title) {
    return (
      <Box mb=".75em">
        <HStack alignItems="baseline">
          <Heading id={id} level="two" text={title} color={headingColor} />
          <Link href={href}>
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
    return <Heading id={id} level="two" text={title} color={headingColor} />;
  } else {
    return null;
  }
}
