import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

export const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
];

export const CLIENT_ID: string = PUBLIC_CLIENT_ID;
export const REDIRECT_URI: string = PUBLIC_REDIRECT_URI;
export const GITHUB_REPOSITORY_URL =
  'https://github.com/Einenlum/share-spotify-likes';
