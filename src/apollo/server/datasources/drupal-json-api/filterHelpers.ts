export interface ConvertedFilter {
  filterName: string;
  fieldName: string;
  fieldType: string;
  value: string | string[] | null;
  conjunction?: string | undefined;
  operator?: string | undefined;
}

type GqlFilterItem = {
  [key: string]: string | string[] | null;
};

/*enum Operators = {
  equal: '=';
  notEqual: '<>',
  greaterThan: '>',
  greaterThanOrEqual: '>=',
  lessThan: '<',
  lessThanOrEqual: '<=',
  startsWith: 'STARTS_WITH',
  contains: 'CONTAINS',
  endsWith: 'ENDS_WITH',
  in: 'IN',
  notIn: 'NOT IN',
  between: 'BETWEEN',
  notBetween: 'NOT BETWEEN',
  isNull: 'IS NULL',
  isNotNull: 'IS NOT NULL',
}
*/

// Converts gql filters into a format that can be sent to json api.
export function convertFilters(filter: GqlFilterItem): ConvertedFilter[] {
  const allFilters = [];
  for (const property in filter) {
    switch (property) {
      case "channels":
        allFilters.push({
          filterName: property,
          fieldName: "field_erm_channels",
          fieldType: "referenceMultiple",
          value: filter[property],
          conjunction: "AND",
          operator: "=",
        });
        break;
      case "subjects":
        allFilters.push({
          filterName: property,
          fieldName: "field_erm_subjects",
          fieldType: "referenceMultiple",
          value: filter[property],
          conjunction: "AND",
          operator: "=",
        });
        break;
      case "featured":
        if (filter[property] !== null) {
          allFilters.push({
            filterName: property,
            fieldName: "field_bs_featured",
            fieldType: "boolean",
            value: filter[property] ? "1" : "0",
            operator: "=",
          });
        }
        break;
      case "internalSlug":
        allFilters.push({
          filterName: property,
          fieldName: "field_ts_slug",
          fieldType: "textPlain",
          value: filter[property],
          operator: "IN",
        });
        break;
      case "libraryType":
        allFilters.push({
          filterName: property,
          fieldName: "field_ts_library_type",
          fieldType: "textPlain",
          value: filter[property],
          operator: "IN",
        });
        break;
    }
  }
  return allFilters;
}

export function filterMultiValueEntityRef(
  apiParams: any,
  value: any,
  fieldName: string,
  conjunction?: string | undefined,
  operator?: string | undefined
) {
  const groupName = `${fieldName}-${value}-and`;
  const filterPath = `${fieldName}.meta.drupal_internal__target_id`;
  // addGroup(name, conjunction, memberOf)
  apiParams.addGroup(groupName, conjunction);
  // addFilter(path, value, operator, group)
  apiParams.addFilter(filterPath, value, operator, groupName);

  return apiParams;
}
