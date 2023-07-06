import * as React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

export interface HomePageLinkProps {
  /** ID used for accessibility purposes. */
  id?: string;
  /** Any child node passed to the component. */
  children?: React.ReactNode;
  /** The `href` attribute for the anchor element. */
  href?: string;
  /** Infroms styling of links in ComponentWrapper */
  variant?: string;
  /** */
  tabIndex?: number;
}

const HomePageLink = React.forwardRef<
  HTMLDivElement & HTMLAnchorElement,
  HomePageLinkProps
>((props, ref?) => {
  const { id, children, href, variant, tabIndex, ...rest } = props;

  const hoverStyle = useStyleConfig("Link", {
    variant,
  });

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault;

    // Adobe analytics: Event CTA data layer.
    if (window !== undefined) {
      let ctaText = undefined;
      if (typeof children === "string") {
        ctaText = children;
      }

      // Clear the data layer of previous values.
      window.adobeDataLayer.push({ event_data: null });

      // Push the new values from the click event.
      window.adobeDataLayer.push({
        event: "send_event",
        event_data: {
          name: "cta_click",
          cta_section: "Homepage",
          // Subsection will be fixed with PR 427: https://github.com/NYPL/dxp-react-search/pull/427
          // cta_subsection: gaEventActionName,
          cta_text: ctaText,
          cta_position: undefined,
          destination_url: href || "no value passed",
        },
      });
    }
  };

  return (
    <Box
      id={id}
      ref={ref}
      as="a"
      href={href}
      tabIndex={tabIndex}
      onClick={handleClick}
      __css={hoverStyle}
      {...rest}
    >
      {children}
    </Box>
  );
});

HomePageLink.displayName = "HomePageLink";

export default HomePageLink;
