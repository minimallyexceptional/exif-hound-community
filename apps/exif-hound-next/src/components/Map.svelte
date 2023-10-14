<html lang="html">
    <div id="map" class="h-[73vh] w-[70vw]">
    </div>
</html>

<script>
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import { onMount } from 'svelte';
    import { addImageMarker, addMarker, flyTo } from '../lib/map-utils';
    import { images } from '../lib/images';
    import { selected } from '../lib/selected';

    var map;

    onMount(() => {
        map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        }).addTo(map);
    });

    images.subscribe((images) => {
        images.map(image => {
            const popupImage = image.file.exifData.ImageData;
            const lat = image.file.exifData.GPSLatitude;
            const lon = image.file.exifData.GPSLongitude;

            console.log('GOT LAT LNG ', lat, lon, image.file.exifData);

            if (lat && lon) {
                addImageMarker(map, lat, lon, popupImage);
                flyTo(map, lat, lon);
            } else {
                return;
            }
        });
    })

    selected.subscribe((selected) => {
        console.log('SELECTION DETECTED ', selected);

        if (selected) {
            if (selected.file.exifData.GPSLatitude && selected.file.exifData.GPSLongitude) {
                const lat = selected.file.exifData.GPSLatitude;
                const lon = selected.file.exifData.GPSLongitude;

                flyTo(map, lat, lon);
            }
        } else {
            return;
        }

    })


</script>