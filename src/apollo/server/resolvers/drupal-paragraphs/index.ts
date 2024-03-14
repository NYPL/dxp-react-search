import { mergeResolvers } from "@graphql-tools/merge";
import { audioEmbedResolver } from "./audio-embed";
import { blogCardGridResolver } from "./blog-card-grid";
import { buttonLinksResolver } from "./button-links";
import { cardGridResolver } from "./card-grid";
import { donationResolver } from "./donation";
import { donorCreditResolver } from "./donor-credit";
import { emailSubscriptionResolver } from "./email-subscription";
import { externalSearchResolver } from "./external-search";
import { googleMapEmbedResolver } from "./google-map-embed";
import { heroResolver } from "./hero";
import { imageResolver } from "./image";
import { jumbotronResolver } from "./jumbotron";
import { relatedContentResolver } from "./related-content";
import { slideshowResolver } from "./slideshow";
import { socialEmbedResolver } from "./social-embed";
import { textResolver } from "./text";
import { textWithImageResolver } from "./text-with-image";
import { videoResolver } from "./video";

export const drupalParagraphsResolvers = mergeResolvers([
  audioEmbedResolver,
  blogCardGridResolver,
  buttonLinksResolver,
  cardGridResolver,
  donationResolver,
  donorCreditResolver,
  emailSubscriptionResolver,
  externalSearchResolver,
  googleMapEmbedResolver,
  heroResolver,
  imageResolver,
  jumbotronResolver,
  relatedContentResolver,
  slideshowResolver,
  socialEmbedResolver,
  textResolver,
  textWithImageResolver,
  videoResolver,
]);
