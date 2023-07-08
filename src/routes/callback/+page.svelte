<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getState, setToken } from '$lib/authentication';
  import { createAccessToken } from '$lib/spotify_client';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  let code: string | null = null;

  onMount(async () => {
    code = $page.url.searchParams.get('code');
    const state = $page.url.searchParams.get('state');

    if (code === null && !state) {
      goto('/login');
    }

    // csrf error
    if (state !== getState()) {
      goto('/login');
    }

    const spotifyToken = await createAccessToken(code as string);
    setToken(spotifyToken);

    goto('/');
  });
</script>
