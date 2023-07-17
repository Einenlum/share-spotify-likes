<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { StatusType } from '$lib/ui_types';
  export let user: CurrentUser;
  export let savedTracks: FormattedTrack[] = [];
  export let changeStatus: (newStatus: StatusType) => void;
  export let setPlaylistUrl: (url: string) => void;
  let playlistUrl: string | null = null;
  let publicPlaylist = true;
  let copied = false;

  import { createPlaylist, addTracksToPlaylist } from '$lib/spotify_client';

  import Button from './Button.svelte';

  import { chunkItems } from '$lib/utils';

  import type { CurrentUser, FormattedTrack } from '$lib/spotify_types';

  function copyPlaylistLinkToClipboard() {
    if (playlistUrl) {
      navigator.clipboard.writeText(playlistUrl);
      copied = true;
    }
  }

  async function createNewPlaylistForLikedSongs(
    user: CurrentUser,
    publicPlaylist: boolean
  ) {
    const playlistName = `Liked Tracks at ${new Date().toLocaleString()}`;
    const playlistDescription =
      'This playlist was created by the Liked Tracks app';

    const playlist = await createPlaylist(
      user.id,
      playlistName,
      playlistDescription,
      publicPlaylist
    );

    return playlist;
  }

  async function createPlaylistAndAddTracks() {
    const statusInterval = setInterval(() => {
      changeStatus('loading');
    }, 500);
    const playlist = await createNewPlaylistForLikedSongs(
      user as CurrentUser,
      publicPlaylist
    );
    const chunks = chunkItems(savedTracks, 100);
    chunks.forEach(async (chunk) => {
      const uris = chunk.map((track) => track.uri);
      await addTracksToPlaylist(playlist.id, uris);
    });

    playlistUrl = playlist.external_urls.spotify;
    setPlaylistUrl(playlistUrl);
    clearInterval(statusInterval);
    changeStatus('done');
  }
</script>

<div class="text-center mx-auto w-64 text-xl">
  <form class="appearance-none">
    <input
      type="checkbox"
      id="publicPlaylist"
      bind:checked={publicPlaylist}
      class=" rounded
      w-3
      h-3
      border-gray-300
      text-green-500
      shadow-sm
      focus:border-black
      focus:ring
      focus:ring-offset-0
      focus:ring-green-900
      focus:ring-opacity-50 checked:bg-green-500"
    />
    <label class="text-white" for="publicPlaylist"
      >Make this playlist public?</label
    >
    {#if publicPlaylist}
      <div
        class="flex items-center bg-green-500 saturate-50 text-white text-base px-4 py-3 my-4 rounded-sm"
        role="alert"
        transition:fade
      >
        <svg
          class="fill-current w-8 h-8 mr-2 text-lg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          ><path
            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
          /></svg
        >
        <p>
          This means your playlist will appear on your profile and in search
          results.
        </p>
      </div>
    {/if}
  </form>
  <Button on:click|once={createPlaylistAndAddTracks}>
    Create a new playlist with your liked tracks
  </Button>
</div>
