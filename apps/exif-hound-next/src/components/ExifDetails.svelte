<script>
    import createStore from "../state";

    let currentKeys = [];
    let currentValues = [];
    let imageSelected;
    
    const Store = createStore();

    Store.subscribe(store => {
        if (store.selectedImage) {
            currentKeys = Object.keys(store.selectedImage.imageData.exif);
            currentValues = Object.values(store.selectedImage.imageData.exif);
            imageSelected = store.selectedImage;
        }
    })
</script>

<div class="exif-details flex h-full w-[500px] bg-white overflow-auto justify-center">

    {#if currentKeys.length > 0}
        <ul class="h-auto flex flex-col justify-center">
            {#each currentKeys as key, i (i)}            
                <li  class="text-black p-2 mt-2 mb-2 h-[75px]">
                    <div id="exif-property" class="w-[398px] flex justify-between p-3">
                        <div id="exif-prop" class="w-auto font-bold self-center mr-2">
                            {key}
                        </div>
                        <div id="exif-value" class="w-auto font-light self-center mr-4 overflow-auto">
                            {currentValues[i] !== "undefined" && currentValues[i] !== null ? currentValues[i] : 'N/A'}
                        </div>
                        <div id="copy-button" class="w-auto h-auto self-center text flex flex-col bg-slate-300 p-1 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 self-center">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>                      
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}

    {#if !imageSelected}
        <h1>No Image Selected</h1>
    {/if}
</div>
