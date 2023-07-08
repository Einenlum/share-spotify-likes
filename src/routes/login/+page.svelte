<script>
  import { openSpotifyConnectPage } from '$lib/spotify_client';

  let clicked = false;

  const openConnectPage = async () => {
    await openSpotifyConnectPage();
    clicked = true;
  };
</script>

{#if clicked}
  <p>You can now close this tab.</p>
{:else}
  <h1>Please login to Spotify</h1>

  <p>You are not connected</p>
  <button on:click={openConnectPage}>Connect to Spotify</button>
{/if}
