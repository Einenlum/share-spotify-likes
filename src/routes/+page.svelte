<script lang="ts">
  import { goto } from '$app/navigation';
  import { getToken } from '$lib/authentication';
  import Home from '$lib/components/Home.svelte';
  import { onMount } from 'svelte';

  let token: string | null = null;
  onMount(async () => {
    token = getToken();
    if (!token) {
      goto('/login');
    }
  });
</script>

<Home />
