<script lang="ts">
  import { getConnectedUser, getSavedTracksForUser } from '$lib/spotify_client';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import type { CurrentUser, FormattedTrack } from '$lib/spotify_types';
  import LoadedHome from './LoadedHome.svelte';
  import { goto } from '$app/navigation';
  let finishedLoadingTracks = false;

  let user: CurrentUser | null = null;
  let savedTracks: FormattedTrack[] = [];
  let totalTracks = 0;

  onMount(async () => {
    user = await getConnectedUser();
    if (!user) {
      return goto('/login');
    }

    let offset = 0;
    do {
      let data = await getSavedTracksForUser(offset);
      totalTracks = data.total;
      savedTracks = [...savedTracks, ...data.tracks];
      offset = offset + 50;
    } while (totalTracks > savedTracks.length);
    finishedLoadingTracks = true;
  });
</script>

{#if user}
  <div transition:fade>
    <LoadedHome {user} {savedTracks} {finishedLoadingTracks} {totalTracks} />
  </div>
{/if}
