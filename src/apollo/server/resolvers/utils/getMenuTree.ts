import { MenuJsonApiResource } from "../menu";

export interface MenuItem extends MenuJsonApiResource {
  children?: MenuItem[];
}

export function getMenuTree(menuItems: MenuJsonApiResource[]): MenuItem[] {
  const menuTree: MenuItem[] = [];

  // Create a mapping of id to its corresponding menuItem object
  const idToMenuItemMap: Record<string, MenuItem> = {};
  menuItems.forEach((item: MenuJsonApiResource) => {
    const { id, ...rest } = item;
    idToMenuItemMap[id] = { id, ...rest };
  });

  // Build the hierarchical structure
  menuItems.forEach((item: MenuJsonApiResource) => {
    const { id, parent } = item;
    const menuItem = idToMenuItemMap[id];
    const parentMenuItem = idToMenuItemMap[parent];

    if (parentMenuItem) {
      parentMenuItem.children
        ? parentMenuItem.children.push(menuItem)
        : (parentMenuItem.children = [menuItem]);
    } else {
      menuTree.push(menuItem);
    }
  });

  return menuTree;
}
