import { DataSource } from "apollo-datasource";
import { toApolloError } from "apollo-server-errors";

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
    };
  } catch (error: any) {
    throw toApolloError(error);
  }
}
