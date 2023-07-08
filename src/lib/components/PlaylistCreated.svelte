<script lang="ts">
  import Button from './Button.svelte';
  import Information from './Information.svelte';

  export let playlistUrl: string | null;
  let copied = false;

  function copyPlaylistLinkToClipboard() {
    navigator.clipboard.writeText(playlistUrl as string);
    copied = true;

    setInterval(() => {
      copied = false;
    }, 1000);
  }
</script>

<div class="text-center mx-auto">
  <div class="mx-auto text-center text-white text-lg mt-12">
    <p class="">Playlist created! ✅</p>
  </div>
  <div>
    <div class="mt-8">
      <Button on:click={copyPlaylistLinkToClipboard}
        >Copy playlist link to clipboard</Button
      >
    </div>
    {#if copied}
      <div class="mt-8 text-lg">
        <Information>Link copied!</Information>
      </div>
    {/if}
  </div>
</div>
