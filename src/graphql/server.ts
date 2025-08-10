import { createYoga } from 'graphql-yoga';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

export const graphqlServer = createYoga({
  schema: {
    typeDefs,
    resolvers,
  },
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
  },
  graphqlEndpoint: '/graphql',
});
