const graphqlFields = require("graphql-fields");

const locationResolver = {
  Query: {
    allLocations: async (parent, args, { dataSources }, info) => {
      const response = await dataSources.drupalApi.getAllNodesByContentType(
        args.contentType,
        args.limit,
        args.pageNumber,
        args.filter,
        args.sortBy,
        graphqlFields(info)
      );

      return {
        items: response.data,
        pageInfo: {
          totalItems: response.meta ? response.meta.count : 0,
          limit: args.limit ? args.limit : null,
          pageCount: response.meta
            ? Math.ceil(response.meta.count / args.limit)
            : 120,
          pageNumber: args.pageNumber ? args.pageNumber : 1,
        },
      };
    },
  },
  Location: {
    id: (location) => location.id,
    name: (location) => location.title,
    slug: (location) => location.path.alias,
    url: (location) => location.path.alias,
    libraryType: (location) => location.field_ts_library_type,
    internalSlug: (location) => location.field_ts_slug,
    contentType: (location) => location.type,
    address: (location) => location.field_as_address,
    phone: (location) => location.field_tels_phone,
    email: (location) => location.field_es_email,
    //parentLibraryName: (location) =>
  },
  Address: {
    addressLine1: (address) => address.address_line1,
    addressLine2: (address) => address.address_line2,
    locality: (address) => address.locality,
    administrativeArea: (address) => address.administrative_area,
    postalCode: (address) => address.postal_code,
  },
};

export default locationResolver;
