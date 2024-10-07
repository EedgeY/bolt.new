import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
export function getOpenAIModel(apiKey: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai('gpt-4o');
}

export function getGoogleGenerativeAIModel(apiKey: string) {
  const google = createGoogleGenerativeAI({
    apiKey,
  });

  return google('gemini-1.5-pro-latest');
}
