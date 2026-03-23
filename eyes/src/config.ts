export type LLMProvider = 'openai' | 'anthropic' | 'custom';

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  baseUrl?: string;
  model: string;
}

export const config: LLMConfig = {
  provider: 'anthropic',
  baseUrl: 'https://open.bigmodel.cn/api/anthropic',
  apiKey: 'bfedba7839b943b58113355ce03669e3.iOMaODSva7065Drm', // User needs to fill this
  model: 'glm-4.6'
};
