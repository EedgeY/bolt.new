import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey, getGoogleAPIKey } from '~/lib/.server/llm/api-key';
import { getGoogleGenerativeAIModel, getOpenAIModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

// export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
//   return _streamText({
//     model: getOpenAIModel(getAPIKey(env)),
//     system: getSystemPrompt(),
//     maxTokens: MAX_TOKENS,
//     headers: {
//       'openai-beta': 'max-tokens-gpt-4o-2024-07-15',
//     },
//     messages: convertToCoreMessages(messages),
//     ...options,
//   });
// }

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  return _streamText({
    model: getGoogleGenerativeAIModel(getGoogleAPIKey(env)),
    system: getSystemPrompt(),
    maxTokens: MAX_TOKENS,
    messages: convertToCoreMessages(messages),
    ...options,
  });
}
