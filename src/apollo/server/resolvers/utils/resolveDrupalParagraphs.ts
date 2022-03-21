import { JsonApiResourceObject } from "./types";
import { resolveImage } from "./resolveImage";

type ResolvedParagraph = {
  [index: string]: string | number | boolean | object | undefined | null;
};

export default function resolveDrupalParagraphs(
  paragraphResourceObjects: JsonApiResourceObject[],
  typesInQuery: string[]
): ResolvedParagraph[] {
  // Drupal json:api will return all paragraphs for the field.
  // So we first reduce this array of objects only to those paragraphs
  // that we're requested by the gql query.
  const requestedParagraphs = paragraphResourceObjects.reduce(
    (accumulator: JsonApiResourceObject[], item: JsonApiResourceObject) => {
      if (
        item.type === "paragraph--text_with_image" &&
        typesInQuery.includes("TextWithImage")
      ) {
        accumulator.push(item);
      }

      if (item.type === "paragraph--video" && typesInQuery.includes("Video")) {
        accumulator.push(item);
      }

      if (
        item.type === "paragraph--slideshow" &&
        typesInQuery.includes("Slideshow")
      ) {
        accumulator.push(item);
      }

      if (item.type === "paragraph--text" && typesInQuery.includes("Text")) {
        accumulator.push(item);
      }

      if (
        item.type === "paragraph--social" &&
        typesInQuery.includes("SocialEmbed")
      ) {
        accumulator.push(item);
      }

      if (
        item.type === "paragraph--audio" &&
        typesInQuery.includes("AudioEmbed")
      ) {
        accumulator.push(item);
      }

      if (
        item.type === "paragraph--image" &&
        typesInQuery.includes("ImageComponent")
      ) {
        accumulator.push(item);
      }

      if (
        item.type === "paragraph--link_card_list" &&
        typesInQuery.includes("CardList")
      ) {
        accumulator.push(item);
      }

      if (
        item.type === "paragraph--catalog_list" &&
        typesInQuery.includes("CatalogList")
      ) {
        accumulator.push(item);
      }

      if (
        item.type === "paragraph--google_map" &&
        typesInQuery.includes("GoogleMapEmbed")
      ) {
        accumulator.push(item);
      }

      return accumulator;
    },
    []
  );

  // Build an array of paragraph objects mapping to the specific components.
  let items: JsonApiResourceObject[] = [];
  requestedParagraphs.map((item: any) => {
    let paragraphComponent: ResolvedParagraph | undefined = undefined;
    let paragraphTypeName = (item.type as string).replace("paragraph--", "");

    switch (item.type) {
      case "paragraph--text_with_image":
        const textWithImageMedia: any = item.field_ers_media_item;
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          text: item.field_tfls_summary_descrip.processed,
          caption: textWithImageMedia.field_media_image_caption
            ? textWithImageMedia.field_media_image_caption
            : null,
          credit: textWithImageMedia.field_media_image_credit_html
            ? textWithImageMedia.field_media_image_credit_html.processed
            : null,
          image:
            item.field_ers_media_item.data === null
              ? null
              : resolveImage(item.field_ers_media_item),
        };
        break;
      case "paragraph--video":
        let videoProvider;
        let videoOembedUrl;
        // Youtube
        // Ex. oEmbed req: https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=385eTo76OzA
        if (
          item.field_ers_media_item.field_media_oembed_video.includes(
            "youtube"
          ) ||
          item.field_ers_media_item.field_media_oembed_video.includes(
            "youtu.be"
          )
        ) {
          videoProvider = "youtube";
          videoOembedUrl = "https://www.youtube.com/oembed?url";
        }
        // Vimeo
        // Ex oEmbed req: https://vimeo.com/api/oembed.json?url=https://vimeo.com/563015803
        if (
          item.field_ers_media_item.field_media_oembed_video.includes("vimeo")
        ) {
          videoProvider = "vimeo";
          videoOembedUrl = "https://vimeo.com/api/oembed.json?url";
        }

        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          description: item.field_tfls_description?.processed,
          provider: videoProvider,
          embedCode: item.field_ers_media_item.field_media_oembed_video,
          oembedUrl: videoOembedUrl,
        };
        break;
      case "paragraph--slideshow":
        const slideshowImages: any = [];
        item.field_erm_media_items.map((imageItem: any) => {
          slideshowImages.push(imageItem);
        });
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          images: slideshowImages,
        };
        break;
      case "paragraph--text":
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          text: item.field_tfls_summary_descrip.processed,
          heading: item.field_ts_heading ? item.field_ts_heading : null,
        };
        break;
      case "paragraph--social":
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          embedCode: item.field_ts_social_embed,
        };
        break;
      case "paragraph--google_map":
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          embedCode: item.field_ts_embed_code,
          accessibleDescription: item.field_ts_accessible_description,
        };
        break;
      case "paragraph--audio":
        let audioProvider;
        let audioOembedUrl;
        // Soundcloud
        if (
          item.field_ers_media_item.field_media_oembed_remote_audio.includes(
            "soundcloud"
          )
        ) {
          audioProvider = "soundcloud";
          audioOembedUrl = "https://soundcloud.com/oembed?url";
        }
        // Spotify
        if (
          item.field_ers_media_item.field_media_oembed_remote_audio.includes(
            "spotify"
          )
        ) {
          audioProvider = "spotify";
          audioOembedUrl = "https://open.spotify.com/oembed?url";
        }
        // Libsyn
        // Ex: https://sandbox-d8.nypl.org/api/oembed-libsyn?url=https://html5-player.libsyn.com/embed/episode/id/20880053
        if (
          item.field_ers_media_item.field_media_oembed_remote_audio.includes(
            "libsyn"
          )
        ) {
          audioProvider = "libsyn";
          // @TODO use env var for instance of drupal?
          audioOembedUrl = "https://sandbox-d8.nypl.org/api/oembed-libsyn?url";
        }

        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          description: item.field_tfls_description?.processed,
          provider: audioProvider,
          embedCode: item.field_ers_media_item.field_media_oembed_remote_audio,
          oembedUrl: audioOembedUrl,
        };
        break;
      case "paragraph--image":
        const mediaItem = item.field_ers_media_item;
        let imageLink = null;
        // Media DC image.
        if (
          mediaItem.type === "media--digital_collections_image" &&
          mediaItem.field_media_dc_link !== null
        ) {
          imageLink = mediaItem.field_media_dc_link.url;
        }
        // Media image & remote catalog image.
        if (
          mediaItem.type === "media--image" ||
          mediaItem.type === "media--remote_catalog_image"
        ) {
          imageLink = mediaItem.field_media_image_link_url_only?.url;
        }
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          caption: mediaItem.field_media_image_caption
            ? mediaItem.field_media_image_caption
            : null,
          credit: mediaItem.field_media_image_credit_html
            ? mediaItem.field_media_image_credit_html.processed
            : null,
          link: imageLink,
          image: resolveImage(mediaItem),
        };
        break;
      case "paragraph--link_card_list":
        const cardItems: ResolvedParagraph[] = [];
        Array.isArray(item.field_erm_link_cards) &&
          item.field_erm_link_cards.map((cardItem: any) => {
            cardItems.push({
              id: cardItem.id,
              title: cardItem.field_ts_heading,
              description: cardItem.field_tfls_description
                ? cardItem.field_tfls_description.processed
                : null,
              link: cardItem.field_ls_link.url,
              image:
                cardItem.field_ers_image.data === null
                  ? null
                  : resolveImage(cardItem.field_ers_image),
            });
          });
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          description: item.field_tfls_description?.processed,
          items: cardItems,
        };
        break;
      // @TODO Add back later.
      /*case "paragraph--catalog_list":
        const catalogItems: ResolvedParagraph[] = [];
        Array.isArray(item.field_erm_remote_items) &&
          item.field_erm_remote_items.map((catalogItem: any) => {
            catalogItems.push({
              id: catalogItem.id,
              title: catalogItem.title,
              description: catalogItem.field_tfls_summary_description
                ? catalogItem.field_tfls_summary_description.processed
                : null,
              isbn: catalogItem.field_field_ts_isbn,
              bNumber: catalogItem.field_ts_id
                ? catalogItem.field_ts_id
                : catalogItem.field_ts_ebook_id,
            });
          });
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          description: item.field_tfls_summary_description
            ? item.field_tfls_summary_description.processed
            : null,
          items: catalogItems,
        };
        break;
        */
    }
    // @ts-ignore
    items.push(paragraphComponent);
  });
  return items;
}
