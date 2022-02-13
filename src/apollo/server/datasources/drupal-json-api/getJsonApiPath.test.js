import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "./getJsonApiPath";

describe("getJsonApiPath", () => {
  //
  test("Individual blog resource with included fields", async () => {
    const includedFields = [
      "field_ers_media_image.field_media_image",
      "field_main_content.field_ers_media_item.field_media_image",
      "field_erm_location",
      // Link Card List
      "field_main_content.field_erm_link_cards",
      "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
      // Catalog List
      "field_main_content.field_erm_remote_items",
    ];

    const apiPath = getIndividualResourceJsonApiPath(
      "node",
      "blog",
      includedFields,
      "da0f1c99-94a8-4a00-b88b-c0472bb45e50"
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/blog/da0f1c99-94a8-4a00-b88b-c0472bb45e50?include=field_ers_media_image.field_media_image,field_main_content.field_ers_media_item.field_media_image,field_erm_location,field_main_content.field_erm_link_cards,field_main_content.field_erm_link_cards.field_ers_image.field_media_image,field_main_content.field_erm_remote_items&jsonapi_include=1"
    );
  });

  test("Individual taxonomy resource", async () => {
    const apiPath = getIndividualResourceJsonApiPath(
      "taxonomy_term",
      "subject",
      null,
      "b32835f7-19c5-4bcc-b143-73f2bf0d0f3e"
    );

    expect(apiPath).toEqual(
      "/jsonapi/taxonomy_term/subject/b32835f7-19c5-4bcc-b143-73f2bf0d0f3e?jsonapi_include=1"
    );
  });

  // Collection
  test("Location collection limit to 5 items", async () => {
    const args = {
      limit: 5,
      pageNumber: 1,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "node",
      "library",
      null,
      null,
      null,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/library?page[offset]=0&page[limit]=5&jsonapi_include=1"
    );
  });

  test("Get all blogs with included fields, 10 per page, sorted by created asc", async () => {
    const includedFields = [
      "field_ers_media_image.field_media_image",
      "field_main_content.field_ers_media_item.field_media_image",
      "field_erm_location",
      // Link Card List
      "field_main_content.field_erm_link_cards",
      "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
      // Catalog List
      "field_main_content.field_erm_remote_items",
    ];

    const args = {
      limit: 10,
      pageNumber: 1,
      sort: {
        field: "created",
        direction: "ASC",
      },
    };

    const sort = {
      field: args.sort.field,
      direction: args.sort.direction,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "node",
      "blog",
      includedFields,
      null,
      sort,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/blog?include=field_ers_media_image.field_media_image,field_main_content.field_ers_media_item.field_media_image,field_erm_location,field_main_content.field_erm_link_cards,field_main_content.field_erm_link_cards.field_ers_image.field_media_image,field_main_content.field_erm_remote_items&page[offset]=0&page[limit]=10&sort=created&jsonapi_include=1"
    );
  });

  test("Location collection filtered by libraryType", async () => {
    const args = {
      filter: {
        libraryType: {
          fieldName: "field_ts_library_type",
          operator: "IN",
          value: ["hub", "neighborhood"],
        },
      },
      limit: 120,
      pageNumber: 1,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "node",
      "library",
      null,
      args.filter,
      null,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/library?filter[field_ts_library_type][condition][path]=field_ts_library_type&filter[field_ts_library_type][condition][value][0]=hub&filter[field_ts_library_type][condition][value][1]=neighborhood&filter[field_ts_library_type][condition][operator]=IN&page[offset]=0&page[limit]=120&jsonapi_include=1"
    );
  });

  test("Filter for 6 featured blog collection resources", async () => {
    const args = {
      filter: {
        featured: {
          fieldName: "field_bs_featured",
          operator: "=",
          value: true,
        },
      },
      limit: 6,
      pageNumber: 1,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "node",
      "blog",
      null,
      args.filter,
      null,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/blog?filter[field_bs_featured]=1&page[offset]=0&page[limit]=6&jsonapi_include=1"
    );
  });

  test("Filter library collection by one internal slugs", async () => {
    const args = {
      filter: {
        internalSlug: {
          fieldName: "field_ts_slug",
          operator: "IN",
          value: ["125th-street"],
        },
      },
      limit: 10,
      pageNumber: 1,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "node",
      "library",
      null,
      args.filter,
      null,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/library?filter[field_ts_slug][condition][path]=field_ts_slug&filter[field_ts_slug][condition][value][0]=125th-street&filter[field_ts_slug][condition][operator]=IN&page[offset]=0&page[limit]=10&jsonapi_include=1"
    );
  });

  test("Filter libraries collection by two internal slugs", async () => {
    const args = {
      filter: {
        internalSlug: {
          fieldName: "field_ts_slug",
          operator: "IN",
          value: ["125th-street", "allerton"],
        },
      },
      limit: 10,
      pageNumber: 1,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "node",
      "library",
      null,
      args.filter,
      null,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/library?filter[field_ts_slug][condition][path]=field_ts_slug&filter[field_ts_slug][condition][value][0]=125th-street&filter[field_ts_slug][condition][value][1]=allerton&filter[field_ts_slug][condition][operator]=IN&page[offset]=0&page[limit]=10&jsonapi_include=1"
    );
  });

  test("Filter blog collection by 1 channel with included fields", async () => {
    const includedFields = [
      "field_ers_media_image.field_media_image",
      "field_main_content.field_ers_media_item.field_media_image",
      "field_erm_location",
      // Link Card List
      "field_main_content.field_erm_link_cards",
      "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
      // Catalog List
      "field_main_content.field_erm_remote_items",
    ];

    const args = {
      filter: {
        channels: {
          fieldName: "field_erm_channels",
          operator: "=",
          value: ["725"],
          conjunction: "AND",
        },
      },
      limit: 10,
      pageNumber: 1,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "node",
      "blog",
      includedFields,
      args.filter,
      null,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/node/blog?filter[field_erm_channels-725-and][group][conjunction]=AND&filter[field_erm_channels.meta.drupal_internal__target_id][condition][path]=field_erm_channels.meta.drupal_internal__target_id&filter[field_erm_channels.meta.drupal_internal__target_id][condition][value]=725&filter[field_erm_channels.meta.drupal_internal__target_id][condition][memberOf]=field_erm_channels-725-and&include=field_ers_media_image.field_media_image,field_main_content.field_ers_media_item.field_media_image,field_erm_location,field_main_content.field_erm_link_cards,field_main_content.field_erm_link_cards.field_ers_image.field_media_image,field_main_content.field_erm_remote_items&page[offset]=0&page[limit]=10&jsonapi_include=1"
    );
  });

  // Taxonomy
  test("Get featured channels, limit 6, sorted by name asc", async () => {
    const args = {
      filter: {
        featured: {
          fieldName: "field_bs_featured",
          operator: "=",
          value: true,
        },
      },
      limit: 6,
      pageNumber: 1,
    };

    const sortBy = {
      field: "name",
      direction: "ASC",
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "taxonomy_term",
      "channel",
      null,
      args.filter,
      sortBy,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/taxonomy_term/channel?filter[field_bs_featured]=1&page[offset]=0&page[limit]=6&sort=name&jsonapi_include=1"
    );
  });

  test("Get 50 taxonomy terms sorted by name desc", async () => {
    const args = {
      limit: 50,
      pageNumber: 1,
      sort: {
        field: "name",
        direction: "DESC",
      },
    };

    const sort = {
      field: args.sort.field,
      direction: args.sort.direction,
    };

    const pagination = {
      limit: args.limit,
      pageNumber: args.pageNumber,
    };

    const apiPath = getCollectionResourceJsonApiPath(
      "taxonomy_term",
      "subject",
      null,
      null,
      sort,
      pagination
    );

    expect(apiPath).toEqual(
      "/jsonapi/taxonomy_term/subject?page[offset]=0&page[limit]=50&sort=-name&jsonapi_include=1"
    );
  });
});
