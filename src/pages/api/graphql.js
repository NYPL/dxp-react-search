import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/server/schema';
import DrupalApi from './../../apollo/server/datasources/DrupalApi';

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      drupalApi: new DrupalApi(),
    }
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' });
