<script>
    import ExifDetails from "../components/ExifDetails.svelte";
    import ImageList from "../components/ImageList.svelte";
    import Map from "../components/Map.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Toolbar from "../components/Toolbar.svelte";
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
            <Toolbar />
        </div>

        <div id="map-section" class="h-auto w-full flex flex-row">
            <Map />
            <ExifDetails />
        </div>

        <div id="image-list-section" class="h-50">
            <ImageList />
        </div>
    </div>
</main>
