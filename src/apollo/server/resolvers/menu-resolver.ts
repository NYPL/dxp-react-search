import { getCollectionResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";

export interface MenuJsonApiResource {
  id: string;
  title: string;
  url: string;
}

export const menuResolver = {
  Query: {
    menuCollection: async (
      _parent: MenuJsonApiResource,
      args: any,
      contextValue: any
      // _info: GraphQLResolveInfo
    ) => {
      const pagination = {
        limit: args.limit,
        pageNumber: args.pageNumber,
      };

      const includedFields = undefined;

      const apiPath = getCollectionResourceJsonApiPath(
        "menu_items",
        args.id,
        includedFields,
        args.filter,
        args.sort,
        pagination
      );

      const response =
        await contextValue.dataSources.drupalJsonApi.getCollectionResource(
          apiPath
        );

      console.log(response.data);

      return {
        items: response.data,
        // pageInfo: {
        //   totalItems: response.meta ? response.meta.count : 0,
        //   limit: args.limit ? args.limit : null,
        //   pageCount: response.meta
        //     ? Math.ceil(response.meta.count / args.limit)
        //     : 120,
        //   pageNumber: args.pageNumber ? args.pageNumber : 1,
        // },
      };
    },
  },
  MenuItem: {
    id: (parent: MenuJsonApiResource) => parent.id,
    title: (parent: MenuJsonApiResource) => parent.title,
    url: (parent: MenuJsonApiResource) => parent.url,
  },
};

// @example
// query ($id: String) {
//   menuCollection(id: $id) {
//     items {
//       id
//       title
//       url
//     }
//   }
// }
//
// Query variables
// {
//   "id": "main"
// }
