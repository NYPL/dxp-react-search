import { ImageType } from "../../shared/Image/ImageTypes";

export interface BlogCardItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  byline: string;
  date: string;
  locations: BlogLocation[];
  image: ImageType;
}

export interface BlogLocation {
  id: string;
  name: string;
  slug: string;
}
