import {
  generateRandomString,
  generateCodeVerifier,
  generateChallenge,
} from '$lib/security';


export function getToken() {
  return window.localStorage.getItem('spotifyToken');
}

export function setToken(token: string) {
  window.localStorage.setItem('spotifyToken', token);
}

export function getState() {
  if (!window.localStorage.getItem('state')) {
    window.localStorage.setItem('state', generateRandomString(128));
  }

  return window.localStorage.getItem('state') as string;
}

export function clearToken() {
  window.localStorage.removeItem('spotifyToken');
}

export async function getCodeVerifierAndChallenge() {
  if (
    !window.localStorage.getItem('codeVerifier') ||
    !window.localStorage.getItem('challenge')
  ) {
    const codeVerifier = generateCodeVerifier();

    const challenge = await generateChallenge(codeVerifier);

    window.localStorage.setItem('codeVerifier', codeVerifier);
    window.localStorage.setItem('challenge', challenge);
  }

  return {
    codeVerifier: localStorage.getItem('codeVerifier') as string,
    challenge: localStorage.getItem('challenge') as string,
  };
}
