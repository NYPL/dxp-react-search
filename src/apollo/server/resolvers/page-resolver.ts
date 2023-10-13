import { getIndividualResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";
import {
  DrupalJsonApiEntityResource,
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "./drupal-types";
import { resolveImage } from "./utils/resolveImage";

export interface PageJsonApiResource {
  id: string;
  title: string;
  field_tfls_summary_description: DrupalJsonApiTextField;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  // @TODO Need a generic drupal paragraphs type.
  field_main_content: any;
}

export const pageDrupalParagraphsMap: { [name: string]: string } = {
  "paragraph--link_card_list": "CardGrid",
  "paragraph--image": "ImageComponent",
  "paragraph--text": "Text",
  "paragraph--text_with_image": "TextWithImage",
  "paragraph--video": "Video",
  "paragraph--button_links": "ButtonLinks",
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
        // Main content: Image
        "field_main_content.field_ers_media_item.field_media_image",
        // Main content: Video
        "field_main_content.field_ers_media_item",
        // Button Links
        "field_main_content.field_erm_button_links",
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
    image: (page: PageJsonApiResource) =>
      page.field_ers_media_image.data !== null
        ? resolveImage(page.field_ers_media_image)
        : null,
    mainContent: (page: PageJsonApiResource) =>
      page.field_main_content.filter(
        (paragraphItem: DrupalJsonApiEntityResource) =>
          paragraphItem.hasOwnProperty("status")
      ),
  },
  PageMainContent: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      pageDrupalParagraphsMap[object.type] || null,
  },
};
