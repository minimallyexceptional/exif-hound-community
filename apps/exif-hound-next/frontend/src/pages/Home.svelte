 <script lang="ts">
    import { onMount } from 'svelte';
  
    
    import { SaveFile, CleanFiles, GetImage } from '../../wailsjs/go/main/App.js'
    import loadImages from '../utils/FileLoader.js';
    
    import Map from '../components/Map.svelte';
    import Sidebar from '../components/Sidebar.svelte';

    let imageData: string | null = null; 
  
    function savefile(e) {
          loadImages(e.currentTarget.files)
          .then((data: any) => {
              let image = SaveFile(data.name, data.data, data.ext);
              
              image.then(image => {
                  console.log("GOT IMAGE ", JSON.parse(image));
              })
          })
    }
  
    function getImage() {
      let id = "fbdca23e-149d-4e55-9c92-a47270beca34"
  
      GetImage(id)
      .then(data => {
        imageData = `data:image/png;base64,${JSON.parse(data).ImageData}`;
        console.log('GETITNG IMAGE FROM DATABASE ', imageData)
      })
    }
  
    onMount(() => {
      getImage();
    })
  
  </script>
  
  <main class="page-wrap">
    <div class="sidebar-wrap">
      <Sidebar />
    </div>
    <div class="content-wrap">
      <!-- {#if imageData}
        <img class="demo-image" src={imageData} alt="">
      {/if} -->
      <Map />
    </div>

  </main>
  
  <style>
    .page-wrap {
      display: flex;
      background-color: whitesmoke;
      height: 100%;
      width: 100%;
    }
 
    .sidebar-wrap {
      width: auto;
      height: auto;
      padding: 0;
      margin: 0;
    }

    .content-wrap {
      background-color: tan;
      width: calc(100% - 20px);
      padding: 0;
      margin: 0;
    }

  </style>