import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import filterMultiValueEntityRef from "./utils/filterMultiValueEntityRef";

type FilterItem = {
  [key: string]: { [key: string]: any };
};

type Sort = {
  field: string;
  direction: SortDirections;
};

enum SortDirections {
  ASC = "ASC",
  DSC = "DESC",
}

type PaginationInfo = {
  limit: number;
  pageNumber: number;
};

export function getCollectionResourceJsonApiPath(
  entityType: string,
  bundle: string,
  includeFields?: string[],
  filter?: FilterItem,
  sort?: Sort,
  pagination?: PaginationInfo,
  addFields?: string[]
): string {
  let apiParams = new DrupalJsonApiParams();
  // Add jsonapi include, to simplify json output.
  apiParams.addCustomParam({ jsonapi_include: 1 });

  // Add include
  if (Array.isArray(includeFields)) {
    apiParams.addInclude(includeFields);
  }
  // Filters
  if (typeof filter === "object" && filter !== null) {
    for (const property in filter) {
      const fieldName = filter[property].fieldName;
      const conjunction = filter[property].conjunction;
      const operator = filter[property].operator;
      let value = filter[property].value;
      // Check for conjunction property and if value is an array.
      if (
        // @see https://github.com/graphql/express-graphql/issues/177
        "conjunction" in filter[property] &&
        Array.isArray(filter[property].value)
      ) {
        filter[property].value.forEach((item: string) => {
          filterMultiValueEntityRef(
            apiParams,
            item,
            fieldName,
            conjunction,
            operator
          );
        });
      } else {
        // Convert boolean value true to 1 for json api, as true doesn't work.
        if (filter[property].value === true) {
          value = 1;
        }
        apiParams.addFilter(fieldName, value, operator);
      }
    }
  }

  // Add sortBy
  if (typeof sort === "object" && sort !== null) {
    const { field, direction } = sort;
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

  // Add fields - name is misleading, if added, this will limit the fields returned.
  if (Array.isArray(addFields)) {
    const resourceType = `${entityType}--${bundle}`;
    apiParams.addFields(resourceType, addFields);
  }

  const urlencodedQueryString = apiParams.getQueryString({ encode: false });
  return `/jsonapi/${entityType}/${bundle}?${urlencodedQueryString}`;
}

export function getIndividualResourceJsonApiPath(
  entityType: string,
  bundle: string,
  includeFields: string[],
  uuid: string,
  revisionId?: string,
  addFields?: string[]
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

  // Add fields - name is misleading, if added, this will limit the fields returned.
  if (Array.isArray(addFields)) {
    const resourceType = `${entityType}--${bundle}`;
    apiParams.addFields(resourceType, addFields);
  }

  const urlencodedQueryString = apiParams.getQueryString({ encode: false });
  return `/jsonapi/${entityType}/${bundle}/${uuid}?${urlencodedQueryString}`;
}
