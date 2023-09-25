import { DataSources } from "./utils/types";

const localistFilterResolver = {
  Query: {
    localistFilterCollection: async (
      _: any,
      args: any,
      { dataSources }: DataSources
    ) => {
      const response = await dataSources.localistApi.getEventFilterCollection(
        args
      );

      return response;
    },
  },
  LocalistFilterItem: {
    id: (item: any, _args: any, _context: any, info: any) => {
      if (info.variableValues.type === "localist_place") {
        return String(item.place.id);
      }

      return String(item.id);
    },
    name: (item: any, _args: any, _context: any, info: any) => {
      if (info.variableValues.type === "localist_place") {
        return String(item.place.display_name);
      }

      return String(item.name);
    },
  },
};

export default localistFilterResolver;
