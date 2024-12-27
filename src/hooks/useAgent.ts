import { useState, useCallback } from 'react';
import { ProcessingContext } from '../types/process';
import { analyzeIntent } from '../utils/nlp/intentAnalysis';
import { generateContextualPrompt } from '../utils/prompts/contextual';
import { useLLM } from './useLLM';

export function useAgent() {
  const [isThinking, setIsThinking] = useState(false);
  const { generateResponse, currentProvider } = useLLM();

  const processInput = useCallback(async (context: ProcessingContext): Promise<string> => {
    if (!context.message) {
      throw new Error('Empty message received');
    }

    setIsThinking(true);
    try {
      const intent = await analyzeIntent(context.message);
      const prompt = generateContextualPrompt(context);
      const response = await generateResponse(prompt);
      
      if (!response?.content) {
        throw new Error('Invalid response from LLM');
      }

      return response.content;
    } catch (error) {
      console.error('Error in agent processing:', error);
      throw error;
    } finally {
      setIsThinking(false);
    }
  }, [generateResponse]);

  return {
    processInput,
    isThinking,
    currentProvider
  };
}
