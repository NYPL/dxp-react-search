import * as React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

export type AnalyticsEventActions = {
  cta_subsection: string;
  cta_text: string | null;
  cta_position: string | null;
};

export interface HomePageLinkProps {
  /** ID used for accessibility purposes. */
  id?: string;
  /** Any child node passed to the component. */
  children?: React.ReactNode;
  /** The `href` attribute for the anchor element. */
  href?: string;
  /** The values send to Adobe Analytics CTA Event */
  analyticsEventActions: AnalyticsEventActions;
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
  const {
    id,
    children,
    href,
    analyticsEventActions,
    gaEventActionName,
    variant,
    tabIndex,
    ...rest
  } = props;

  const hoverStyle = useStyleConfig("Link", {
    variant,
  });

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault;

    // Google Analytics: Event CTA datalayer.
    if (window !== undefined) {
      const gaEventCategory = "Homepage";

      if (typeof window.gtag === "function") {
        window.gtag("event", gaEventActionName, {
          event_category: gaEventCategory,
          event_label: href,
        });
      }
      // Clear the data layer of previous values.
      window.adobeDataLayer.push({ event_data: null });

      // Push the new values from the click event.
      window.adobeDataLayer.push({
        event: "send_event",
        event_data: {
          name: "cta_click",
          cta_section: "Homepage",
          ...analyticsEventActions,
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
