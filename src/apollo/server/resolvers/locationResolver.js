import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "./../datasources/drupal-json-api/getJsonApiPath";
import resolveCollectionResponse from "./utils/resolveCollectionResponse";

const locationResolver = {
  Query: {
    allLocations: async (_, args, { dataSources }) => {
      const pagination = {
        limit: args.limit,
        pageNumber: args.pageNumber,
      };
      const apiPath = getCollectionResourceJsonApiPath(
        "node",
        args.contentType,
        null,
        args.filter,
        args.sort,
        pagination
      );
      return resolveCollectionResponse(dataSources, apiPath, args);
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
