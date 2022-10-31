import withDrupalRouter from "./with-drupal-router";
import { createMockClient } from "mock-apollo-client";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";

// @see https://stackoverflow.com/questions/65281989/how-to-mock-a-function-that-returns-a-function-using-jest?utm_source=pocket_mylist
// Using jest.doMock()
// @see https://stackoverflow.com/a/71614273

let mockClient = createMockClient();
let requestHandler;

// Mock initializeApollo
jest.mock("./withApollo/apollo", () => {
  return {
    initializeApollo: jest.fn(() => mockClient),
  };
});

describe("withDrupalRouter", () => {
  beforeAll(() => {
    mockClient = createMockClient();
    requestHandler = jest.fn();
    mockClient.setRequestHandler(DECOUPLED_ROUTER_QUERY, requestHandler);
  });
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 if status is SUCCESS", async () => {
    const contextMock = {
      params: {
        slug: ["/slug-200"],
      },
    };

    // Mock the apollo client query for DECOUPLED_ROUTER_QUERY.
    const decoupledRouterDataMock = {
      id: "test-success-id",
      uuid: "test-success-uuid",
      redirect: null,
      status: "SUCCESS",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (context, props) => {
      return props;
    });

    const result = await getStaticPropsMock(contextMock);

    // console.log("200");
    // console.log(result);

    expect(result.status).toEqual("SUCCESS");
  });

  it("should return redirect object is redirect is present", async () => {
    const contextMock = {
      params: {
        slug: ["/slug-redirect"],
      },
    };

    // Mock the apollo client query for DECOUPLED_ROUTER_QUERY.
    const decoupledRouterDataMock = {
      id: "test-redirect-id",
      uuid: "test-redirect-uuid",
      redirect: {
        from: "/slug-redirect",
        to: "/new-slug",
        status: "301",
      },
      status: "SUCCESS",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (context, props) => {
      return props;
    });

    const redirectMock = {
      redirect: {
        statusCode: 301,
        destination: "/new-slug",
      },
      props: {},
    };

    const result = await getStaticPropsMock(contextMock);

    // console.log("redirect");
    // console.log(result);

    expect(result).toEqual(redirectMock);
  });

  it("should return uuid, revisionId, and isPreview if previewData is passed in context.", async () => {
    const contextMock = {
      params: {
        slug: ["/slug-preview"],
      },
      preview: true,
      previewData: {
        uuid: "slug-preview-uuid",
        revisionId: "slug-preview-revision-id",
      },
    };

    const getStaticPropsMock = withDrupalRouter(async (context, props) => {
      return props;
    });

    const result = await getStaticPropsMock(contextMock);

    // console.log("preview");
    // console.log(result);

    expect(result.isPreview).toEqual(true);
    expect(result.uuid).toEqual("slug-preview-uuid");
    expect(result.revisionId).toEqual("slug-preview-revision-id");
  });

  it("should return 404 not found if status is NOT_FOUND", async () => {
    const contextMock = {
      id: "test",
      params: {
        slug: ["/slug-404"],
      },
    };

    // Mock the apollo client query for DECOUPLED_ROUTER_QUERY.
    const decoupledRouterDataMock = {
      id: "test-404-uuid",
      uuid: "test-404-uuid",
      redirect: null,
      status: "NOT_FOUND",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (context, props) => {
      return props;
    });

    const result = await getStaticPropsMock(contextMock);

    // console.log("404");
    // console.log(result);

    expect(result).toEqual({ notFound: true });
  });

  it("should throw an error if status is 503 SERVICE_UNAVAILABLE.", async () => {
    const contextMock = {
      params: {
        slug: ["/slug-503"],
      },
    };

    // Mock the apollo client query for DECOUPLED_ROUTER_QUERY.
    const decoupledRouterDataMock = {
      id: "test-503-id",
      uuid: "test-503-uuid",
      redirect: null,
      status: "SERVICE_UNAVAILABLE",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (context, props) => {
      return props;
    });

    await expect(getStaticPropsMock(contextMock)).rejects.toThrow(
      "CMS is in maintenance mode. Skipping static revalidation."
    );
  });

  it("should throw an error if status is 500 ERROR.", async () => {
    const contextMock = {
      params: {
        slug: ["/slug-500"],
      },
    };

    // Mock the apollo client query for DECOUPLED_ROUTER_QUERY.
    const decoupledRouterDataMock = {
      id: "test-500-id",
      uuid: "test-500-uuid",
      redirect: null,
      status: "ERROR",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (context, props) => {
      return props;
    });

    await expect(getStaticPropsMock(contextMock)).rejects.toThrow(
      "CMS returned an error. Skipping static revalidation."
    );
  });
});
