import { ProcessingContext } from '../../types/process';
import { Intent } from '../../types/agent';

export function generateContextualPrompt(context: ProcessingContext): string {
  const emotionContext = context.emotion?.score > 0 ? 'positive' : 
                        context.emotion?.score < 0 ? 'negative' : 'neutral';

  const memoryContext = context.memories
    ?.map(m => m.content)
    .join('\n') || '';

  return `Context Analysis:
- Topic: ${context.context?.currentContext || 'general'}
- Emotional State: ${emotionContext}
- Recent Memory Context:
${memoryContext}

User Message:
${context.message}

Instructions:
1. Provide a detailed, accurate response
2. Use technical language when appropriate
3. Draw from relevant memories to maintain conversation continuity
4. Show emotional intelligence by acknowledging the user's emotional state

Response:`;
}
