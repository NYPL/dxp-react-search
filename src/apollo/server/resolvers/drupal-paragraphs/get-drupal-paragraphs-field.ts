import { DrupalJsonApiEntityResource } from "./../drupal-types";

export interface DrupalJsonApiField extends DrupalJsonApiEntityResource {
  data?: null | [];
  [key: string]: any;
}

/*
 * Handles no content and also filtering unpublished paragraphs for single and multivalue fields.
 */
export function getDrupalParagraphsField<
  T extends DrupalJsonApiField | DrupalJsonApiEntityResource[]
>(field: T) {
  // The `data` property will only be present in response, if there is no content added to the field.
  if ("data" in field) {
    // Multi value fields will return an empty array, `[]` if no paragraphs are added.
    //
    // @example
    // "field_main_content": {
    //   "data": [],
    // }
    if (field.data?.length === 0) {
      return null;
    }

    // Single value fields will return `null` if no paragraph is added.
    //
    // @example
    // "field_ers_featured": {
    //   "data": null,
    // }
    if (field.data === null) {
      return null;
    }
  }

  // Only a multivalue field will return an array.
  if (Array.isArray(field)) {
    // Filter out unpublished paragraphs, for multi value field only.
    const fieldFinal = field.filter(
      (paragraphItem: DrupalJsonApiEntityResource) =>
        paragraphItem.hasOwnProperty("status")
    );

    // Add check for multivalue field, with 1 value that's unpublished ?
    //
    // @example
    // "field_main_content": [
    //   {
    //     "type": "paragraph--text",
    //     "id": "93494979-141a-4e27-8bbc-b06a729f3e5c",
    //   }
    // ]
    // @todo figure out if this is worth doing ? Without this, it will just return an empty array, `[]`.
    if (fieldFinal.length === 0) {
      return null;
    }

    return fieldFinal;
  }

  return field;
}
