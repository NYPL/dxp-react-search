import {
  DrupalJsonApiTextField,
  DrupalJsonApiMediaRemoteVideoOembedResource,
} from "./../drupal-types";

function getProvider(embedUrl: string) {
  // Youtube
  // Ex. oEmbed req: https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=385eTo76OzA
  if (embedUrl.includes("youtube") || embedUrl.includes("youtu.be")) {
    return "youtube";
  }
  // Vimeo
  // Ex oEmbed req: https://vimeo.com/api/oembed.json?url=https://vimeo.com/563015803
  if (embedUrl.includes("vimeo")) {
    return "vimeo";
  }
  // Livestream
  // Ex oEmbed req: https://livestream.com/oembed?url=https://livestream.com/accounts/7326672/events/8601331/videos/188700578
  if (embedUrl.includes("livestream")) {
    return "livestream";
  }
}

function getOembedUrl(embedUrl: string) {
  // Youtube
  // Ex. oEmbed req: https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=385eTo76OzA
  if (embedUrl.includes("youtube") || embedUrl.includes("youtu.be")) {
    return "https://www.youtube.com/oembed?url";
  }
  // Vimeo
  // Ex oEmbed req: https://vimeo.com/api/oembed.json?url=https://vimeo.com/563015803
  if (embedUrl.includes("vimeo")) {
    return "https://vimeo.com/api/oembed.json?url";
  }
  // Livestream
  // Ex oEmbed req: https://livestream.com/oembed?url=https://livestream.com/accounts/7326672/events/8601331/videos/188700578
  if (embedUrl.includes("livestream")) {
    return "https://livestream.com/oembed?url";
  }
}

type DrupalJsonApiVideoParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ers_media_item: DrupalJsonApiMediaRemoteVideoOembedResource;
};

export const VideoResolver = {
  Video: {
    id: (parent: DrupalJsonApiVideoParagraph) => parent.id,
    type: () => "video",
    heading: (parent: DrupalJsonApiVideoParagraph) => parent.field_ts_heading,
    description: (parent: DrupalJsonApiVideoParagraph) =>
      parent.field_tfls_description?.processed,
    embedCode: (parent: DrupalJsonApiVideoParagraph) =>
      parent.field_ers_media_item.field_media_oembed_video,
    provider: (parent: DrupalJsonApiVideoParagraph) =>
      getProvider(parent.field_ers_media_item.field_media_oembed_video),
    oembedUrl: (parent: DrupalJsonApiVideoParagraph) =>
      getOembedUrl(parent.field_ers_media_item.field_media_oembed_video),
  },
};
