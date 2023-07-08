<script lang="ts">
  import { getConnectedUser, getSavedTracksForUser } from '$lib/spotify_client';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import type { CurrentUser, FormattedTrack } from '$lib/spotify_types';
  import LoadedHome from './LoadedHome.svelte';
  let finishedLoadingTracks = false;

  let user: CurrentUser | null = null;
  let savedTracks: FormattedTrack[] = [];

  onMount(async () => {
    user = await getConnectedUser();

    let offset = 0;
    let total = null;
    do {
      let data = await getSavedTracksForUser(offset);
      total = data.total;
      savedTracks = [...savedTracks, ...data.tracks];
      offset = offset + 50;
    } while (total > savedTracks.length);
    finishedLoadingTracks = true;
  });
</script>

{#if user !== null}
  <div transition:fade>
    <LoadedHome {user} {savedTracks} {finishedLoadingTracks} />
  </div>
{/if}
