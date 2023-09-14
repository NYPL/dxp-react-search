import React from "react";
// Component
import { Hero, Heading } from "@nypl/design-system-react-components";
import {
  default as SharedPageContainer,
  PageContainerProps,
} from "./../../shared/layouts/PageContainer";
import { EventSearchForm } from "../../../components/events";
// Content
import eventContent from "../../../__content/event";

type EventPageContainerProps = Omit<
  PageContainerProps,
  "wrapperClass" | "breadcrumbs"
>;

export default function PageContainer({
  metaTags,
  contentPrimary,
}: EventPageContainerProps) {
  return (
    <SharedPageContainer
      breadcrumbs={[
        { text: "Home", url: "/" },
        {
          text: "Events Calendar",
          url: "",
        },
      ]}
      wrapperClass="nypl--event"
      metaTags={metaTags}
      contentHeader={
        <>
          <Hero
            heroType="tertiary"
            heading={<Heading level="one" text={eventContent.meta.title} />}
            subHeaderText={eventContent.meta.description}
            backgroundColor={"section.whats-on.primary"}
            foregroundColor="ui.white"
          />
          <EventSearchForm id="event-search-form" ariaLabel="Find your event" />
        </>
      }
      contentPrimary={contentPrimary}
    />
  );
}
