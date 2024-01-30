interface CommonMenuItem {
  id: string;
  parentId: string;
  title: string;
  url: string;
}
interface MenuItem extends CommonMenuItem {
  children: null;
}

interface MenuItemWithChildren extends CommonMenuItem {
  children: MenuItem[] | MenuItemWithChildren[];
}

export type { MenuItem, MenuItemWithChildren };
