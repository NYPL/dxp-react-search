import { mergeResolvers } from "@graphql-tools/merge";
import { AudioEmbedResolver } from "./audio-embed-resolver";
import { BlogCardGridResolver } from "./blog-card-grid-resolver";
import { ButtonLinksResolver } from "./button-links-resolver";
import { CardGridResolver } from "./card-grid-resolver";
import { DonationResolver } from "./donation-resolver";
import { DonorCreditResolver } from "./donor-credit";
import { EmailSubscriptionResolver } from "./email-subscription";
import { ExternalSearchResolver } from "./external-search";
import { GoogleMapEmbedResolver } from "./google-map-embed-resolver";
import { HeroResolver } from "./hero-resolver";
import { ImageResolver } from "./image-resolver";
import { JumbotronResolver } from "./jumbotron-resolver";
import { SlideshowResolver } from "./slideshow-resolver";
import { SocialEmbedResolver } from "./social-embed-resolver";
import { TextResolver } from "./text-resolver";
import { TextWithImageResolver } from "./text-with-image-resolver";
import { VideoResolver } from "./video-resolver";

export const drupalParagraphsResolvers = mergeResolvers([
  AudioEmbedResolver,
  BlogCardGridResolver,
  ButtonLinksResolver,
  CardGridResolver,
  DonationResolver,
  DonorCreditResolver,
  EmailSubscriptionResolver,
  ExternalSearchResolver,
  GoogleMapEmbedResolver,
  HeroResolver,
  ImageResolver,
  JumbotronResolver,
  SlideshowResolver,
  SocialEmbedResolver,
  TextResolver,
  TextWithImageResolver,
  VideoResolver,
]);
