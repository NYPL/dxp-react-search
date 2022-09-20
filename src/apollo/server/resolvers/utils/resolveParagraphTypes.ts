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
      resolvedObjectType = "HomePageHeroComponent";
      break;
    case "hp_events":
      resolvedObjectType = "HomePageEventsComponent";
      break;
    case "hp_card_grid":
      resolvedObjectType = "HomePageCardGridComponent";
      break;
    case "hp_spotlight":
      resolvedObjectType = "HomePageSpotlightComponent";
      break;
    case "hp_staff_picks":
      resolvedObjectType = "HomePageStaffPicksComponent";
      break;
    case "hp_slideshow":
      resolvedObjectType = "HomePageSlideshowComponent";
      break;
  }
  return resolvedObjectType;
}
