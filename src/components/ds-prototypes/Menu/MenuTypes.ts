import { LinkTypes } from "@nypl/design-system-react-components";

export type MenuItemType = {
  id: string;
  title: string;
  description?: string;
  link?: string;
  linkType?: LinkTypes;
  menuItemDecoration: boolean;
};
