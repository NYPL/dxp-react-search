import formatDate from "../../../utils/formatDate";
import { QueryArguments, DataSources } from "./utils/types";
import { EventDataType } from "../datasources/LocalistApi";

const localistEventsResolver = {
  Query: {
    allEvents: async (
      _: any,
      args: QueryArguments,
      { dataSources }: DataSources
    ) => {
      const response = await dataSources.localistApi.getAllEvents(args);
      return {
        items: response.events,
        pageInfo: {
          limit: args.limit ? args.limit : null,
          pageCount: response.page.total ? response.page.total : null,
          pageNumer: args.pageNumber ? args.pageNumber : 1,
        },
      };
    },
  },
  Event: {
    id: ({ event }: Record<"event", EventDataType>) => event.id,
    title: ({ event }: Record<"event", EventDataType>) => event.title,
    description: ({ event }: Record<"event", EventDataType>) =>
      event.description,
    location: ({ event }: Record<"event", EventDataType>) => event.location,
    locationDetail: ({ event }: Record<"event", EventDataType>) =>
      event.room_number,
    date: ({ event }: Record<"event", EventDataType>) =>
      formatDate(event.first_date),
    image: ({ event }: Record<"event", EventDataType>) =>
      event.photo_url
        ? { id: `image-${event.id}`, uri: event.photo_url }
        : null,
    tags: ({ event }: Record<"event", EventDataType>) => event.tags,
    localistUrl: ({ event }: Record<"event", EventDataType>) =>
      event.localist_url,
    ticketPrice: ({ event }: Record<"event", EventDataType>) =>
      event.ticket_cost,
    isFree: ({ event }: Record<"event", EventDataType>) => event.free,
  },
};

export default localistEventsResolver;
