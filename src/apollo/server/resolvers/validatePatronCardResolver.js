const validatePatronCardResolver = {
  Query: {
    validatePatronCard: async (parent, args, { dataSources }) => {
      const response = await dataSources.platformApi.validatePatronCard(args);
      return response;
    },
  },
  PatronCard: {
    id: (patronCard) => patronCard.id,
    valid: (patronCard) => patronCard.valid,
    message: (patronCard) => patronCard.message,
  },
};

export default validatePatronCardResolver;
