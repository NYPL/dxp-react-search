// downloadTypeDefs.js
const { fetchTypeDefs } = require('apollo-mocked-provider');

(() => {
  fetchTypeDefs({ uri: 'http://localhost:3000/api/graphql' });
})();
