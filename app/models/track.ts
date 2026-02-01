export interface Track {
  id: number;
  spotify_id: string;
  name: string;
  artists: string;
  duration_ms: number;
  energy: number;
  danceability: number;
  valence: number;
  acousticness: number;
  instrumentalness: number;
  speechiness: number;
  explicit: boolean;
  image_url: string;
}

export interface RecommendationPayload {
  energy: number;
  danceability: number;
  valence: number;
  acousticness: number;
  is_popular: boolean;
  explicit: boolean;
  decade: string;
}

export interface RecommendationResponse {
  recommendations: Track[];
}
