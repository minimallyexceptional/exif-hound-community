import React, { useEffect, useState, useRef, useMemo } from 'react';

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap, useMapEvents } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'

import { observer } from 'mobx-react';

import MapViewController from './MapViewController';
import { useApplicationState } from '../../context/ApplicationState';

const controller = new MapViewController();

const MapView = (props) => {
  const store = useApplicationState();
  const [center, setCenter] = useState([39.7589, -84.1916]);

  useEffect(() => {
    if (store.images.length > 0 && store.selectedImage) {
      setCenter([store.selectedImage.GPSLatitude, store.selectedImage.GPSLongitude]);
    }
  }, [store.selectedImage, store.images]);

  function LocationMarker({ position, image }) {
    console.log('position', position);
    console.log('image', image);
    const store = useApplicationState();

    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
      waypointadded(e) {
        console.log('waypoint added', e);
      },
      onload() {
        console.log('map loaded');
      }
    })

    const markerEvents = useMemo(() => ({
      click() {
        map.setView(position, map.getZoom());
      },
      onLoad() {
        console.log('marker loaded');
        this.dispatchEvent('waypointadded');
      },
      waypointadded() {
        map.setView(position, map.getZoom());
      }
    }), []);
  
    return (
      <Marker position={position}  eventHandlers={markerEvents} onMount={() => console.log('waypoint added')}>
        <Popup>
          <img className='w-[250px] max-w-full p-2' src={image.ImageData} />
        </Popup>
      </Marker>
    )
  }
  

  return (
    <MapContainer className='w-screen h-screen' center={center} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}'
        ext='png'
        minZoom={0}
        maxZoom={20}
      />

      {store.images.map((waypoint) => {
        console.log('waypoint', waypoint);
        if (waypoint && waypoint.GPSLatitude && waypoint.GPSLongitude) {
          return (
            <LocationMarker position={[waypoint.GPSLatitude, waypoint.GPSLongitude]} image={waypoint} />
          )
        } else {
          return null;
        }
      })};

    </MapContainer>
  )
}

export default observer(MapView);
