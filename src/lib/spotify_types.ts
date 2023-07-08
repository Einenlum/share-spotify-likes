export interface AccessTokenResponse {
  access_token: string;
}

export interface FetchedCurrentUser {
  display_name: string;
  id: string;
}

export interface CurrentUser {
  display_name: string;
  id: string;
}

export interface CurrentUserResponse extends FetchedCurrentUser {
  uri: string;
}

export interface FormattedTrack {
  name: string;
  uri: string;
  artists: string;
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
  external_urls: {
    spotify: string;
  };
}

export interface addTracksToPlaylistResponse {
  snapshot_id: string;
}
