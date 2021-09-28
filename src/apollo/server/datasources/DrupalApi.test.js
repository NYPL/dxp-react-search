// Datasource
import DrupalApi from "./DrupalApi";

describe("DrupalApi", () => {
  /*afterEach(() => {
    jest.clearAllMocks();
  });
  */

  test("buildJsonApiPath builds the correct url for content type", async () => {
    const drupalApi = new DrupalApi();
    const apiPath = await drupalApi.buildJsonApiPath(
      "blog"
      /*args.limit,
      args.pageNumber,
      args.filter,
      args.sortBy,
      graphqlFields(info)
      */
    );
    expect(apiPath).toEqual("/jsonapi/node/blog?jsonapi_include=1");
  });

  test("buildJsonApiPath builds the correct url for filter by featured", async () => {
    const drupalApi = new DrupalApi();
    const filter = { featured: true };
    const apiPath = await drupalApi.buildJsonApiPath(
      "blog",
      null,
      null,
      filter
      /*args.limit,
      args.pageNumber,
      args.filter,
      args.sortBy,
      graphqlFields(info)
      */
    );
    expect(apiPath).toEqual(
      "/jsonapi/node/blog?jsonapi_include=1&filter[field_bs_featured]=1"
    );
  });
});
