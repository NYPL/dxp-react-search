import withDrupalRouter from "./with-drupal-router";
import { createMockClient } from "mock-apollo-client";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";

let mockClient = createMockClient();
let requestHandler;

// Mock initializeApollo
jest.mock("./withApollo/apollo", () => {
  return {
    initializeApollo: jest.fn(() => mockClient),
  };
});

describe("with-drupal-router success states.", () => {
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

  it("should not return a redirect if successful route is resolved.", async () => {
    const contextMock = {
      params: {
        slug: ["slug-200"],
      },
    };

    // Mock the apollo client query for DECOUPLED_ROUTER_QUERY.
    const decoupledRouterDataMock = {
      id: "test-success-id",
      uuid: "test-success-uuid",
      redirect: null,
      bundle: "test-success",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
      return props;
    });

    const result = await getStaticPropsMock(contextMock);

    expect(result.redirect).toEqual(undefined);
    expect(result.isPreview).toEqual(false);
    expect(result.revisionId).toEqual(undefined);
    expect(result.slug).toEqual("/slug-200");
  });

  it("should return nextjs redirect object is redirect data is returned from decoupled router.", async () => {
    const contextMock = {
      params: {
        slug: ["slug-redirect"],
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
      bundle: "test-redirect",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
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

    expect(result).toEqual(redirectMock);
  });

  it("should return uuid, revisionId, and isPreview if previewData is passed in context.", async () => {
    const contextMock = {
      params: {
        slug: ["slug-preview"],
      },
      preview: true,
      previewData: {
        uuid: "test-preview-uuid",
        revisionId: "test-preview-revision-id",
      },
      bundle: "test-preview",
    };

    const decoupledRouterDataMock = {
      id: "test-preview-id",
      uuid: "test-preview-uuid",
      preview: true,
      previewData: {
        uuid: "test-preview-uuid",
        revisionId: "test-preview-revision-id",
      },
      redirect: null,
      bundle: "test-preview",
    };

    requestHandler.mockResolvedValueOnce({
      data: { decoupledRouter: decoupledRouterDataMock },
    });

    const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
      return props;
    });

    const result = await getStaticPropsMock(contextMock);

    expect(result.isPreview).toEqual(true);
    expect(result.uuid).toEqual("test-preview-uuid");
    expect(result.revisionId).toEqual("test-preview-revision-id");
    expect(result.slug).toEqual("/slug-preview");
  });
});

it("should return correct slug for single level path.", async () => {
  const contextMock = {
    params: {
      slug: ["slug"],
    },
    bundle: "test-slug",
  };

  const decoupledRouterDataMock = {
    id: "test-slug-id",
    uuid: "test-slug-uuid",
    redirect: null,
    bundle: "test-slug",
  };

  requestHandler.mockResolvedValueOnce({
    data: { decoupledRouter: decoupledRouterDataMock },
  });

  const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
    return props;
  });

  const result = await getStaticPropsMock(contextMock);
  expect(result.slug).toEqual("/slug");
});

it("should return correct slug for multilevel paths.", async () => {
  const contextMock = {
    params: {
      slug: ["slug", "level-2", "level-3"],
    },
    bundle: "test-multilevel-slug",
  };

  const decoupledRouterDataMock = {
    id: "test-multilevel-slug-id",
    uuid: "test-multilevel-slug-uuid",
    redirect: null,
    bundle: "test-multilevel-slug",
  };

  requestHandler.mockResolvedValueOnce({
    data: { decoupledRouter: decoupledRouterDataMock },
  });

  const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
    return props;
  });

  const result = await getStaticPropsMock(contextMock);
  expect(result.slug).toEqual("/slug/level-2/level-3");
});

// describe("with-drupal-router getServerSideProps success states.", () => {
//   /*
//       // getServerSideProps().
//       const { resolvedUrl, query } = context as GetServerSidePropsContext;

//       slug = resolvedUrl;
//       // Preview mode.
//       isPreview =
//         query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET && query.uuid
//           ? true
//           : false;
//       // Set the uuid for preview mode.
//       if (isPreview) {
//         uuid = query.uuid;
//       }
//   */
// });

describe("with-drupal-router error states.", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should allow 404 error throw to pass through.", async () => {
    mockClient = createMockClient();
    requestHandler = jest.fn();

    const contextMock = {
      id: "test",
      params: {
        slug: ["slug-404"],
      },
    };

    mockClient.setRequestHandler(DECOUPLED_ROUTER_QUERY, () =>
      Promise.resolve({ errors: [{ message: "ApolloError: 404: Not Found" }] })
    );

    const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
      return props;
    });

    await expect(getStaticPropsMock(contextMock)).rejects.toThrow(
      "ApolloError: 404: Not Found"
    );
  });

  it("should allow 503 error throw to pass through.", async () => {
    mockClient = createMockClient();
    requestHandler = jest.fn();

    const contextMock = {
      params: {
        slug: ["slug-503"],
      },
    };

    mockClient.setRequestHandler(DECOUPLED_ROUTER_QUERY, () =>
      Promise.resolve({
        errors: [{ message: "ApolloError: 503: Service Unavailable" }],
      })
    );

    const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
      return props;
    });

    await expect(getStaticPropsMock(contextMock)).rejects.toThrow(
      "ApolloError: 503: Service Unavailable"
    );
  });

  it("should allow 500 error throw to pass through.", async () => {
    mockClient = createMockClient();
    requestHandler = jest.fn();

    const contextMock = {
      params: {
        slug: ["slug-500"],
      },
    };

    mockClient.setRequestHandler(DECOUPLED_ROUTER_QUERY, () =>
      Promise.resolve({
        errors: [{ message: "ApolloError: 500: Server error" }],
      })
    );

    const getStaticPropsMock = withDrupalRouter(async (contextMock, props) => {
      return props;
    });

    await expect(getStaticPropsMock(contextMock)).rejects.toThrow(
      "ApolloError: 500: Server error"
    );
  });
});

// @TODO Add specific tests for getServerSideProps and getStaticProps.
