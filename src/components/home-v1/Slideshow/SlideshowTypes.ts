import { ImageType } from "../../shared/Image";

export interface SlideshowItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  audience: string;
  image: ImageType;
  url: string;
}
