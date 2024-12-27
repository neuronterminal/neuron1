export function generateElizaResponse(input: string): string {
  // Basic ELIZA response generation
  if (input.toLowerCase().includes('hello')) {
    return "Hello! How are you feeling today?";
  }
  return "Please tell me more about that.";
}
