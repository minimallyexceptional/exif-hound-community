<script lang="ts">
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import createStore from "../state";

    import { onMount } from "svelte";
    import { addImageMarker, addMarker, flyTo, resizeMap } from "../lib/map-utils";
    import type { MapImage } from "../types";

    let map;
    let tileLayer;
    let isExifOpen;

    const Store = createStore();

    onMount(() => {
        map = L.map("map").setView([51.505, -0.09], 13);

        tileLayer = L.tileLayer(
            "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                ext: "png",
            }
        );
        
        tileLayer.addTo(map);

        Store.subscribe((store) => {
            isExifOpen = store.exifPanelOpen;

            store.mapImages.map((image: MapImage) => {
                const popupImage = image.imagePopup;
                const lat = image.lat;
                const lon = image.long;
                
                if (lat && lon) {
                    console.log('ReDRAWING ', tileLayer)
                    addImageMarker(map, lat, lon, popupImage);
                    flyTo(map, lat, lon);
                    // tileLayer.redraw(tileLayer);
                }
            });

            const selectedImage = store.selectedImage;
    	
            if (selectedImage) {
                // resizeMap(map);
                if (selectedImage.position.lat && selectedImage.position.long) {
                    flyTo(map, store.selectedImage.position.lat, store.selectedImage.position.long);
                }
            }
        });
    });
    
</script>


<div id="map" class={`h-[73vh] ${isExifOpen ? 'w-[78vw]' : 'w-[100vw]'}`} />
