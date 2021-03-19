// Utils
import setNestedTerms from './../../../utils/setNestedTerms';
import getSubjectsAllowList from './../../../utils/getSubjectsAllowList';
import { SUBJECTS_UUID } from './../../../utils/setTermsFilter';

const termResolver = {
  Query: {
    allTerms: async (parent, args, { dataSources }) => {
      const allTerms = await dataSources.refineryApi.getAllTerms();
      // Get the terms tree from all Divisions.
      const subjectsAllowList = getSubjectsAllowList(allTerms.divisions);

      // Replace subject terms with the allow list terms.
      allTerms.searchFilters.map(filterGroup => {
        if (filterGroup.uuid === SUBJECTS_UUID) {
          return filterGroup.terms = subjectsAllowList;
        } else {
          return filterGroup.terms
        }
      });

      return allTerms.searchFilters;
    },
  },
  Vocab: {
    id: vocab => {
      return vocab.uuid;
    },
    name: vocab => {
      return vocab.name;
    },
    terms: vocab => {
      return setNestedTerms(vocab.terms);
    }
  },
  Term: {
    id: term => {
      return term.uuid;
    },
    name: term => {
      return term.name;
    },
    children: term => {
      return term.children;
    }
  }
}

export default termResolver;