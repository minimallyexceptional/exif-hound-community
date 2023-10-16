<script>
    import ExifDetails from "../components/ExifDetails.svelte";
    import ImageList from "../components/ImageList.svelte";
    import Map from "../components/Map.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Toolbar from "../components/Toolbar.svelte";
    import createStore from '../state';

    const Store = createStore();

    let isToolbarOpen;
    let isExifOpen;
    let isImagePanelOpen;

    Store.subscribe((store) => {
        console.log('EXIF PANEL CANGEED ', store);
        isToolbarOpen = store.toolbarOpen
        isExifOpen = store.exifPanelOpen
        isImagePanelOpen = store.imagePanelOpen
    })
    
</script>

<main id="container" class="flex w-full h-full">
    <div class="h-auto">
        <Sidebar />
    </div>

    <div id="content-section" class="h-full w-full">
        <div
            id="toolbar-section"
            class="flex flex-col justify-center center h-auto w-full bg-pink-600"
        >
            {#if isToolbarOpen}
                <Toolbar />
            {/if}
        </div>

        <div id="map-section" class="h-auto w-full flex flex-row">
            <Map />
        </div>

        <div id="image-list-section" class="h-50">
            <ImageList />
        </div>
    </div>

    {#if isExifOpen}
        <div id="exif-details-section w-full">
            <ExifDetails />
        </div>
    {/if}

</main>
