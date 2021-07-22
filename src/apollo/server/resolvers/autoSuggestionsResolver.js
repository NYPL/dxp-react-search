const autoSuggestionsResolver = {
  Query: {
    allAutoSuggestions: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAutoSuggestions(args);
      return response;
    },
  },
  AutoSuggestion: {
    name: autoSuggestion => autoSuggestion.title.replace("&#039;", "'")
  }
}

export default autoSuggestionsResolver;