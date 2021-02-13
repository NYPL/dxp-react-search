const termResolver = {
  Query: {
    allTerms: (parent, args, { dataSources }) => {
      return dataSources.refineryApi.getAllTerms();
    },
  },
  Vocab: {
    id: vocab => {
      return vocab.uuid;
    },
    name: vocab => {
      return vocab.name;
    },
  },
  Term: {
    id: term => {
      return term.uuid;
    },
    name: term => {
      return term.name;
    }
  }
}

export default termResolver;