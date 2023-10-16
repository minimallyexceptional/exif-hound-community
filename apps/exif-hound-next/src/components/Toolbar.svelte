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

<nav class="border-b border-gray-200"> 
    <div class="flex h-16 justify-center bg-gray-900">
      
      <div class="flex justify-center align-cente">

        <div id="fileUploadButton" class="flex flex-shrink-0 items-center self-center mr-2 ml-2">
          
          <button class="p-2 rounded bg-white w-full flex flex-row`" on:click={()=> fileinput.click()}>
              <span class="text-black" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                </svg>                 
              </span>
          </button>
          <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => getExifData(e)} bind:this={fileinput} >
      </div>
    </div>
</nav>