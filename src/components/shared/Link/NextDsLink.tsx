import React from "react";
import { Box } from "@nypl/design-system-react-components";
import { default as NextLink } from "next/link";

interface LinkProps {
  children: React.ReactNode;
  href: string;
}

// @TODO Replace Box with DS Link eventually.
function NextDsLink({ children, href }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <Box
        as="a"
        sx={{
          color: "var(--nypl-colors-ui-link-primary) !important",
          textDecoration: "underline",
          _hover: {
            color: "var(--nypl-colors-ui-link-secondary) !important",
          },
        }}
      >
        {children}
      </Box>
    </NextLink>
  );
}

export default NextDsLink;
