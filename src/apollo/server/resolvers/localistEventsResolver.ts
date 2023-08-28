import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";
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
    event: async (_: any, args: any, { dataSources }: DataSources) => {
      const response = await dataSources.localistApi.getEvent(args);
      return { event: response.event };
    },
  },
  Event: {
    // Temporary solution to the date issue with reoccurring events
    // Remaining issue: if event is reocurring, the instance id is not queryble
    id: ({ event }: Record<"event", EventDataType>) =>
      event.recurring ? event.event_instances[0].event_instance.id : event.id,
    title: ({ event }: Record<"event", EventDataType>) => event.title,
    slug: ({ event }: Record<"event", EventDataType>) => event.urlname,
    eventType: ({ event }: Record<"event", EventDataType>) =>
      event.filters?.event_types ? event.filters.event_types[0] : null,
    description: ({ event }: Record<"event", EventDataType>) =>
      event.description,
    location: ({ event }: Record<"event", EventDataType>) =>
      event.location_name ? event.location_name : event.location,
    locationDetail: ({ event }: Record<"event", EventDataType>) =>
      event.room_number,
    locationId: ({ event }: Record<"event", EventDataType>) => event.venue_id,
    address: ({ event }: Record<"event", EventDataType>) => event.address,
    date: ({ event }: Record<"event", EventDataType>) =>
      formatDate(event.event_instances[0].event_instance.start),
    time: ({ event }: Record<"event", EventDataType>) =>
      formatTime(event.event_instances[0].event_instance.start),
    image: ({ event }: Record<"event", EventDataType>) =>
      event.photo_url
        ? { id: `image-${event.id}`, uri: event.photo_url }
        : null,
    tags: ({ event }: Record<"event", EventDataType>) =>
      event.tags.length > 0 ? event.tags : null,
    localistUrl: ({ event }: Record<"event", EventDataType>) =>
      event.localist_url,
    needsRegistration: ({ event }: Record<"event", EventDataType>) =>
      event.free,
    experience: ({ event }: Record<"event", EventDataType>) => event.experience,
    ticketPrice: ({ event }: Record<"event", EventDataType>) =>
      event.free === true ? null : event.ticket_cost,
  },
};

export default localistEventsResolver;
