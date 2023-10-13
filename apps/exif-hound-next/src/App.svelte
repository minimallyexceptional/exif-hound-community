<script>
  import ImageList from './components/ImageList.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Toolbar from './components/Toolbar.svelte';


</script>

<html lang="html" class="w-screen h-screen p-0 m-0 overflow-hidden">
  <main id="container" class="flex w-full h-full">
    <div class="h-auto">
      <Sidebar />
    </div>

    <div id="content-section" class="bg-red-400 h-full w-full">  
      
      <div id="toolbar-section" class="flex flex-col justify-center center h-auto w-full bg-pink-600" >
        <Toolbar />
      </div>

      <div id="map-section" class="h-[73vh] bg-blue-900"></div>

      <div id="image-list-section" class="bg-pink-500 h-50">
        <ImageList />
      </div>

    </div>
  </main>
</html>

<style>
</style>
