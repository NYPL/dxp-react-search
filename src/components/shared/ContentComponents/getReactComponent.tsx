import React from "react";
import Slideshow from "./Slideshow";
import TextWithImage from "./TextWithImage";
import Video from "./Video";
import Text from "./Text";
import SocialEmbed from "./SocialEmbed";
import AudioEmbed from "./AudioEmbed";
import GoogleMapEmbed from "./GoogleMapEmbed";
import ImageComponent from "./ImageComponent";
import CardList from "./CardList";

// @TODO Is it better to pass this in as an arg in the function? So different instances
// can use different sets of Drupal paragraphs?
const Components: any = {
  // property is the type name
  video: Video,
  text_with_image: TextWithImage,
  slideshow: Slideshow,
  text: Text,
  social: SocialEmbed,
  google_map: GoogleMapEmbed,
  audio: AudioEmbed,
  image: ImageComponent,
  link_card_list: CardList,
};

export interface ContentComponentObject {
  [key: string]: any;
}

export default function mapContentComponentToReactComponent(
  contentComponent: ContentComponentObject
) {
  if (typeof Components[contentComponent.type] !== "undefined") {
    return React.createElement(Components[contentComponent.type], {
      key: contentComponent.id,
      // Add the props.
      ...contentComponent,
    });
  }
  // @TODO what is the point of this? Just don't create a component if it doesnt exist?
  return React.createElement(
    () => (
      <div>The component {contentComponent.type} has not been created yet.</div>
    ),
    { key: contentComponent.id }
  );
}
