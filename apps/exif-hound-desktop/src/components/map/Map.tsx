import { createResource, onCleanup, onMount } from 'solid-js';
import { createSignal } from 'solid-js';
import "leaflet/dist/leaflet.css";

import Subnav from './Subnav';
import ExifPanel from './ExifPanel';
import ExifImage from '~/interfaces/ExifImage';

interface Props {
    mapEntitys: ExifImage[]
}

export default function Map(props: Props) {
    const [mapResource, { mutate }] = createResource<any>(() => { });
    const [isClient, setIsClient] = createSignal(false);

    onMount(() => {
        setIsClient(true);

        if (!isClient()) {
            return;
        }

        setTimeout(() => {
            import('leaflet').then((L) => {
                mutate(async () => {
                    const map = L.map('map').setView([39.7589, -84.1916], 13);

                    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                        maxZoom: 20,
                        minZoom: 3
                    }).addTo(map);

                    map.setZoom(11);

                    props.mapEntitys.forEach((entity) => {
                        const marker = L.marker([entity.exifData.latitude, entity.exifData.longitude]);

                        marker.bindPopup(`
                            <div class="flex flex-col gap-y-2 w-44">
                                <img src="${entity.path}" />
                            </div>
                        `).openPopup();

                        marker.addTo(map);
                    });

                    onCleanup(() => {
                        map.remove();
                    });

                    return map;
                });
            });
        }, 0);
    });

    const map = mapResource()?.read();

    return (
        <div id="map-container" class="flex h-full w-full">
            <Subnav />
            <div id="map" class="w-full h-full" ref={(el) => el && map && map.invalidateSize()} />
            <ExifPanel />
        </div>
    );
}