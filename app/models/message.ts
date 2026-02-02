import type { AgentTrack, AgentPlaylist } from './agent';

export interface Message {
  id: number | string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  parts: { type: 'text'; text: string }[];
  tracks?: AgentTrack[];
  playlists?: AgentPlaylist[];
}
