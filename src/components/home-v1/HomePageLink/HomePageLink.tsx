import * as React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

export interface HomePageLinkProps {
  /** ID used for accessibility purposes. */
  id?: string;
  /** Any child node passed to the component. */
  children?: React.ReactNode;
  /** The `href` attribute for the anchor element. */
  href?: string;
  /** The value that will appear as the event action in Google Analytics Event reports. */
  gaEventActionName?: string;
  /** Infroms styling of links in ComponentWrapper */
  variant?: string;
  /** */
  tabIndex?: number;
}

const HomePageLink = React.forwardRef<
  HTMLDivElement & HTMLAnchorElement,
  HomePageLinkProps
>((props, ref?) => {
  const { id, children, href, gaEventActionName, variant, tabIndex, ...rest } =
    props;

  const hoverStyle = useStyleConfig("Link", {
    variant,
  });

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault;
    // @TODO Update this after review with comms, to correct value of "Homepage".
    const eventCategory = "Homepage Scout Local";

    // @ts-ignore
    window.gtag("event", gaEventActionName, {
      event_category: eventCategory,
      event_label: href,
    });
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
