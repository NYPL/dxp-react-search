// Utils
/*import setNestedTerms from './../../../utils/setNestedTerms';
import getSubjectsAllowList from './../../../utils/getSubjectsAllowList';
import { SUBJECTS_UUID } from './../../../utils/setTermsFilter';
*/

const filterGroupResolver = {
  Query: {
    filterGroupById: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getFilterGroupById(args.id);

      return response.data;
    },
  },
  FilterGroup: {
    id: filterGroup => {
      //return filterGroup.uuid;
      return 'subject'
    },
    name: filterGroup => {
      //return filterGroup.name;
      return 'Subjects'
    },
    items: filterGroup => {
      console.log(filterGroup.links)
      return [filterGroup];
      //return filterGroup[0].data;
    }
  },
  FilterItem: {
    id: filterItem => {
      //console.log(filterItem)
      return filterItem.id;
    },
    name: filterItem => {
      return filterItem.attributes.name;
    },
    /*children: term => {
      return filterItem.children;
    }
    */
  }
}

export default filterGroupResolver;