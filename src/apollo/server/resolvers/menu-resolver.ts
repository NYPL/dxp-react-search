import { getCollectionResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";
import { MenuItem, getMenuTree } from "./utils/getMenuTree";

export interface MenuJsonApiResource {
  id: string;
  title: string;
  url: string;
  parent: string;
}

export const menuResolver = {
  Query: {
    menu: async (
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
        "menu",
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

      const menuTree: MenuItem[] = getMenuTree(response.data);

      // console.log(menuTree);

      return {
        items: menuTree,
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
    id: (parent: MenuItem) => parent.id,
    title: (parent: MenuItem) => parent.title,
    url: (parent: MenuItem) => parent.url,
    parentId: (parent: MenuItem) => (parent.parent ? parent.parent : null),
    children: (parent: MenuItem) => parent.children,
  },
};
