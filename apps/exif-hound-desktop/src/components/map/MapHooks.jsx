import { useEffect, useState } from "react";

import L from 'leaflet';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// export function useMapWaypoints(imageList = []) {
    
//     const [waypoints, setWaypoints] = useState([]);
//     let images = [];

//     imageList.map(image => {
//         if (image.GPSLatitude && image.GPSLongitude) {
//             images.push({
//                 lat: image.GPSLatitude,
//                 lng: image.GPSLongitude,
//                 image: image.ImageData
//             });
//         }
//     });

//     useEffect(() => {{
//         setWaypoints(images);
//     }}, [images]);
  
//     return waypoints;
// }

// export function useLeafletMap(mapRef) {
//     const [map, setMap] = useState(null);

//     useEffect(() => {
//         setMap(L.map(mapRef.current));

//         map.addTileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
//             attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//             subdomains: 'abcd',
//             minZoom: 0,
//             maxZoom: 20,
//             ext: 'png'
//         });
    
//     }, []);


//     return map;
// }