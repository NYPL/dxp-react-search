export interface SelectedItems {
  items: string[];
}

export interface SelectedItemsMap {
  [name: string]: SelectedItems;
}

export interface FilterBarGroupItem {
  id: string;
  label: string;
  type: string;
  limiter: string;
  legacy?: boolean;
  includeChildren?: boolean;
  mock?: boolean;
}
