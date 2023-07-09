<script lang="ts">
  import { fade } from 'svelte/transition';
  import CreatePlaylistAction from './CreatePlaylistAction.svelte';
  export let user: CurrentUser;
  export let savedTracks: FormattedTrack[] = [];
  export let totalTracks: number;
  export let finishedLoadingTracks: boolean;
  let status: StatusType = 'ready';
  $: canAct = status === 'ready' && finishedLoadingTracks;
  let playlistUrl: string | null = null;

  function changeStatus(newStatus: StatusType) {
    status = newStatus;
  }

  function setPlaylistUrl(url: string) {
    playlistUrl = url;
  }

  import type { CurrentUser, FormattedTrack } from '$lib/spotify_types';
  import TrackList from './TrackList.svelte';
  import ConnectedUser from './ConnectedUser.svelte';
  import PlaylistCreated from './PlaylistCreated.svelte';
  import type { StatusType } from '$lib/ui_types';
  import Information from './Information.svelte';
</script>

<ConnectedUser {user} />

<TrackList tracks={savedTracks} {finishedLoadingTracks} {totalTracks} />

<div>
  {#if canAct}
    <CreatePlaylistAction
      {changeStatus}
      {user}
      {savedTracks}
      {setPlaylistUrl}
    />
  {:else if status === 'done'}
    <PlaylistCreated {playlistUrl} />
  {/if}
</div>
