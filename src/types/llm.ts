export interface LLMProvider {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  isAvailable: boolean;
}

export interface LLMConfig {
  provider: string;
  apiKey: string;
  model: string;
  maxTokens: number;
}

export interface LLMResponse {
  content: string;
  error?: string;
}
