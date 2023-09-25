import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";

const { LOCALIST_API, LOCALIST_ACCESS_TOKEN } = process.env;

export type EventDataType = {
  id: string;
  title: string;
  urlname: string;
  description: string;
  location: string;
  location_name: string;
  room_number: string;
  venue_id: number;
  address: string;
  photo_url: string;
  photo_id: number;
  tags: [string];
  free: boolean;
  recurring: boolean;
  experience: string;
  ticket_cost: string;
  date?: string;
  first_date: string;
  last_date: string;
  localist_url: string;
  filters?: FilterType;
  event_instances: EventInstancesType;
};

type EventInstancesType = [
  Record<"event_instance", { id: string; start: string; end: string }>
];
type PageDataType = {
  current: number;
  size: number;
  total: number;
};

type DateDataType = {
  first: string;
  last: string;
};

export type FilterItem = {
  id: number;
  name: string;
};

type FilterType = Record<string, [FilterItem]>;

interface LocalistEventCollectionResponse {
  status: string;
  events: [EventDataType];
  page: PageDataType;
  date: DateDataType;
}
interface LocalistEventResponse {
  status: string;
  event: EventDataType;
}

interface LocalistFilterResponse {
  places: Record<"places", [Record<"place", FilterItem>]>;
  page: PageDataType;
  event_types: Record<"event_types", [FilterItem]>;
  event_topics: Record<"event_topics", [FilterItem]>;
  event_series: Record<"event_series", [FilterItem]>;
}

class LocalistApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = LOCALIST_API;
    this.httpCache = new HTTPCache();
  }

  async getEventCollection(
    args: any
  ): Promise<LocalistEventCollectionResponse> {
    const path = "/api/2/events?days=370";
    // Choose max num of days to get all events
    // The start date will be autobamtically set to the current day
    const response = await this.get(
      `${path}&pp=${args.limit}&page=${args.pageNumber}&`,
      {
        headers: { Authorization: `Bearer ${LOCALIST_ACCESS_TOKEN}` },
      }
    );
    return response;
  }

  async getEvent(args: any): Promise<LocalistEventResponse> {
    const response = await this.get(
      `/api/2/events/${args.id}?all_custom_fields=true`,
      {
        headers: { Authorization: `Bearer ${LOCALIST_ACCESS_TOKEN}` },
      }
    );
    return response;
  }

  async getEventFilterCollection(
    args: any
  ): Promise<LocalistFilterResponse | Record<string, unknown> | any> {
    // Special handling for Localist "place".
    if (args.type === "localist_place") {
      // Places API only returns 100 items per page, and this can't be modfied.
      // So we make 2 calls wrapped in a Promise to get all locations.
      const [placesResponsePageOne, placesResponsePageTwo] = await Promise.all([
        this.get("/api/2/places?pp=100&page=1&sort=name&direction=asc"),
        this.get("/api/2/places?pp=100&page=2&sort=name&direction=asc"),
      ]);

      return [...placesResponsePageOne.places, ...placesResponsePageTwo.places];
    }

    const filters = await this.get("/api/2/events/filters", {
      headers: { Authorization: `Bearer ${LOCALIST_ACCESS_TOKEN}` },
    });

    return filters[args.id].sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
  }

  async getEventCollectionSearch(
    args: any
  ): Promise<LocalistEventCollectionResponse> {
    // @TODO Localist events search api does not return all results, you appear to have to provide a search query.
    const path = "/api/2/events";
    let filterQuery = args.filter.q ? "" : "?";

    if (args.filter.q) {
      filterQuery += `/search?search=${args.filter.q}&`;
    }

    if (args.filter) {
      for (const term of Object.keys(args.filter)) {
        args.filter[term].value?.length &&
          args.filter[term].value.forEach(
            (id: string) =>
              (filterQuery += `${args.filter[term].fieldName}[]=${id}&`)
          );
      }
    }

    const response = await this.get(
      `${path}${filterQuery}pp=${args.limit}&page=${args.pageNumber}&days=370`,
      {
        headers: { Authorization: `Bearer ${LOCALIST_ACCESS_TOKEN}` },
      }
    );
    return response;
  }
}

export default LocalistApi;
