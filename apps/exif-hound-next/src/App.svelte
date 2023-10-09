<script>
  import Greet from './lib/Greet.svelte'
  import { loadImages } from './lib/file-utils.js'
  import { images } from './lib/store.js';

</script>

<main class="container">
  <h1>Welcome to THE SVT STACK</h1>

  <div class="row ">
    <a href="https://svelte.dev" target="_blank">
      <img src="/svelte.svg" class="logo svelte" alt="Svelte Logo" />
    </a>
    <a href="https://tauri.app" target="_blank">
      <img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
    </a>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo vite" alt="Vite Logo" />
    </a>
    <input id="image-input" type="file" on:change={(e) =>  loadImages(e, images)} multiple />
  </div>

  <p>
    Click on the Tauri, Vite, and Svelte logos to learn more.
  </p>

  <div class="row">
    <Greet />
  </div>

  <div class="row">
    <h2>Images</h2>
    <ul>
      {#each $images as image}
        <li class="bg-green-800 text-red-400">{image.Name}</li>
      {/each}
    </ul>

</main>

<style>
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00);
  }
</style>
