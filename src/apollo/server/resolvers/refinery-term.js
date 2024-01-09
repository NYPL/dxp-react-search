// Utils
import setNestedTerms from "../../../utils/setNestedTerms";
import getSubjectsAllowList from "../../../utils/getSubjectsAllowList";
import { SUBJECTS_UUID } from "../../../utils/setTermsFilter";

export const refineryTermResolver = {
  Query: {
    refineryAllTerms: async (parent, args, { dataSources }) => {
      const refineryAllTerms = await dataSources.refineryApi.getAllTerms();
      // Get the terms tree from all Divisions.
      const subjectsAllowList = getSubjectsAllowList(
        refineryAllTerms.divisions
      );
      // Replace subject terms with the allow list terms.
      refineryAllTerms.searchFilters.map((filterGroup) => {
        if (filterGroup.uuid === SUBJECTS_UUID) {
          return filterGroup.terms.splice(
            0,
            filterGroup.terms.length,
            ...subjectsAllowList
          );
        } else {
          return filterGroup.terms;
        }
      });

      return refineryAllTerms.searchFilters;
    },
  },
  RefineryVocab: {
    id: (vocab) => {
      return vocab.uuid;
    },
    name: (vocab) => {
      return vocab.name;
    },
    terms: (vocab) => {
      return setNestedTerms(vocab.terms);
    },
  },
  RefineryTerm: {
    id: (term) => {
      return term.uuid;
    },
    name: (term) => {
      return term.name;
    },
    children: (term) => {
      return term.children;
    },
  },
};
