export interface SelectedItems {
  items: string[];
}

export interface SelectedItemsMap {
  [name: string]: SelectedItems;
}

export interface FilterBarGroupItem {
  /** The id of the multiselect. */
  id: string;
  /** The label of the multiselect. */
  label: string;
  /** The entity type (content type or taxonomy) to be used for the api request. */
  type: "content" | "taxonomy";
  /** The content type to use for limiting the items returned by the api request. */
  limiter: string;
  /** Include 2nd level child items. */
  includeChildren?: boolean;
  /** Escape hatch for use cases where the filter data does not come from api request, but hard coded. */
  customData?: boolean;
}
