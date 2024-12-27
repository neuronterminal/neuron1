import { useState, useCallback } from 'react';
import { LLMManager } from '../utils/llm/llmManager';
import { LLMProvider, LLMConfig } from '../types/llm';

const defaultConfig: LLMConfig = {
  provider: 'local',
  apiKey: '',
  model: 'default',
  maxTokens: 1024
};

export function useLLM() {
  const [llmManager] = useState(() => new LLMManager(defaultConfig));
  const [currentProvider, setCurrentProvider] = useState<string>('local');
  const [isProcessing, setIsProcessing] = useState(false);

  const generateResponse = useCallback(async (prompt: string) => {
    setIsProcessing(true);
    try {
      const response = await llmManager.generateResponse(prompt);
      return response;
    } finally {
      setIsProcessing(false);
    }
  }, [llmManager]);

  const changeProvider = useCallback((providerId: string) => {
    llmManager.setProvider(providerId);
    setCurrentProvider(providerId);
  }, [llmManager]);

  const getProviders = useCallback((): LLMProvider[] => {
    return llmManager.getAvailableProviders();
  }, [llmManager]);

  return {
    generateResponse,
    changeProvider,
    getProviders,
    currentProvider,
    isProcessing
  };
}
