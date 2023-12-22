import { MenuJsonApiResource } from "../menu-resolver";

export interface MenuItem extends MenuJsonApiResource {
  children?: MenuItem[];
}

export function resolveMenuLevels(
  menuCollection: MenuJsonApiResource[]
): MenuItem[] {
  const menuItems: MenuItem[] = [];

  // Create a mapping of id to its corresponding menuItem object
  const idToMenuItemMap: Record<string, MenuItem> = {};
  menuCollection.forEach((item: MenuJsonApiResource) => {
    const { id, ...rest } = item;
    idToMenuItemMap[id] = { id, ...rest };
  });

  // Build the hierarchical structure
  menuCollection.forEach((item: MenuJsonApiResource) => {
    const { id, parent } = item;
    const menuItem = idToMenuItemMap[id];
    const parentMenuItem = idToMenuItemMap[parent];

    if (parentMenuItem) {
      parentMenuItem.children
        ? parentMenuItem.children.push(menuItem)
        : (parentMenuItem.children = [menuItem]);
    } else {
      menuItems.push(menuItem);
    }
  });

  return menuItems;
}
