import { Memory, MemoryType } from './types';
import { embedText } from '../ml/encoder';

export class LongTermMemory {
  private memories: Memory[] = [];
  private readonly MAX_MEMORIES = 1000;

  async store(content: string, type: MemoryType) {
    const embeddingTensor = await embedText(content);
    const embedding = Array.from(await embeddingTensor.data());
    
    const memory: Memory = {
      id: crypto.randomUUID(),
      content,
      type,
      embedding,
      timestamp: new Date(),
      accessCount: 0,
      lastAccessed: null
    };

    this.memories.push(memory);
    this.pruneOldMemories();
  }

  async recall(query: string, limit = 5): Promise<Memory[]> {
    const queryTensor = await embedText(query);
    const queryEmbedding = Array.from(await queryTensor.data());
    
    return this.memories
      .map(memory => ({
        memory,
        similarity: this.calculateSimilarity(memory.embedding, queryEmbedding)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(({ memory }) => {
        memory.accessCount++;
        memory.lastAccessed = new Date();
        return memory;
      });
  }

  private calculateSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private pruneOldMemories() {
    if (this.memories.length > this.MAX_MEMORIES) {
      this.memories.sort((a, b) => 
        (b.accessCount - a.accessCount) || 
        (a.timestamp.getTime() - b.timestamp.getTime())
      );
      this.memories = this.memories.slice(0, this.MAX_MEMORIES);
    }
  }
}
