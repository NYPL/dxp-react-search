import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";

const { LOCALIST_API, LOCALIST_ACCESS_TOKEN } = process.env;

export type EventDataType = {
  id: string;
  title: string;
  description: string;
  date?: string;
  photo_url: string;
  photo_id: number;
  location: string;
  room_number: string;
  first_date: string;
  last_date: string;
  tags: [string];
  localist_url: string;
  ticket_cost: string;
  free: boolean;
};

type PageDataType = {
  current: number;
  size: number;
  total: number;
};

type DateDataType = {
  first: string;
  last: string;
};

interface LocalistResponse {
  status: string;
  events: [EventDataType];
  page: PageDataType;
  date: DateDataType;
}

class LocalistApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = LOCALIST_API;
    this.httpCache = new HTTPCache();
  }

  async getAllEvents(args: any): Promise<LocalistResponse> {
    // Remove hadrcoded start and end and build api with args.filter params
    const response = await this.get(
      `/api/2/events?start=2023-06-01&end=2023-11-01&pp=${args.limit}&page=${args.pageNumber}&`,
      {
        headers: { Authorization: `Bearer ${LOCALIST_ACCESS_TOKEN}` },
      }
    );
    return response;
  }
}

export default LocalistApi;
