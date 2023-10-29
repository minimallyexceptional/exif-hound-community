<script lang="ts">
  
  import { SaveFile, CleanFiles, GetImage } from '../wailsjs/go/main/App.js'
  import loadImages from './utils/FileLoader';

  let resultText: string = "Please enter your name below 👇"
  let name: string

  function savefile(e) {
        loadImages(e.currentTarget.files)
        .then((data: any) => {
            let image = SaveFile(data.name, data.data, data.ext);
            
            image.then(image => {
                console.log("GOT IMAGE ", JSON.parse(image));
            })
        })
  }

  function getImage(e) {
    let id = "123DD123DS-312DDSD0-SAD232DW-DAS21DSQ"

    GetImage(id)
    .then(data => {
      console.log('GETITNG IMAGE FROM DATABASE ', JSON.parse(data))
    })
  }

</script>

<main>
    <h1>Hello Wails</h1>
    <input type="file" name="upload" id="upload" on:change={savefile} />
    
    <button on:click={CleanFiles}>Clean Files</button>
    <button on:click={getImage}>Get Image</button>
</main>
