// Utils
import setNestedTerms from './../../../utils/setNestedTerms';

const termResolver = {
  Query: {
    allTerms: async (parent, args, { dataSources }) => {
      const allTerms = await dataSources.refineryApi.getAllTerms();
      return allTerms;
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
      if (term.name.length > 30) {
        console.log('too long!');
        console.log(term.name);
      }
      return term.name;
    },
    children: term => {
      return term.children;
    }
  }
}

export default termResolver;