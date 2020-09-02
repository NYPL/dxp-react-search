import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/server/schema';
import DrupalApi from './../../apollo/server/datasources/DrupalApi';
import RefineryApi from './../../apollo/server/datasources/RefineryApi';
//import Cors from 'micro-cors';
import Cors from 'micro-cors-multiple-allow-origin';

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      drupalApi: new DrupalApi(),
      refineryApi: new RefineryApi(),
    }
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
}

/*
 * There's an issue with apollo-server-micro where OPTIONS method
 * will return with the wrong status code.
 *
 * This only happens if you try to make a cross-origin req to the
 * /api/graphql route.
 *
 * @SEE https://github.com/apollographql/apollo-server/issues/2473
 *
*/
// Set cors policy.
const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
  origin: [
    'https://qa-www.nypl.org, https://nypl.org', 'http://localhost:3009'
  ]
});

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
})
