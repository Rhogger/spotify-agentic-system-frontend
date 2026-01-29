export interface Playlist {
  id: number | string;
  name: string;
  type: string;
  count: string;
  icon?: string;
  color?: string;
  gradient?: string;
  active?: boolean;
}
