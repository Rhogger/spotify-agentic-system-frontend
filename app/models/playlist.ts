export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: SpotifyImage[];
  tracks: {
    total: number;
  };
}

export interface Playlist {
  id: number | string;
  name: string;
  type: string;
  count: string;
  image?: string;
  icon?: string;
  color?: string;
  gradient?: string;
  active?: boolean;
}
