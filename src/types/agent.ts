export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  error?: boolean;
}

export interface Intent {
  type: 'question' | 'statement' | 'command' | 'emotion';
  confidence: number;
  original: string;
}

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