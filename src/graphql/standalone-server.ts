import { createServer } from 'http';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
  },
});

const server = createServer(yoga);

const PORT = 4113;

server.listen(PORT, () => {
  console.log(`🚀 GraphQL server running at http://localhost:${PORT}/graphql`);
});
