<script lang="ts">
  import type { ExifImage } from "../types";
  import { loadImages } from "../lib/file-utils";
  import createStore from '../state';

  const Store = createStore();
  
  var fileinput;

  async function getExifData(e) {
    return loadImages(e)
    .then((file: ExifImage) => {
      if (file) {
          Store.selectImage(file);
          Store.loadExifImage(file);
          Store.loadMapImage({
            id: file.id,
            lat: file.position.lat,
            long: file.position.long,
            imagePopup: file.imageData.exif.ImageData
          });
          
          Store.toggleExifPanel();
      }
    });
  }

</script>

<nav class="border-b border-gray-200 bg-black"> 
    <div class="flex h-16 justify-center bg-black">
      
      <div class="flex justify-center align-cente">

        <div id="fileUploadButton" class="flex flex-shrink-0 items-center self-center mr-2 ml-2">
          
          <button class="p-2 rounded bg-white w-full flex flex-row`" on:click={()=> fileinput.click()}>
              <span class="text-black" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>      
              </span>
          </button>
          <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => getExifData(e)} bind:this={fileinput} >
      </div>
      
    </div>
</nav>