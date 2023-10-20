import * as React from "react";

export interface DrupalParagraphs<T> {
  /** The content for a paragraphs field. An array of objects. */
  content: DrupalParagraphsItem | DrupalParagraphsItem[];
  /** A map of components, keyed by type name. */
  components: T;
}

export interface DrupalParagraphsItem {
  id: string;
  __typename: string;
}

export default function DrupalParagraphs<T extends Record<string, any>>({
  content,
  components,
}: DrupalParagraphs<T>) {
  // In the case where the query returned null for a page section
  if (content === null) return null;
  if (content) {
    if (Array.isArray(content)) {
      return (
        <>
          {content.map((item: DrupalParagraphsItem) => {
            if (typeof components[item["__typename"]] !== "undefined") {
              const componentType = components[item["__typename"]];

              return React.createElement(componentType, {
                key: `${item.__typename}-${item.id}`,
                ...item,
              });
            }
          })}
        </>
      );
    }
    if (typeof components[content["__typename"]] !== "undefined") {
      const componentType = components[content["__typename"]];
      return React.createElement(componentType, {
        key: `${content.__typename}-${content.id}`,
        ...content,
      });
    }
  }
  console.warn("Content type not supported in DrualParagraph: ", content);
  return null;
}
