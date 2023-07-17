<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { fade } from 'svelte/transition';

  import { getCodeVerifierAndChallenge } from '$lib/authentication';
  import { CLIENT_ID, REDIRECT_URI, SCOPES } from '$lib/config';
  import { getState } from '$lib/authentication';

  let loading = false;

  async function getConnectUrl() {
    const { challenge } = await getCodeVerifierAndChallenge();

    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      state: getState(),
      scope: SCOPES.join(' '),
      code_challenge_method: 'S256',
      code_challenge: challenge,
    };

    const queryParams = new URLSearchParams(params).toString();

    return `https://accounts.spotify.com/authorize?${queryParams}`;
  }

  async function goToConnectUrl() {
    loading = true;
    const url = await getConnectUrl();

    window.location.href = url;
  }
</script>

<div class="mt-12 mx-auto w-10/12 md:w-96 h-60 text-center pt-16">
  <p class="text-zinc-50 text-lg">You are not connected.</p>

  <div
    class="mx-auto bg-gradient-to-tr from-slate-700 to-transparent h-fit mt-8 rounded-xl px-4"
  >
    <p class="text-center text-white py-10">
      This app only executes in your browser. No one except you and Spotify can
      access your data.
    </p>

    <p class="text-center text-white mt-10 pb-5 font-bold">
      This app is open-source and made by a third party. This is not an official Spotify app.
    </p>
  </div>

  {#if !loading}
    <div transition:fade class="mt-8 lg:mt-12">
      <Button on:click|once={goToConnectUrl}>Connect to Spotify</Button>
    </div>
  {/if}
</div>
