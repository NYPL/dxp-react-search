import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { filterMultiValueEntityRef, ConvertedFilter } from "./filterHelpers";

type PaginationInfo = {
  limit: number;
  pageNumber: number;
};

type SortBy = {
  field: string;
  direction: SortByDirections;
};

enum SortByDirections {
  ASC = "ASC",
  DSC = "DESC",
}

export function getCollectionResourceJsonApiPath(
  entityType: string,
  bundle: string,
  includeFields?: string[],
  filters?: ConvertedFilter[],
  sortBy?: SortBy,
  pagination?: PaginationInfo
): string {
  let apiParams = new DrupalJsonApiParams();
  // Add jsonapi include, to simplify json output.
  apiParams.addCustomParam({ jsonapi_include: 1 });

  // Add include
  if (Array.isArray(includeFields)) {
    apiParams.addInclude(includeFields);
  }

  // Add Filters
  if (Array.isArray(filters)) {
    filters.forEach((filter: ConvertedFilter) => {
      const { fieldType, fieldName, value, conjunction, operator } = filter;

      if (fieldType === "referenceMultiple") {
        if (Array.isArray(filter.value)) {
          filter.value.forEach((item: string) => {
            filterMultiValueEntityRef(
              apiParams,
              item,
              fieldName,
              conjunction,
              operator
            );
          });
        }
      }

      if (
        fieldType === "listText" ||
        fieldType === "textPlain" ||
        fieldType === "boolean"
      ) {
        apiParams.addFilter(fieldName, value, operator);
      }
    });
  }

  // Add sortBy
  if (typeof sortBy === "object" && sortBy !== null) {
    console.log(sortBy);
    const { field, direction } = sortBy;
    apiParams.addSort(field, direction);
  }

  // Pagination
  if (typeof pagination === "object") {
    const { limit, pageNumber } = pagination;
    if (limit && pageNumber) {
      // Calculate offset
      let offset = 0;
      if (pageNumber === 2) {
        offset = limit;
      } else {
        offset = limit * (pageNumber - 1);
      }
      // Add page offset and page limit.
      apiParams.addCustomParam({ page: { offset: offset, limit: limit } });
    }
  }

  // Final steps.
  const urlencodedQueryString = apiParams.getQueryString({ encode: false });
  let apiPath = `/jsonapi/${entityType}/${bundle}?${urlencodedQueryString}`;
  return apiPath;
}

export function getIndividualResourceJsonApiPath(
  entityType: string,
  bundle: string,
  includeFields: string[],
  uuid: string,
  revisionId?: string
): string {
  let apiParams = new DrupalJsonApiParams();
  // @TODO swap out for jsona, handle in Node?
  apiParams.addCustomParam({ jsonapi_include: 1 });

  if (Array.isArray(includeFields)) {
    apiParams.addInclude(includeFields);
  }

  if (revisionId) {
    apiParams.addCustomParam({ resourceVersion: `id:${revisionId}` });
  }

  const urlencodedQueryString = apiParams.getQueryString({ encode: false });
  return `/jsonapi/${entityType}/${bundle}/${uuid}?${urlencodedQueryString}`;
}
