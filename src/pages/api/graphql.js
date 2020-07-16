import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/server/schema';
import DrupalApi from './../../apollo/server/datasources/DrupalApi';
import RefineryApi from './../../apollo/server/datasources/RefineryApi';

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

export default apolloServer.createHandler({ path: '/api/graphql' });
