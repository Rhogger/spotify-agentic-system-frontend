export interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyOwner {
  display_name: string | null;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface SpotifyTracksRef {
  href: string;
  total: number;
}

export interface SpotifyPlaylist {
  collaborative: boolean;
  description: string | null;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[] | null;
  name: string;
  owner: SpotifyOwner;
  primary_color: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: SpotifyTracksRef;
  type: string;
  uri: string;
}

export interface SpotifyPlaylistsResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyPlaylist[];
}

export interface PlaylistsMCPResponse {
  md: string | null;
  json: SpotifyPlaylistsResponse | null;
}

export interface SpotifyArtist {
  name: string;
  id: string;
  uri: string;
}

export interface SpotifyAlbum {
  name: string;
  id: string;
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  uri: string;
}

export interface SpotifyPlaylistTrack {
  added_at: string;
  track: SpotifyTrack;
}

export interface SpotifyPlaylistTracksResponse {
  href: string;
  items: SpotifyPlaylistTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface PlaylistTracksMCPResponse {
  md: string | null;
  json: SpotifyPlaylistTracksResponse | null;
}

export interface Track {
  id: string | number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  addedAt: string;
  image?: string;
}

export interface Playlist {
  id: number | string;
  name: string;
  description?: string | null;
  type: string;
  count: string;
  image?: string;
  icon?: string;
  color?: string;
  gradient?: string;
  active?: boolean;
  owner_name?: string | null;
  formatted_duration?: string;
}

export interface PlaylistDetail {
  id: string;
  name: string;
  description: string | null;
  owner: string;
  followers: number;
  total_tracks: number;
  total_duration_ms: number;
  formatted_duration: string;
  image: string;
  privacy: string;
  snapshot_id: string;
  primary_color?: string;
}

export interface PlaylistDetailMCPResponse {
  md: string | null;
  json: PlaylistDetail | null;
}
