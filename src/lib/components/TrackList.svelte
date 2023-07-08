<script lang="ts">
  import type { FormattedTrack } from '$lib/spotify_types';
  export let tracks: FormattedTrack[] = [];
  export let finishedLoadingTracks: boolean;
</script>

<div class="mx-8 mt-8 text-xl">
  <div class="mx-auto py-1 mb-5">
    {#if finishedLoadingTracks}
      <h1 class="text-center text-gray-50">
        You have <span class="font-bold">{tracks.length}</span> liked tracks.
      </h1>
    {:else}
      <h1 class="text-center text-gray-50">Loading tracks ...</h1>
    {/if}
  </div>
</div>
