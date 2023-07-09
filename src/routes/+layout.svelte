<script>
  import '../app.css';

  import { GITHUB_REPOSITORY_URL } from '$lib/config';
</script>

<div class="pt-6">
  <h1
    class="text-center text-stone-100 text-3xl my-4 md:text-4xl lg:text-5xl mb-12 sm:mb-16 lg:mb-20"
  >
    Share your Spotify likes
  </h1>
  <slot />
</div>

<footer class=" text-white mt-auto mb-12 md:mb-8 lg:mb-4">
  <div class="text-center mx-auto w-full">
    <p>
      Made by <a href="https://einenlum.com" class="underline">Einenlum</a> with
      Sveltekit + TypeScript + TailwindCSS 💛
    </p>
    <p>
      <a href={GITHUB_REPOSITORY_URL} class="underline"
        >Browse the code on GitHub</a
      >
    </p>
  </div>
</footer>
