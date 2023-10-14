<script lang="ts">
  import Map from './pages/map.svelte'

  import createStore from './state';

  const Store = createStore();

</script>

<html lang="html" class="w-screen h-screen p-0 m-0 overflow-hidden">
  <Map />
</html>

<style>
</style>
