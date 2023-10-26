import { mergeResolvers } from "@graphql-tools/merge";

import { HomePageCardGridResolver } from "./home-page-card-grid-resolver";
import { HomePageEventResolver } from "./home-page-event-resolver";
import { HomePageEventsResolver } from "./home-page-events-resolver";
import { HomePageHeroResolver } from "./home-page-hero-resolver";
import { HomePageSlideshowResolver } from "./home-page-slideshow-resolver";
import { HomePageSpotlightResolver } from "./home-page-spotlight-resolver";
import { HomePageSpotlightItemResolver } from "./home-page-spotlight-item-resolver";
import { HomePageStaffPicksResolver } from "./home-page-staff-picks-resolver";

export const drupalHomePageResolvers = mergeResolvers([
  HomePageCardGridResolver,
  HomePageEventResolver,
  HomePageEventsResolver,
  HomePageHeroResolver,
  HomePageSlideshowResolver,
  HomePageSpotlightResolver,
  HomePageSpotlightItemResolver,
  HomePageStaffPicksResolver,
]);
