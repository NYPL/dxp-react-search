import * as React from "react";
import { Link } from "@nypl/design-system-react-components";

export interface DonationLinkButtonProps {
  /** Any child node passed to the component. */
  children: React.ReactNode;
  /** The `href` attribute for the anchor element. */
  href: string;
}

export default function DonationLinkButton({
  children,
  href,
}: DonationLinkButtonProps) {
  return (
    <Link
      type="button"
      href={href}
      sx={{
        width: "100%",
        color: "var(--nypl-colors-brand-primary)",
        backgroundColor: "white",
        borderRadius: "12px",
        fontWeight: "bold",
        // Fixes link text wrapping to 2 lines on 375 and lower mobiles.
        fontSize: {
          base: "11px",
          lg: "initial",
        },
        _hover: {
          backgroundColor: "ui.gray.light-cool",
          color: "var(--nypl-colors-brand-primary)",
        },
      }}
    >
      {children}
    </Link>
  );
}
