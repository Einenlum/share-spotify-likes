const CHARSET =
  '0123456789' +
  'ABCDEFGHIJKLMNOPQRSTUVXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  '-._~';

export function getToken() {
  return window.localStorage.getItem('spotifyToken');
}

export function setToken(token: string) {
  window.localStorage.setItem('spotifyToken', token);
}

function clearToken() {
  window.localStorage.removeItem('spotifyToken');
}

export const CLIENT_ID = '3e6dfd4fe9e843ed962bae3eba2f15e0';

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

export function generateRandomString(length: number) {
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARSET.length);
    randomString += CHARSET[randomIndex];
  }

  return randomString;
}

function generateCodeVerifier() {
  return generateRandomString(128);
}

async function generateChallenge(codeVerifier: string): Promise<string> {
  function base64encode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}
