<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 200 }}>
  <p class="text-center mx-auto w-36 text-slate-200">
    <slot />
  </p>
</div>
