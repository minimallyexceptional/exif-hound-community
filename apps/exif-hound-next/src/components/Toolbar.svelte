<script lang="ts">
  import type { ExifImage } from "../types";
  import { loadImages } from "../lib/file-utils";
  import createStore from '../state';

  const Store = createStore();
  
  var fileinput;

  async function getExifData(e) {
    return loadImages(e)
    .then((file: any) => {
      if (file) {
          Store.selectImage(file);
          Store.loadExifImage(file);
          Store.loadMapImage({
            id: file.id,
            lat: file.position.lat,
            long: file.position.long,
            imagePopup: file.imageData.exif.ImageData
          })
      }
    });
  }

</script>

<html lang="html">
  <nav class="border-b border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            
            <button class="p-2 rounded bg-black text-white w-full flex flex-row`" on:click={()=> fileinput.click()}>
                <span class="mr-2 text-white" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>      
                </span>          
                Add Image(s)
            </button>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => getExifData(e)} bind:this={fileinput} >
        </div>
      </div>
    </div>
  </nav>
</html>