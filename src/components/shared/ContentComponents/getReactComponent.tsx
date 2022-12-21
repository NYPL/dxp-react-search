import * as React from "react";
import Slideshow from "./Slideshow";
import TextWithImage from "./TextWithImage";
import Video from "./Video";
import Text from "./Text";
import SocialEmbed from "./SocialEmbed";
import AudioEmbed from "./AudioEmbed";
import GoogleMapEmbed from "./GoogleMapEmbed";
import ImageComponent from "./ImageComponent";
import CardList from "./CardList";
import CardGrid from "./../CardGrid";
import CatalogSearch from "./CatalogSearch";
import EmailSubscription from "../EmailSubscription";

// @TODO add a type for use in consuming components.
// @SEE https://stackoverflow.com/questions/12787781/type-definition-in-object-literal-in-typescript

// @TODO is it better to pass this in as an arg in the function? So different instances
// can use different sets of Drupal paragraphs?
const Components: any = {
  // Property is the __type name
  Video: Video,
  TextWithImage: TextWithImage,
  Slideshow: Slideshow,
  Text: Text,
  SocialEmbed: SocialEmbed,
  GoogleMapEmbed: GoogleMapEmbed,
  AudioEmbed: AudioEmbed,
  ImageComponent: ImageComponent,
  CardList: CardList,
  CardGrid: CardGrid,
  CatalogSearch: CatalogSearch,
  EmailSubscription: EmailSubscription,
};

export interface ContentComponentObject {
  [key: string]: any;
}

export default function mapContentComponentToReactComponent(
  contentComponent: ContentComponentObject
) {
  if (typeof Components[contentComponent["__typename"]] !== "undefined") {
    return React.createElement(Components[contentComponent["__typename"]], {
      key: contentComponent.id,
      // Add colorway values if passed.
      ...(contentComponent.colorway && {
        headingColor: contentComponent.colorway.primary,
      }),
      // Add the props.
      ...contentComponent,
    });
  }
  // @TODO what is the point of this? Just don't create a component if it doesnt exist?
  return React.createElement(
    () => (
      <div>
        The component {contentComponent["__typename"]} has not been created yet.
      </div>
    ),
    { key: contentComponent.id }
  );
}
