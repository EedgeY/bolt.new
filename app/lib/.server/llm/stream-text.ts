import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey, getGoogleAPIKey } from '~/lib/.server/llm/api-key';
import { getGoogleGenerativeAIModel, getOpenAI4oModel, getOpenAI4ominiModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt, type ModelType } from './prompts';

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

export function streamText(messages: Messages, env: Env, options?: StreamingOptions & { modelType?: ModelType }) {
  const modelType = options?.modelType || 'gpt-4o';
  let model;
  let system = getSystemPrompt();

  switch (modelType) {
    case 'gpt-4o':
      model = getOpenAI4oModel(getAPIKey(env));
      break;
    case 'gpt-4o-mini':
      model = getOpenAI4ominiModel(getAPIKey(env));
      break;
    case 'gemini-1.5-pro':
      model = getGoogleGenerativeAIModel(getGoogleAPIKey(env));
      system = ''; // Geminiモデルはsystemプロンプトをサポートしていないため
      break;
    default:
      throw new Error(`Unsupported model type: ${modelType}`);
  }

  return _streamText({
    model,
    system,
    maxTokens: MAX_TOKENS,
    messages: convertToCoreMessages(messages as any),
    ...options,
  });
}
