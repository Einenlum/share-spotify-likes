export const CHARSET =
  '0123456789' +
  'ABCDEFGHIJKLMNOPQRSTUVXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  '-._~';

export function generateRandomString(length: number) {
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARSET.length);
    randomString += CHARSET[randomIndex];
  }

  return randomString;
}

export function generateCodeVerifier() {
  return generateRandomString(128);
}

export async function generateChallenge(codeVerifier: string): Promise<string> {
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
