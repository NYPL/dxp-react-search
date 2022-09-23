import { ImageType } from "../../shared/Image";

export interface StaffPicksItem {
  id: string;
  quote: string;
  image: ImageType;
  url: string;
  staffName: string;
  staffLocation: string;
}
