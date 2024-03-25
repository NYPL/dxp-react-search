import { getIndividualResourceJsonApiPath } from "../datasources/drupal-json-api/getJsonApiPath";
import {
  DrupalJsonApiBreadcrumbItem,
  DrupalJsonApiEntityResource,
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "./drupal-types";
import { resolveImage } from "./utils/resolveImage";
// Utils
import { getDrupalParagraphsField } from "./drupal-paragraphs/get-drupal-paragraphs-field";

export interface PageJsonApiResource {
  id: string;
  title: string;
  breadcrumbs: DrupalJsonApiBreadcrumbItem[];
  field_bs_enable_sidebar: boolean;
  field_tfls_summary_description: DrupalJsonApiTextField;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lts_hero_type: string;
  // @TODO Need a generic drupal paragraphs type.
  field_main_content: any;
  field_ers_featured: any;
}

export const pageFeaturedContentDrupalParagraphsMap: {
  [name: string]: string;
} = {
  "paragraph--hero": "Hero",
};

export const pageDrupalParagraphsMap: { [name: string]: string } = {
  "paragraph--audio": "AudioEmbed",
  "paragraph--button_links": "ButtonLinks",
  "paragraph--link_card_list": "CardGrid",
  "paragraph--email_subscription": "EmailSubscription",
  "paragraph--google_map": "GoogleMapEmbed",
  "paragraph--image": "ImageComponent",
  "paragraph--slideshow": "Slideshow",
  "paragraph--social": "SocialEmbed",
  "paragraph--text": "Text",
  "paragraph--text_with_image": "TextWithImage",
  "paragraph--video": "Video",
};

export const pageResolver = {
  Query: {
    page: async (
      _parent: PageJsonApiResource,
      args: any,
      contextValue: any
      // _info: GraphQLResolveInfo
    ) => {
      const includedFields = [
        "field_ers_media_image.field_media_image",
        "field_ers_featured",
        // Featured content: Hero: Background Image
        "field_ers_featured.field_ers_background_image.field_media_image",
        // Featured content: Hero: Foreground Image
        "field_ers_featured.field_ers_image.field_media_image",
        // Main content: Image
        "field_main_content.field_ers_media_item.field_media_image",
        // Main content: Video
        "field_main_content.field_ers_media_item",
        // Main content: Button Links
        "field_main_content.field_erm_button_links",
        // Main content: Link Card List
        "field_main_content.field_erm_link_cards",
        "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
      ];

      const isPreview = args.preview ? true : false;

      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "page",
        includedFields,
        args.id,
        args.revisionId
      );

      const response =
        await contextValue.dataSources.drupalJsonApi.getIndividualResource(
          apiPath,
          isPreview
        );

      return response;
    },
  },
  Page: {
    id: (page: PageJsonApiResource) => page.id,
    title: (page: PageJsonApiResource) => page.title,
    description: (page: PageJsonApiResource) =>
      page.field_tfls_summary_description.processed,
    breadcrumbs: (page: PageJsonApiResource) => page.breadcrumbs,
    activeTrail: (page: any) => page.active_trail,
    enableSidebar: (page: PageJsonApiResource) => page.field_bs_enable_sidebar,
    image: (page: PageJsonApiResource) =>
      page.field_ers_media_image.data !== null
        ? resolveImage(page.field_ers_media_image)
        : null,
    featuredContent: (page: PageJsonApiResource) =>
      getDrupalParagraphsField(page.field_ers_featured),
    mainContent: (page: PageJsonApiResource) =>
      getDrupalParagraphsField(page.field_main_content),
  },
  PageFeaturedContent: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      pageFeaturedContentDrupalParagraphsMap[object.type] || null,
  },
  PageMainContent: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      pageDrupalParagraphsMap[object.type] || null,
  },
  ActiveTrail: {
    items: (parent: any[]) => parent,
    ids: (parent: any[]) => parent.map((item) => item.id),
  },
  ActiveTrailItem: {
    id: (parent: any) => parent.id,
    title: (parent: any) => parent.title,
    parent: (parent: any) => parent.parent,
    activeLink: (parent: any) => parent.active_link,
  },
};
