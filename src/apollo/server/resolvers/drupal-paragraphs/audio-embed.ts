import { DrupalJsonApiTextField } from "../drupal-types";

type DrupalJsonApiAudioEmbedParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ers_media_item: { field_media_oembed_remote_audio: string };
};

export async function fetchOembedApi(oembedBaseUrl: string, embedCode: string) {
  try {
    const response = await fetch(`${oembedBaseUrl}=${embedCode}`);
    const json = await response.json();
    return json.html;
  } catch (e) {
    console.error(e);
  }
}

function getProvider(url: string) {
  // Soundcloud
  if (url.includes("soundcloud")) {
    return "soundcloud";
  }
  // Spotify
  if (url.includes("spotify")) {
    return "spotify";
  }
  // Libsyn
  if (url.includes("libsyn")) {
    return "libsyn";
  }
}

function getOembedUrl(url: string) {
  // Soundcloud
  if (url.includes("soundcloud")) {
    return "https://soundcloud.com/oembed?url";
  }
  // Spotify
  if (url.includes("spotify")) {
    return "https://open.spotify.com/oembed?url";
  }
  // Libsyn
  if (url.includes("libsyn")) {
    return "https://drupal.nypl.org/api/oembed-libsyn?url";
  }
}

export const audioEmbedResolver = {
  AudioEmbed: {
    id: (parent: DrupalJsonApiAudioEmbedParagraph) => parent.id,
    type: () => "audio_embed",
    heading: (parent: DrupalJsonApiAudioEmbedParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: DrupalJsonApiAudioEmbedParagraph) =>
      parent.field_tfls_description?.processed,
    provider: (parent: DrupalJsonApiAudioEmbedParagraph) =>
      getProvider(parent.field_ers_media_item.field_media_oembed_remote_audio),
    embedCode: (parent: DrupalJsonApiAudioEmbedParagraph) =>
      parent.field_ers_media_item.field_media_oembed_remote_audio,
    oembedUrl: (parent: DrupalJsonApiAudioEmbedParagraph) =>
      getOembedUrl(parent.field_ers_media_item.field_media_oembed_remote_audio),
    html: (parent: DrupalJsonApiAudioEmbedParagraph) => {
      const oembedUrl = getOembedUrl(
        parent.field_ers_media_item.field_media_oembed_remote_audio
      );
      const embedCode =
        parent.field_ers_media_item.field_media_oembed_remote_audio;

      const html = fetchOembedApi(oembedUrl as string, embedCode);
      return html;
    },
  },
};
