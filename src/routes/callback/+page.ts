import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
  const code = params.url.searchParams.get('code');
  const state = params.url.searchParams.get('state');

  return { code, state };
};
