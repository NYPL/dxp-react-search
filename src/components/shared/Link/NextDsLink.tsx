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
          // ui.link.primary
          color: "#0576D3 !important",
          textDecoration: "underline",
          _hover: {
            // ui.link.secondary
            color: "#004B98 !important",
          },
        }}
      >
        {children}
      </Box>
    </NextLink>
  );
}

export default NextDsLink;
