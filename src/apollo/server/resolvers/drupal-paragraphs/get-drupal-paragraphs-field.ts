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
  const isMultiValueField = Array.isArray(field) ? true : false;
  // Multi value fields will return an empty array, `[]` if no paragraphs are added.
  if ("data" in field) {
    if (field.data?.length === 0) {
      return null;
    }

    // Single value fields will return null, `null` if no paragraph is added.
    if (field.data === null) {
      return null;
    }
  }

  // Filter out unpublished paragraphs, for multi value field only.
  if (Array.isArray(field)) {
    console.log("isMultiValueField", isMultiValueField);

    return field.filter((paragraphItem: DrupalJsonApiEntityResource) =>
      paragraphItem.hasOwnProperty("status")
    );
  }

  return field;
}
