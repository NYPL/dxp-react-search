import { mergeResolvers } from "@graphql-tools/merge";
import { homePageResolver } from "./home-page";
import { homePageCardGridResolver } from "./home-page-card-grid";
import { homePageEventsResolver } from "./home-page-events";
import { homePageHeroResolver } from "./home-page-hero";
import { homePageSlideshowResolver } from "./home-page-slideshow";
import { homePageSpotlightResolver } from "./home-page-spotlight";
import { homePageStaffPicksResolver } from "./home-page-staff-picks";

export const homePageResolvers = mergeResolvers([
  homePageResolver,
  homePageCardGridResolver,
  homePageEventsResolver,
  homePageHeroResolver,
  homePageSlideshowResolver,
  homePageSpotlightResolver,
  homePageStaffPicksResolver,
]);
