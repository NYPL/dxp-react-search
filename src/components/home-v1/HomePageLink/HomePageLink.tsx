import * as React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

/*
  @TODO
  - Fix Link in Hero not working
  - tabIndex should not be a seperate prop.
  - Talk to comms about "hero" vs "hero button"
  - Connect handleChange to send data to GA.
  - Use HomePageLink for Hero, What's On, Staff Picks, Slideshow
  - Use HomePageLink for ComponentWrapper
*/

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
}

const HomePageLink = React.forwardRef<
  HTMLDivElement & HTMLAnchorElement,
  HomePageLinkProps
>((props, ref?) => {
  const { id, children, href, gaEventActionName, variant, ...rest } = props;
  const hoverStyle = useStyleConfig("Link", {
    variant,
  });
  function handleChange(event: any) {
    event.preventDefault;

    /*
      GA event:
      - category (Homepage)
      - action [ <section title> - <card title> - <slot number> ]
      - action (what's on) [ <section name> - <category label> - <card title> - <slot number> ]
      - action (staff picks) [ <section name> - <slot number> ]
      - action (hero) Main link: "Hero" | Arrow Icon: "Hero button"
      - action (component wrapper) "Heading" or "See More"
      - label (component wrapper) "Section title"
      - label - the clicked link's href value.
    */

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
      {...rest}
    >
      {children}
    </Box>
  );
});

HomePageLink.displayName = "HomePageLink";

export default HomePageLink;
