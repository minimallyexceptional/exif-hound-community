<style lang='postcss'>
    #map {
      display: block;
      min-width: 20px;
      min-height: 20px;
      width: 100%;
      height: 100vh;
    }
</style>

<script lang="ts">
    import L from 'leaflet';
    import "leaflet/dist/leaflet.css";
    import { onMount } from 'svelte';
    import icon from 'leaflet/dist/images/marker-icon.png';
    import iconShadow from 'leaflet/dist/images/marker-shadow.png';
    
    onMount(() => {
        var map = L.map('map').setView([51.505, -0.09], 3);
        const apikey = "3f9dddfb-f9f6-4bb0-97c8-695d7af039d8"

        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });

        L.Marker.prototype.options.icon = DefaultIcon;

        L.tileLayer(`https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png`, {
            attribution: `
                &copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>
                &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a>
                &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>
                &copy; <a href="https://www.openstreetmap.org/about/" target="_blank">OpenStreetMap contributors</a>
            `,
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup();
    })

</script>


<main>
    <div id="map"></div>
</main>