import { DrupalJsonApiEntityResource } from "./../drupal-types";

/*
 * Handles no content and also filtering unpublished paragraphs for single and multivalue fields.
 */
export function getDrupalParagraphsField(field: any) {
  const isMultiValueField = Array.isArray(field) ? true : false;

  // Multi value fields will return an empty array, `[]` if no paragraphs are added.
  if (field.data?.length === 0) {
    return null;
  }

  // Single value fields will return null, `null` if no paragraphs are added.
  if (field.data === null) {
    return null;
  }

  // Filter out unpublished paragraphs, for multi value field only.
  if (isMultiValueField) {
    console.log("isMultiValueField", isMultiValueField);

    return field.filter((paragraphItem: DrupalJsonApiEntityResource) =>
      paragraphItem.hasOwnProperty("status")
    );
  }

  return field;
}
