# My Mastra App

A Mastra application with weather agent deployed on Cloudflare Workers.

## Features

- Weather information agent
- Cloudflare Workers deployment
- Logging with Pino

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables:
Create a `.env` file with:
```
CLOUDFLARE_API_TOKEN=your_token_here
```

3. Build and deploy:
```bash
pnpm build
pnpm deploy
```

## Development

- `src/mastra/agents/weather-agent.ts` - Weather agent implementation
- `src/mastra/tools/weather-tool.ts` - Weather tool implementation
- `src/mastra/workflows/weather-workflow.ts` - Weather workflow implementation