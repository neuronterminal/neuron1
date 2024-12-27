export interface ProcessingContext {
  message: string;
  context?: {
    currentContext?: string;
    [key: string]: any;
  };
  emotion?: {
    score: number;
    [key: string]: any;
  };
  memories?: Array<{
    content: string;
    [key: string]: any;
  }>;
}
