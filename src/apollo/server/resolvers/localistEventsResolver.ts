import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";
import { QueryArguments, DataSources } from "./utils/types";
import { EventDataType, FilterItem } from "../datasources/LocalistApi";

const localistEventsResolver = {
  Query: {
    eventCollection: async (
      _: any,
      args: QueryArguments,
      { dataSources }: DataSources
    ) => {
      const response = await dataSources.localistApi.getEventCollection(args);
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
    eventFilterCollection: async (
      _: any,
      args: any,
      { dataSources }: DataSources
    ) => {
      const allTerms = [];
      const response = await dataSources.localistApi.getEventFilterCollection(
        args
      );
      if ("places" in response) {
        allTerms.push({
          id: "location",
          label: "Locations",
          items: response.places,
        });
      }
      if ("event_types" in response) {
        allTerms.push({
          id: "event_type",
          label: "Event Types",
          items: response.event_types,
        });
      }
      if ("event_series" in response) {
        allTerms.push({
          id: "event_series",
          label: "Event Series",
          items: response.event_series,
        });
      }
      return allTerms;
    },
    eventCollectionSearch: async (
      _: any,
      args: any,
      { dataSources }: DataSources
    ) => {
      const response = await dataSources.localistApi.getEventCollectionSearch(
        args
      );
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
    // Temporary solution to the date issue with reoccurring events
    // Remaining issue: if event is reocurring, the instance id is not queryble
    id: ({ event }: Record<"event", EventDataType>) =>
      event.recurring ? event.event_instances[0].event_instance.id : event.id,
    title: ({ event }: Record<"event", EventDataType>) => event.title,
    slug: ({ event }: Record<"event", EventDataType>) => event.urlname,
    eventTypes: ({ event }: Record<"event", EventDataType>) =>
      event.filters?.event_types ? event.filters.event_types : null,
    eventSeries: ({ event }: Record<"event", EventDataType>) =>
      event.filters?.event_series ? event.filters.event_series : null,
    eventTopics: ({ event }: Record<"event", EventDataType>) =>
      event.filters?.event_topics ? event.filters.event_topics : null,
    eventAudience: ({ event }: Record<"event", EventDataType>) =>
      event.filters?.event_audience ? event.filters.event_audience[0] : null,
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
    localistEventUrl: ({ event }: Record<"event", EventDataType>) =>
      event.localist_url,
    needsRegistration: ({ event }: Record<"event", EventDataType>) =>
      event.free,
    experience: ({ event }: Record<"event", EventDataType>) => event.experience,
    ticketPrice: ({ event }: Record<"event", EventDataType>) =>
      event.free === true ? null : event.ticket_cost,
  },
  EventFilterItem: {
    id: (item: FilterItem | Record<"place", FilterItem>) =>
      "place" in item ? item.place.id : item.id,
    name: (item: FilterItem | Record<"place", FilterItem>) =>
      "place" in item ? item.place.name : item.name,
  },
};

export default localistEventsResolver;
