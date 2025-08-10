
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
      path: '/api/weather',
      method: 'POST',
      handler: async (c) => {
        try {
          const body = await c.req.json();
          const message = body.message || body.input;
          
          const result = await weatherAgent.generate([
            { role: 'user', content: message }
          ]);

          return c.json({
            success: true,
            message: {
              id: Date.now().toString(),
              role: 'assistant',
              content: result.text,
              timestamp: new Date().toISOString()
            },
            error: null
          });
        } catch (error) {
          console.error('Weather query error:', error);
          return c.json({
            success: false,
            message: null,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
          });
        }
      }
    },
    {
      path: '/api/hello',
      method: 'GET',
      handler: async (c) => {
        return c.json({ message: "Hello from Mastra Weather API!" });
      }
    }
  ]
});
