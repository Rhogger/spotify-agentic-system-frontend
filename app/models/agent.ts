export interface AgentTrack {
  id: number;
  spotify_id: string;
  name: string;
  artists: string;
  duration_ms: number;
  image_url: string;
  energy?: number;
  danceability?: number;
  valence?: number;
  acousticness?: number;
  explicit?: boolean;
}

export interface AgentPlaylist {
  id: string | number;
  name: string;
  description: string | null;
  image: string | null;
}

export interface AgentChatResponse {
  response: string;
  tracks: AgentTrack[] | null;
  playlists: AgentPlaylist[] | null;
}
