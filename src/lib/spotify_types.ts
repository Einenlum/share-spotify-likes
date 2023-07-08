export interface AccessTokenResponse {
  access_token: string;
}

export interface CurrentUserResponse {
  display_name: string;
  id: string;
  uri: string;
}

export interface SavedTrack {
  track: {
    id: string;
    name: string;
    uri: string;
    album: {
      name: string;
      uri: string;
    };
    artists: [
      {
        name: string;
        id: string;
        uri: string;
      }
    ];
  };
}

export interface SavedTracksResponse {
  items: SavedTrack[];
  next: string | null;
  total: number;
}

export interface createPlaylistResponse {
  id: string;
  uri: string;
  description: string;
  name: string;
}

export interface addTracksToPlaylistResponse {
  snapshot_id: string;
}
