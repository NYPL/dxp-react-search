const probe = require("probe-image-size");

async function getImageDimensions(uri) {
  try {
    const response = await probe(uri);
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function imageResolver(image) {
  if (image.type === "media--digital_collections_image") {
    const uri = `https://images.nypl.org/index.php?id=${image.field_media_dc_id}&t=w`;
    const imageStyles = [
      "1_1_960",
      "2_1_320",
      "2_1_960",
      "medium",
      "max_width_960",
    ];
    // @TODO add this to json:api in future work.
    // Get the image dimensions.
    const imageInfo = await getImageDimensions(uri);

    return {
      id: image.id,
      alt: image.field_media_alt_text,
      uri: uri,
      transformations: () => {
        let transformations = [];
        imageStyles.forEach((imageStyle) => {
          transformations.push({
            id: `${image.id}__${imageStyle}`,
            label: imageStyle,
            uri: uri,
          });
        });
        return transformations;
      },
      height: imageInfo.height,
      width: imageInfo.width,
    };
  } else {
    const mediaImage = image.field_media_image;
    return {
      id: mediaImage.id,
      alt: mediaImage.meta.alt,
      uri: () => {
        if (
          mediaImage.uri.url &&
          mediaImage.uri.url.includes("sites/default")
        ) {
          return `http://localhost:8080${mediaImage.uri.url}`;
        } else {
          return mediaImage.uri.url;
        }
      },
      transformations: () => {
        let transformations = [];
        mediaImage.image_style_uri.forEach((imageStyle) => {
          for (const [label, uri] of Object.entries(imageStyle)) {
            transformations.push({
              id: `${mediaImage.id}__${label}`,
              label: label,
              uri: uri,
            });
          }
        });
        return transformations;
      },
      ...(mediaImage.meta.width && { width: mediaImage.meta.width }),
      ...(mediaImage.meta.height && { height: mediaImage.meta.height }),
    };
  }
}

export function drupalParagraphsResolver(field, typesInQuery) {
  // Drupal json:api will return all paragraphs for the field.
  // So we first reduce this array of objects only to those paragraphs
  // that we're requested by the gql query.
  const requestedParagraphs = field.reduce((accumulator, item) => {
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
  }, []);

  // Build an array of paragraph objects mapping to the specific components.
  let items = [];
  requestedParagraphs.map((item) => {
    let paragraphComponent;
    let paragraphTypeName = item.type.replace("paragraph--", "");
    let oembedBaseUrl;
    let embedCode;

    switch (item.type) {
      case "paragraph--text_with_image":
        const textWithImageMedia = item.field_ers_media_item;
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
          image: imageResolver(item.field_ers_media_item),
        };
        break;
      case "paragraph--video":
        //let oembedBaseUrl;
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
          oembedBaseUrl = "https://www.youtube.com/oembed?url";
        }
        // Vimeo
        // Ex oEmbed req: https://vimeo.com/api/oembed.json?url=https://vimeo.com/563015803
        if (
          item.field_ers_media_item.field_media_oembed_video.includes("vimeo")
        ) {
          oembedBaseUrl = "https://vimeo.com/api/oembed.json?url";
        }
        embedCode = item.field_ers_media_item.field_media_oembed_video;
        const videoHtml = fetchOembedData(oembedBaseUrl, embedCode);

        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          description: item.field_tfls_description?.processed,
          html: videoHtml,
        };
        break;
      case "paragraph--slideshow":
        const slideshowImages = [];
        item.field_erm_media_items.map((imageItem) => {
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
        // Soundcloud
        if (
          item.field_ers_media_item.field_media_oembed_remote_audio.includes(
            "soundcloud"
          )
        ) {
          oembedBaseUrl = "https://soundcloud.com/oembed?url";
        }
        // Spotify
        if (
          item.field_ers_media_item.field_media_oembed_remote_audio.includes(
            "spotify"
          )
        ) {
          oembedBaseUrl = "https://open.spotify.com/oembed?url";
        }
        // Libsyn
        // Ex: https://sandbox-d8.nypl.org/api/oembed-libsyn?url=https://html5-player.libsyn.com/embed/episode/id/20880053
        if (
          item.field_ers_media_item.field_media_oembed_remote_audio.includes(
            "libsyn"
          )
        ) {
          // @TODO use env var for instance of drupal?
          oembedBaseUrl = "https://sandbox-d8.nypl.org/api/oembed-libsyn?url";
        }
        embedCode = item.field_ers_media_item.field_media_oembed_remote_audio;
        const audioHtml = fetchOembedData(oembedBaseUrl, embedCode);

        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          html: audioHtml,
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
        // Media image.
        // This field is a multivalue link field, so it will be an [].
        if (
          mediaItem.type === "media--image" &&
          mediaItem.field_media_image_link.length > 0
        ) {
          imageLink = mediaItem.field_media_image_link[0].url;
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
          image: imageResolver(mediaItem),
        };
        break;
      case "paragraph--link_card_list":
        const cardItems = [];
        item.field_erm_link_cards.map((cardItem) => {
          cardItems.push({
            id: cardItem.id,
            title: cardItem.field_ts_heading,
            description: cardItem.field_tfls_description
              ? cardItem.field_tfls_description.processed
              : null,
            link: cardItem.field_ls_link.url,
            image: imageResolver(cardItem.field_ers_image),
          });
        });
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          description: item.field_tfls_description.processed,
          items: cardItems,
        };
        break;
      case "paragraph--catalog_list":
        const catalogItems = [];
        item.field_erm_remote_items.map((catalogItem) => {
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
    }
    items.push(paragraphComponent);
  });
  return items;
}

async function fetchOembedData(oembedBaseUrl, embedCode) {
  console.log(oembedBaseUrl);
  try {
    const response = await fetch(`${oembedBaseUrl}=${embedCode}`);
    const json = await response.json();
    return json.html;
  } catch (e) {
    console.error(e);
  }
}

export function resolveParagraphTypes(objectType) {
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
  }
  return resolvedObjectType;
}
