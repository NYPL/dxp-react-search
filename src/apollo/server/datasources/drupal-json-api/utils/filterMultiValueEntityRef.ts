export default function filterMultiValueEntityRef(
  apiParams: any,
  value: string | string[] | boolean,
  fieldName: string,
  conjunction?: string | undefined,
  operator?: string | undefined
) {
  const groupName = `${fieldName}-${value}-and`;
  const filterPath = `${fieldName}.meta.drupal_internal__target_id`;
  apiParams.addGroup(groupName, conjunction);
  apiParams.addFilter(filterPath, value, operator, groupName);
  return apiParams;
}
