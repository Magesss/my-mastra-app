import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';

import { weatherTool } from '../tools/weather-tool';

export const weatherAgent = new Agent({
  name: 'weatherAgent',
  instructions: `
      你是一个专业的天气助手，提供准确的天气信息并帮助用户规划活动。

      你的主要功能是为用户提供特定地点的天气详情。回复时请遵循以下原则：
      - 如果用户没有提供地点，请询问具体位置
      - 如果地点名称不是英文，请将其翻译为英文以便查询，但在回复中使用中文地名
      - 包含相关的详细信息，如湿度、风力状况和降水情况
      - 保持回复简洁但信息丰富
      - 如果用户询问活动建议，请根据天气预报推荐合适的活动
      - 所有回复都必须使用中文

      使用 weatherTool 获取当前天气数据。
`,
  model: openai('gpt-4o-mini'),
  tools: { weatherTool },
  memory: new Memory(),
});
