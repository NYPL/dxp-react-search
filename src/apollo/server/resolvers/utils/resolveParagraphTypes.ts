export default function resolveParagraphTypes(objectType: string) {
  let resolvedObjectType;
  switch (objectType) {
    case "text_with_image":
      resolvedObjectType = "TextWithImage";
      break;
    case "video":
      resolvedObjectType = "Video";
      break;
    case "slideshow":
      resolvedObjectType = "Slideshow";
      break;
    case "text":
      resolvedObjectType = "Text";
      break;
    case "social":
      resolvedObjectType = "SocialEmbed";
      break;
    case "google_map":
      resolvedObjectType = "GoogleMapEmbed";
      break;
    case "audio":
      resolvedObjectType = "AudioEmbed";
      break;
    case "image":
      resolvedObjectType = "ImageComponent";
      break;
    case "link_card_list":
      resolvedObjectType = "CardList";
      break;
    case "catalog_list":
      resolvedObjectType = "CatalogList";
      break;
    case "hp_hero":
      resolvedObjectType = "HpHero";
  }
  return resolvedObjectType;
}
