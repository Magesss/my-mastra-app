export const typeDefs = `
  type WeatherMessage {
    id: ID!
    role: String!
    content: String!
    timestamp: String!
  }

  type WeatherResponse {
    success: Boolean!
    message: WeatherMessage
    error: String
  }

  type Query {
    hello: String!
  }

  type Mutation {
    getWeather(input: String!): WeatherResponse!
  }
`;
