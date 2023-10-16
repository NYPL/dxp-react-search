import * as React from "react";

export interface DrupalParagraphs<T> {
  /** The content for a paragraphs field. An array of objects. */
  content: DrupalParagraphsItem[];
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
  return (
    <>
      {/* @TODO This should also be able to handle a single value paragraphs field */}
      {content &&
        content.map((item: DrupalParagraphsItem) => {
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
