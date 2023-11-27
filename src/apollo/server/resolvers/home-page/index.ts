import { mergeResolvers } from "@graphql-tools/merge";

import { HomePageCardGridResolver } from "./home-page-card-grid-resolver";
import { HomePageEventsResolver } from "./home-page-events-resolver";
import { HomePageHeroResolver } from "./home-page-hero-resolver";
import { HomePageSlideshowResolver } from "./home-page-slideshow-resolver";
import { HomePageSpotlightResolver } from "./home-page-spotlight-resolver";
import { HomePageStaffPicksResolver } from "./home-page-staff-picks-resolver";

export const drupalHomePageResolvers = mergeResolvers([
  HomePageCardGridResolver,
  HomePageEventsResolver,
  HomePageHeroResolver,
  HomePageSlideshowResolver,
  HomePageSpotlightResolver,
  HomePageStaffPicksResolver,
]);
