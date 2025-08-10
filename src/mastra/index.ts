
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";
import { graphqlServer } from '../graphql/server';


export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },

  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  deployer: new CloudflareDeployer({
    env: {
      CLOUDFLARE_ACCOUNT_ID: "70e4bf0f3e51fe1e4f5a7eb2f5b00a1a",
      CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN!,
      CLOUDFLARE_API_EMAIL: "Maqingjie646@gmail.com"
    },
    projectName: "hello-mastra"
  }),
  apis: [
    {
      path: '/graphql',
      method: 'POST',
      handler: async (c) => {
        try {
          const body = await c.req.json();
          const { query, variables } = body;
          
          // 处理hello查询
          if (query && query.includes('hello')) {
            return c.json({
              data: {
                hello: "Hello from Mastra Weather GraphQL API!"
              }
            });
          }
          
          // 处理getWeather mutation
          if (query && query.includes('getWeather')) {
            const input = variables?.input;
            if (!input) {
              return c.json({
                errors: [{ message: 'Input is required for weather query' }]
              });
            }
            
            const result = await weatherAgent.generate([
              { role: 'user', content: input }
            ]);

            return c.json({
              data: {
                getWeather: {
                  success: true,
                  message: {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: result.text,
                    timestamp: new Date().toISOString()
                  },
                  error: null
                }
              }
            });
          }
          
          return c.json({
            errors: [{ message: 'Unknown query or mutation' }]
          });
        } catch (error) {
          console.error('GraphQL error:', error);
          return c.json({
            errors: [{ message: error instanceof Error ? error.message : 'Unknown error occurred' }]
          });
        }
      }
    },
    {
      path: '/graphql',
      method: 'GET',
      handler: async (c) => {
        return c.text('GraphQL endpoint is available at POST /graphql');
      }
    }
  ]
});

