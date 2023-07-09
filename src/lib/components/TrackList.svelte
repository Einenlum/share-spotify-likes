<script lang="ts">
  import { tweened } from 'svelte/motion';
  import type { FormattedTrack } from '$lib/spotify_types';
  export let tracks: FormattedTrack[] = [];
  export let finishedLoadingTracks: boolean;
  export let totalTracks: number;
  $: currentTotal = tracks.length;
  $: currentProgress = currentTotal / totalTracks;

  const progress = tweened(0, {
    duration: 300,
  });

  $: if (typeof currentProgress === 'number' && !isNaN(currentProgress)) {
    progress.set(currentProgress);
  }
</script>

<div class="mx-8 mt-8 text-xl">
  <div class="mx-auto py-1 mb-5">
    {#if finishedLoadingTracks}
      <h1 class="text-center text-gray-50">
        You have <span class="font-bold">{tracks.length}</span> liked tracks.
      </h1>
    {:else}
      <div class="text-center">
        <h1 class=" text-gray-50">
          Loading {currentTotal}/{totalTracks} tracks ...
        </h1>
        <progress
          class="mt-4 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400"
          value={$progress}
        />
      </div>
    {/if}
  </div>
</div>
