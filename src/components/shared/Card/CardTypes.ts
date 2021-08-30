import {
  CardImageRatios,
  CardImageSizes,
  CardLayouts,
} from "@nypl/design-system-react-components";
import { ImageType } from "./../Image/ImageTypes";

export type CardType = {
  /** The id for the card */
  id: string;
  /** The name for the card */
  title: string;
  subHeading?: JSX.Element;
  /** The description for the card */
  description?: string;
  /** The url for the card */
  url: string;
  /** The image for the card */
  // @TODO this should be the type for NextJS image.
  image?: JSX.Element;
  /** */
  imageAspectRatio?: CardImageRatios;
  layout?: CardLayouts;
  center?: boolean;
  imageSize?: CardImageSizes;
};
