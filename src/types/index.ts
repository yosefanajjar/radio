export interface Station {
  id: string;
  name: string;
  frequency: number;
  avatar: string;
  isPlaying: boolean;
}

export interface RadioState {
  stations: Station[];
  isLoading: boolean;
  error: Error | null;
}
