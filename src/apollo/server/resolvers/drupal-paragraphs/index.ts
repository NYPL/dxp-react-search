import { mergeResolvers } from "@graphql-tools/merge";
import { CardGridResolver } from "./card-grid-resolver";
import { DonationResolver } from "./donation-resolver";
import { ImageResolver } from "./image-resolver";
import { JumbotronResolver } from "./jumbotron-resolver";
import { TextResolver } from "./text-resolver";
import { TextWithImageResolver } from "./text-with-image-resolver";
import { VideoResolver } from "./video-resolver";
import { BlogCardGridResolver } from "./blog-card-grid-resolver";
import { ButtonLinksResolver } from "./button-links-resolver";
import { ExternalSearchResolver } from "./external-search";
import { EmailSubscriptionResolver } from "./email-subscription";
import { DonorCreditResolver } from "./donor-credit";
import { SocialEmbedResolver } from "./social-embed-resolver";
import { GoogleMapEmbedResolver } from "./google-map-embed-resolver";
import { AudioEmbedResolver } from "./audio-embed-resolver";

export const drupalParagraphsResolvers = mergeResolvers([
  AudioEmbedResolver,
  CardGridResolver,
  DonationResolver,
  ImageResolver,
  JumbotronResolver,
  TextResolver,
  TextWithImageResolver,
  VideoResolver,
  BlogCardGridResolver,
  ButtonLinksResolver,
  ExternalSearchResolver,
  EmailSubscriptionResolver,
  DonorCreditResolver,
  SocialEmbedResolver,
  GoogleMapEmbedResolver,
]);
