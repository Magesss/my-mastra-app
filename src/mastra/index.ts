
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";


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
  })
});

