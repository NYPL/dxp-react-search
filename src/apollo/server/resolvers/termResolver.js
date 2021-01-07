const termResolver = {
  Query: {
    allTerms: (parent, args, { dataSources }) => {
      return dataSources.refineryApi.getAllTerms();
    },
  },
  Vocab: {
    id: vocab => {
      return vocab.id;
    },
    name: vocab => {
      return vocab.name;
    },
  },
}

export default termResolver;