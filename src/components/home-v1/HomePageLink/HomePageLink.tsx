import * as React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

export interface HomePageLinkProps {
  /** ID used for accessibility purposes. */
  id?: string;
  /** Any child node passed to the component. */
  children?: React.ReactNode;
  /** The `href` attribute for the anchor element. */
  href?: string;
  /** */
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
  function handleChange(event: any) {
    event.preventDefault;

    // @ts-ignore
    window.gtag("event", gaEventActionName, {
      event_category: "Homepage Scout Local",
      event_label: href,
    });
  }

  return (
    <Box
      id={id}
      as="a"
      ref={ref}
      onClick={handleChange}
      href={href}
      __css={hoverStyle}
      tabIndex={tabIndex}
      {...rest}
    >
      {children}
    </Box>
  );
});

HomePageLink.displayName = "HomePageLink";

export default HomePageLink;
