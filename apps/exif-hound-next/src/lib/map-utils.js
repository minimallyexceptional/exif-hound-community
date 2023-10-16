import L from 'leaflet';

export function addMarker(map, lat, lon, popup) {
    return L.marker([lat, lon]).addTo(map)
    .bindPopup(popup)
    .openPopup();
}

export function addImageMarker(map, lat, lon, popup) {
    return L.marker([lat, lon]).addTo(map)
    .bindPopup(`<img class="min-w-[200px]" src=${popup} />`)
    .openPopup();
}

export function flyTo(map, lat, lon) {
    map.flyTo([lat, lon], 13);
}

export function resizeMap(tileLayer) {
    tileLayer.redraw();
}