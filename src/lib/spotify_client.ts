import { redirect } from '@sveltejs/kit';

import {
  CLIENT_ID,
  getCodeVerifierAndChallenge,
  generateRandomString,
  getToken as getStoredToken,
} from './authentication';

import type {
  AccessTokenResponse,
  addTracksToPlaylistResponse,
  createPlaylistResponse,
  CurrentUserResponse,
  SavedTracksResponse,
} from './spotify_types';

const PORT = 5173;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
];

export async function openSpotifyConnectPage() {
  const { challenge } = await getCodeVerifierAndChallenge();
  const state = generateRandomString(128);

  const params = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: SCOPES.join(' '),
    code_challenge_method: 'S256',
    code_challenge: challenge,
  };

  const queryParams = new URLSearchParams(params).toString();
  const url = `https://accounts.spotify.com/authorize?${queryParams}`;

  window.open(url);
}

export async function getToken(code: string) {
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

  const json: AccessTokenResponse = await response.json();

  return json.access_token;
}

export async function getConnectedUser() {
  const token = getStoredToken();
  if (!token) {
    throw redirect(301, '/login');
  }

  const url = 'https://api.spotify.com/v1/me';
  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch(url, { headers: headers });
  const json: CurrentUserResponse = await response.json();

  return { name: json.display_name, id: json.id };
}

export async function getUserPlaylists() {
  const token = getStoredToken();
  if (!token) {
    throw redirect(301, '/login');
  }

  const url = 'https://api.spotify.com/v1/me/playlists';
  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch(url, { headers: headers });
  const json = await response.json();

  return json;
}

export async function getSavedTracksForUser(offset = 0) {
  const token = getStoredToken();
  if (!token) {
    throw redirect(301, '/login');
  }

  const params = { limit: '50', offset: offset.toString() };
  const queryParams = new URLSearchParams(params).toString();
  const url = `https://api.spotify.com/v1/me/tracks?${queryParams}`;
  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch(url, { headers: headers });
  const json: SavedTracksResponse = await response.json();

  const tracks = json.items.map((item) => {
    return {
      name: item.track.name,
      uri: item.track.uri,
      artists: item.track.artists.map((artist) => artist.name).join(', '),
    };
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
    throw redirect(301, '/login');
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

  const json: createPlaylistResponse = await response.json();

  return json;
}

export async function addTracksToPlaylist(playlist_id: string, uris: string[]) {
  const token = getStoredToken();
  if (!token) {
    throw redirect(301, '/login');
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

  const json: addTracksToPlaylistResponse = await response.json();

  return json;
}
