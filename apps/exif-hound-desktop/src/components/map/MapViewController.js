import L from 'leaflet';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

//Get leaflet icons for built application 
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

export default class MapViewController {
    constructor() {
        this.map = null;
        this.mapLayers = [];
    }

    addTileLayer(urlString, options) {
        return L.tileLayer(urlString, options).addTo(this.map);
    }

    initializeMap(mapId, initialLat, initialLon, zoomLevel) {
        this.removeMap();
        this.map = L.map(mapId);

        this.addTileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        });

        this.setView(initialLat, initialLon, zoomLevel);
    }

    removeMap() {
        if (this.map) {
          this.map.remove();
          this.map = null;
        }
    }

    setView(lat, lon, zoomLevel) {
        return this.map.setView([lat, lon], zoomLevel);
    }

    addMarkerToMap(lat, lon, setView, zoomLevel) {
        let marker = L.marker([lat, lon]);

        if (setView) {
            this.setView(lat, lon, zoomLevel)
        }

        return this.map.addLayer(marker);
    }

    removeMarkers() {
        this.map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
          }
        });
    }

    addMarkerWithPopupToMap(lat, lon, popupString, openPopup, setView, zoomLevel) {        
        let marker = L.marker([lat, lon]);
        
        if (setView) {
            this.setView(lat, lon, zoomLevel)
        }

        this.map.addLayer(marker)

        if (openPopup) {
            marker.bindPopup(popupString).openPopup()
        } else {
            marker.bindPopup(popupString)
        }

        return marker;
    }

    reinitializeMap() {

        this.map.eachLayer((layer) => {
            this.map.removeLayer(layer);
        });

        this.addTileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        });
    }

}