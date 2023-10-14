<script lang="ts">
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import createStore from "../state";

    import { onMount } from "svelte";
    import { addImageMarker, addMarker, flyTo } from "../lib/map-utils";
    import type { MapImage } from "../types";

    let map;

    const Store = createStore();

    onMount(() => {
        map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer(
            "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                ext: "png",
            }
        ).addTo(map);
    });

    Store.subscribe((store) => {
        store.mapImages.map((image: MapImage) => {
            const popupImage = image.imagePopup;
            const lat = image.lat;
            const lon = image.long;
            
            if (lat && lon) {
                addImageMarker(map, lat, lon, popupImage);
                flyTo(map, lat, lon);
            } else {
                return;
            }
        });
    });

    Store.subscribe((store) => {
        if (store.selectedImage) {
            if (
                store.selectedImage.position.lat &&
                store.selectedImage.position.long
            ) {
                flyTo(
                    map,
                    store.selectedImage.position.lat,
                    store.selectedImage.position.long
                );
            }
        } else {
            return;
        }
    });
</script>

<html lang="html">
    <div id="map" class="h-[73vh] w-[70vw]" />
</html>
