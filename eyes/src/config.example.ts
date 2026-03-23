export type LLMProvider = 'openai' | 'anthropic' | 'custom';

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  baseUrl?: string; // Optional: For custom proxies or local models
  model: string;
}

// Rename this file to config.ts and fill in your values
export const config: LLMConfig = {
  provider: 'anthropic', // or 'openai'
  apiKey: 'sk-ant-api03-...', // Put your key here
  model: 'claude-3-5-sonnet-20241022', // or 'gpt-4o'
  // baseUrl: 'https://api.anthropic.com/v1/messages' // Optional
};
