import { error, redirect } from '@sveltejs/kit';
import { CLIENT_ID, REDIRECT_URI, SCOPES } from './config';
import { throwUnauthenticated } from './authentication';

import {
  getState,
  getCodeVerifierAndChallenge,
  getToken as getStoredToken,
} from './authentication';

import type {
  AccessTokenResponse,
  addTracksToPlaylistResponse,
  createPlaylistResponse,
  FetchedCurrentUser,
  CurrentUser,
  FormattedTrack,
  SavedTracksResponse,
} from './spotify_types';
import { goto } from '$app/navigation';

export async function createAccessToken(code: string) {
  const { codeVerifier, challenge } = await getCodeVerifierAndChallenge();
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  const data = {
    client_id: CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  };

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams(data).toString(),
  });

  if (!response.ok) {
    await throwUnauthenticated('Could not create access token', response);
  }
  const json: AccessTokenResponse = await response.json();

  return json.access_token;
}

export async function getConnectedUser() {
  const token = getStoredToken();
  if (!token) {
    goto('/login');
  }

  const url = 'https://api.spotify.com/v1/me';
  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch(url, { headers: headers });

  if (!response.ok) {
    await throwUnauthenticated('Could not get connected user', response);
  }
  const json: FetchedCurrentUser = await response.json();

  return { display_name: json.display_name, id: json.id };
}

export async function getUserPlaylists() {
  const token = getStoredToken();
  if (!token) {
    goto('/login');
  }

  const url = 'https://api.spotify.com/v1/me/playlists';
  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch(url, { headers: headers });
  if (!response.ok) {
    await throwUnauthenticated('Could not get user playlists', response);
  }
  const json = await response.json();

  return json;
}

export async function getSavedTracksForUser(offset = 0) {
  const token = getStoredToken();
  if (!token) {
    goto('/login');
  }

  const params = { limit: '50', offset: offset.toString() };
  const queryParams = new URLSearchParams(params).toString();
  const url = `https://api.spotify.com/v1/me/tracks?${queryParams}`;
  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch(url, { headers: headers });

  if (!response.ok) {
    await throwUnauthenticated('Could not get saved tracks for user', response);
  }

  const json: SavedTracksResponse = await response.json();

  const tracks = json.items.map((item) => {
    return {
      name: item.track.name,
      uri: item.track.uri,
      artists: item.track.artists.map((artist) => artist.name).join(', '),
    } as FormattedTrack;
  });

  return { total: json.total, tracks: tracks };
}

export async function createPlaylist(
  userId: string,
  name: string,
  description: string,
  publicPlaylist: boolean
) {
  const token = getStoredToken();
  if (!token) {
    goto('/login');
  }

  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const data = {
    name: name,
    description: description,
    public: publicPlaylist,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await throwUnauthenticated('Could not create playlist', response);
  }

  const json: createPlaylistResponse = await response.json();

  return json;
}

export async function addTracksToPlaylist(playlist_id: string, uris: string[]) {
  const token = getStoredToken();
  if (!token) {
    goto('/login');
  }

  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ uris: uris }),
  });

  if (!response.ok) {
    await throwUnauthenticated('Could not add tracks to playlist', response);
  }

  const json: addTracksToPlaylistResponse = await response.json();

  return json;
}
