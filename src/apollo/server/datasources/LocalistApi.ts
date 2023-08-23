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
  experience: string;
  ticket_cost: string;
  date?: string;
  first_date: string;
  last_date: string;
  localist_url: string;
  filters?: EventTypes | null;
  event_instances: EventIstancesType;
};

type EventTypes = Record<
  "event_types",
  [
    {
      id: number;
      name: string;
    }
  ]
>;
type EventIstancesType = [
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
class LocalistApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = LOCALIST_API;
    this.httpCache = new HTTPCache();
  }

  async getAllEvents(args: any): Promise<LocalistEventCollectionResponse> {
    // Remove hadrcoded start and end and build api with args.filter params
    const response = await this.get(
      `/api/2/events?start=2023-08-01&end=2023-11-01&pp=${args.limit}&page=${args.pageNumber}&`,
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
}

export default LocalistApi;
