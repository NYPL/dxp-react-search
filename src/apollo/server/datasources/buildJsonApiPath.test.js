import { buildAllNodesByContentTypeJsonApiPath } from "./buildJsonApiPath";

describe("buildJsonApiPath", () => {
  /*afterEach(() => {
    jest.clearAllMocks();
  });
  */

  test("buildAllNodesByContentTypeJsonApiPath builds the correct url for content type", async () => {
    const limit = 10;
    const pageNumber = 1;
    const filter = {
      //internalSlug: ["test1", "test2"],
      channels: ["714"],
    };
    const queryFields = {
      items: {
        image: {
          id: {},
          uri: {},
          alt: {},
          transformations: [Object],
          __typename: {},
        },
      },
    };
    const apiPath = buildAllNodesByContentTypeJsonApiPath(
      "blog",
      limit,
      pageNumber,
      filter,
      null,
      queryFields
      /*
      args.sortBy,
      graphqlFields(info)
      */
    );
    console.log(apiPath);
    //expect(apiPath).toEqual("/jsonapi/node/blog?jsonapi_include=1");
  });
});
