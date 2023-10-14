<script>
    import { onMount } from 'svelte';
    import { images } from '../lib/images';
    import { selected } from '../lib/selected';

    let selectedItem = null;

    onMount(() => {
        const scrollContainer = document.querySelector("#scrollbar");

        scrollContainer.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            scrollContainer.scrollLeft += evt.deltaY;
        });
    });

    function clearSelection() {
        images.clearSelection();
    }


    function selectImage(image) {
        if (image && image.file) {
            selected.set(image);
        }
    }

    selected.subscribe((selected) => {
        if (selected) {
            selectedItem = selected.id;
        }
    })

</script>

<html lang="html">
    <div id="image-list-wrap" class="flex justify-around w-full h-[200px] bg-gray-600">
        <div id="scrollbar" class="image-list flex justify-start w-full h-full align-middle overflow-x-scroll" role="button" tabindex="0">
            {#each $images as image}
                <button class="p-0 m-0 mr-5 ml-5 max-h-[120px] w-auto self-center select-none" on:click={() => selectImage(image)}>
                    <img
                        class={`rounded-xl max-h-[120px] w-auto self-center select-none" shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] ${selectedItem === image.id ? 'border-4 border-blue-400' : ''}`} 
                        src={image.file.exifData.ImageData}
                        alt={image.file.exifData.Software}
                        role="navigation"
                    >
                </button>
            {/each}
        </div>
    </div>
</html>

<style>
    #scrollbar::-webkit-scrollbar-track
    {
        background-color: #696969;
    }

    #scrollbar::-webkit-scrollbar
    {
        height: 10px;
    }

    #scrollbar::-webkit-scrollbar-thumb
    {
        background-color: #111111;
    }
</style>