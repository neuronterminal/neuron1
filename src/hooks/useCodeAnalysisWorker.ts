import { useState } from 'react';
import { CodeAnalysis } from '../features/codeAnalysis/types';

export function useCodeAnalysisWorker() {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = (code: string) => {
    setIsAnalyzing(true);
    // Analysis logic here
    setIsAnalyzing(false);
  };

  return { analyzeCode, analysis, isAnalyzing };
}
