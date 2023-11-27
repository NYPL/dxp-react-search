export interface DrupalJsonApiEntityResource {
  id: string;
  drupal_internal__revision_id: string;
  path: { alias: string; pid: string; langcode: string };
  type: string;
  status: boolean;
  langcode: string;
  changed: string;
  revision_created: string;
  revision_log_message: string;
  revision_translation_affected: boolean;
  default_langcode: boolean;
}

export interface DrupalJsonApiTextField {
  value: string;
  format: string;
  processed: string;
}

export interface DrupalJsonApiBreadcrumbItem {
  id: string;
  title: string;
  url: string;
}

export interface DrupalJsonApiMediaImageResource {
  type:
    | "media--image"
    | "media--digital_collections_image"
    | "media--remote_catalog_image";
  data?: null;
  field_media_image_caption: string;
  field_media_image_credit_html: DrupalJsonApiTextField;
  field_media_dc_link?: { url: string };
  field_media_image_link_url_only?: { url: string };
}

export interface DrupalJsonApiMediaRemoteVideoOembedResource {
  data?: null;
  field_media_oembed_video: string;
}

export type DrupalJsonApiLinkResource = {
  uri: string;
  url: string;
  title: string;
};
