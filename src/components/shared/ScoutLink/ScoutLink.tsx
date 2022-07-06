import * as React from "react";
// Component
import {
  Box,
  Link as ReservoirLink,
  LinkTypes,
} from "@nypl/design-system-react-components";
import { default as NextLink } from "next/link";

interface ScoutLinkProps {
  id?: string;
  variant: "next-link" | "reservoir-link";
  href: string;
  children: React.ReactNode;
  style?: any;
  className?: string;
  type?: LinkTypes;
}

function ScoutLink({
  id,
  variant,
  type,
  href,
  children,
  style,
  className,
}: ScoutLinkProps): JSX.Element {
  if (variant === "reservoir-link") {
    return (
      <ReservoirLink
        href={href}
        {...(id && { id: id })}
        {...(className && { className: className })}
        {...(type && { type: type })}
      >
        {children}
      </ReservoirLink>
    );
  }
  if (variant === "next-link") {
    return (
      <NextLink href={href} passHref>
        <Box
          as="a"
          {...(id && { id: id })}
          {...(className && { className: className })}
          sx={
            style
              ? style
              : {
                  color: "var(--nypl-colors-ui-link-primary) !important",
                  textDecoration: "underline",
                  _hover: {
                    color: "var(--nypl-colors-ui-link-secondary) !important",
                  },
                }
          }
        >
          {children}
        </Box>
      </NextLink>
    );
  }
  // If no variant has been chosen return regular anchor tag
  return (
    <a
      href={href}
      {...(id && { id: id })}
      {...(className && { className: className })}
      {...(style && { style: style })}
    >
      {children}
    </a>
  );
}

export default ScoutLink;
