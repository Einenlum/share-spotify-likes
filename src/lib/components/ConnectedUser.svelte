<script lang="ts">
  import type { CurrentUser } from '$lib/spotify_types';
  import { clearToken } from '$lib/authentication';
  import { goto } from '$app/navigation';

  function disconnect() {
    clearToken();
    goto('/login');
  }

  export let user: CurrentUser;
</script>

<div class="mx-auto w-44 text-center text-slate-100 flex md:text-lg">
  <p class="my-2 flex-auto">hello {user.display_name} 👋</p>

  <button
    on:click={disconnect}
    class="flex-auto bg-slate-800 w-1 h-fit rounded-full text-sm"
    title="Disconnect">x</button
  >
</div>
