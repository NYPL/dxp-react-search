import { DrupalJsonApiParams } from "drupal-jsonapi-params";

function filterMultiValueEntityRef(apiParams, item, fieldName) {
  const groupName = `${fieldName}-${item}-and`;
  const filterPath = `${fieldName}.meta.drupal_internal__target_id`;
  // addGroup(name, conjunction, memberOf)
  apiParams.addGroup(groupName, "AND");
  // addFilter(path, value, operator, group)
  apiParams.addFilter(filterPath, item, "=", groupName);
  return apiParams;
}

export function buildAllNodesByContentTypeJsonApiPath(
  contentType,
  limit,
  pageNumber,
  filter,
  sortBy,
  queryFields
) {
  let apiParams = new DrupalJsonApiParams();

  //
  apiParams.addCustomParam({ jsonapi_include: 1 });

  // Check for fields to include.
  let includeFields = [];
  if ("image" in queryFields.items) {
    includeFields.push("field_ers_media_image.field_media_image");
  }
  if ("locations" in queryFields.items) {
    includeFields.push("field_erm_location");
  }

  // @TODO cleanup
  if (contentType === "blog") {
    // Add includeFields.
    includeFields.push([
      "field_main_content.field_ers_media_item.field_media_image",
      // Link Card List
      "field_main_content.field_erm_link_cards",
      "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
    ]);
  }

  // Add include
  if (includeFields.length) {
    apiParams.addInclude(includeFields);
  }

  // Pagination
  if (limit && pageNumber) {
    // Calculate offset
    let offset = 0;
    if (pageNumber === 2) {
      offset = limit;
    } else {
      offset = limit * (pageNumber - 1);
    }
    // Add page offset and page limit.
    apiParams.addCustomParam({ page: { offset: offset, limit: limit } });
  }

  // Filters
  // Most popular
  if (filter && "mostPopular" in filter) {
    // addFilter(path, value, operator, group)
    // Filter for nodes that have a not null value for most popular field.
    apiParams.addFilter("field_is_most_popular", null, "IS NOT NULL");
    // Sort by most popular field.
    apiParams.addSort("field_is_most_popular", "ASC");
  }
  // Featured
  if (filter && "featured" in filter && filter.featured !== null) {
    apiParams.addFilter("field_bs_featured", "1");
  }
  // Internal slug.
  if (filter && "internalSlug" in filter && filter.internalSlug) {
    apiParams.addFilter("field_ts_slug", filter.internalSlug, "IN");
  }

  // Entity reference filters
  // Channels filter.
  if (filter && "channels" in filter && filter.channels) {
    filter.channels.map((channel) => {
      filterMultiValueEntityRef(apiParams, channel, "field_erm_channels");
    });
  }
  // Subjects
  if (filter && "subjects" in filter && filter.subjects) {
    filter.subjects.map((subject) => {
      filterMultiValueEntityRef(apiParams, subject, "field_erm_subjects");
    });
  }
  // Libraries
  if (filter && "libraries" in filter && filter.libraries) {
    filter.libraries.map((library) => {
      filterMultiValueEntityRef(apiParams, library, "field_erm_location");
    });
  }
  // Divisions
  if (filter && "divisions" in filter && filter.divisions) {
    filter.divisions.map((division) => {
      filterMultiValueEntityRef(apiParams, division, "field_erm_divisions");
    });
  }
  // Audience by age
  if (filter && "audiences" in filter && filter.audiences) {
    filter.audiences.map((audience) => {
      filterMultiValueEntityRef(apiParams, audience, "field_erm_audience");
    });
  }

  // Locations specific
  if (filter && "libraryType" in filter && filter.libraryType) {
    apiParams.addFilter("field_ts_library_type", filter.libraryType, "IN");
    apiParams.addSort("title", "ASC");
  }

  // Sort
  if (sortBy) {
    apiParams.addSort("created", "DESC");
  }

  const urlencodedQueryString = apiParams.getQueryString({ encode: false });

  let apiPath = `/jsonapi/node/${contentType}?${urlencodedQueryString}`;
  return apiPath;
}

export function buildNodeByIdJsonApiPath(contentType, id) {
  let apiParams = new DrupalJsonApiParams();
  apiParams.addCustomParam({ jsonapi_include: 1 });

  if (contentType === "blog") {
    // Add includeFields.
    const includeFields = [
      "field_ers_media_image.field_media_image",
      "field_main_content.field_ers_media_item.field_media_image",
      "field_erm_location",
      // Link Card List
      "field_main_content.field_erm_link_cards",
      "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
    ];
    // Add include
    if (includeFields.length) {
      apiParams.addInclude(includeFields);
    }
  }
  const urlencodedQueryString = apiParams.getQueryString({ encode: false });

  return `/jsonapi/node/${contentType}/${id}?${urlencodedQueryString}`;
}
