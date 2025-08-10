import { weatherAgent } from '../mastra/agents/weather-agent';

export const resolvers = {
  Query: {
    hello: () => "Hello from Mastra Weather GraphQL API!",
  },
  Mutation: {
    getWeather: async (_: any, { input }: { input: string }) => {
      try {
        const result = await weatherAgent.generate([
          { role: 'user', content: input }
        ]);

        return {
          success: true,
          message: {
            id: Date.now().toString(),
            role: 'assistant',
            content: result.text,
            timestamp: new Date().toISOString()
          },
          error: null
        };
      } catch (error) {
        console.error('Weather query error:', error);
        return {
          success: false,
          message: null,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
      }
    }
  }
};
