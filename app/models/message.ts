export interface Message {
  id: number | string;
  role: 'user' | 'assistant';
  content: string;
}
