import { LinkTypes } from "@nypl/design-system-react-components";

export type MenuItemType = {
  // @TODO This id is only passed to MenuItem component but never used in the component itself
  id?: string;
  title: string;
  description?: string;
  link?: string;
  linkType?: LinkTypes;
  menuItemDecoration?: boolean;
};
