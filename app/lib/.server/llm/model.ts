import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
export function getOpenAI4oModel(apiKey: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai('gpt-4o-mini');
}

export function getOpenAI4ominiModel(apiKey: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai('gpt-4o-mini');
}

export function getGoogleGenerativeAIModel(apiKey: string) {
  const google = createGoogleGenerativeAI({
    apiKey,
  });

  return google('gemini-1.5-pro-latest');
}
