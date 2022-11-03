import { DataSource } from "apollo-datasource";

export default async function resolveCollectionResponse(
  dataSources: DataSource,
  apiPath: string,
  args: Record<string, any>
) {
  try {
    // @ts-ignore
    const response = await dataSources.drupalJsonApi.getCollectionResource(
      apiPath
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
      responseInfo: {
        httpStatus: "SUCCESS",
        httpStatusCode: 200,
        apiPath: apiPath,
      },
    };
  } catch (error: any) {
    let httpStatus;
    if (
      // 404 will be returned by Drupal if there's no matching route.
      error.extensions.response.status === 404 ||
      // 403 will be returned if the route matches, but is unpublished.
      error.extensions.response.status === 403
    ) {
      httpStatus = "NOT_FOUND";
    }

    if (error.extensions.response.status === 500) {
      httpStatus = "ERROR";
    }

    if (error.extensions.response.status === 503) {
      httpStatus = "SERVICE_UNAVAILABLE";
    }

    return {
      responseInfo: {
        httpStatus: httpStatus,
        httpStatusCode: error.extensions.response.status,
        apiPath: apiPath,
      },
    };
  }
}
