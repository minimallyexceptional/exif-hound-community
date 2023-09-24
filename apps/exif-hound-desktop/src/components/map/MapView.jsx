import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';

import MapViewController from './MapViewController';
import { useApplicationState } from '../../context/ApplicationState';

const controller = new MapViewController();

const MapView = (props) => {
  const [noData, setNoData] = useState(false);
  const mapRef = useRef(null);
  const store = useApplicationState();

  useEffect(() => {
    // Initialize the map if it hasn't been initialized yet
    if (!controller.map && props.initalMarker[0] && props.initalMarker[1]) {
      controller.initializeMap('map', props.initalMarker[0], props.initalMarker[1], 12);
    } else if (controller.map) {
      // Map already initialized, remove any existing markers
      controller.removeMap();
    }
  }, [props.initalMarker]);

  useEffect(() => {
    if (props.multiMarker) {
      // controller.reinitializeMap();
      store.images.forEach((image) => {
        if (image.GPSLatitude && image.GPSLongitude) {
          controller.addMarkerWithPopupToMap(
            image.GPSLatitude,
            image.GPSLongitude,
            `<img class="image-marker-popup" src=${image.ImageData} />`,
            false,
            true,
            16
          );
        }
      });
    } else {
      if (props.currentMarker[0] && props.currentMarker[1]) {
        controller.reinitializeMap();
        controller.addMarkerToMap(
          props.currentMarker[0],
          props.currentMarker[1],
          true,
          16
        );
      } else {
        controller.reinitializeMap();
      }
    }
  }, [store.images.length]);

  useEffect(() => {
    if (store.selectedImage && store.selectedImage.GPSLatitude && store.selectedImage.GPSLongitude) {
      setNoData(false);
      controller.setView(
        store.selectedImage.GPSLatitude,
        store.selectedImage.GPSLongitude,
        16
      );
    }
    if (store.selectedImage && store.selectedImage.GPSLatitude && store.selectedImage.GPSLongitude && !props.multiMarker) {
      setNoData(false);
      controller.reinitializeMap();
      controller.addMarkerToMap(
        store.selectedImage.GPSLatitude,
        store.selectedImage.GPSLongitude,
        true,
        16
      );
    } else if (store.selectedImage && !store.selectedImage.GPSLatitude && !store.selectedImage.GPSLongitude && !props.multiMarker) {
      setNoData(true);
      controller.reinitializeMap();
    }
  }, [store.selectedImage]);

  useEffect(() => {
    if (noData === true) {
      mapRef.current.style.opacity = 0.2;
      mapRef.current.style.pointerEvents = 'none';
    } else {
      mapRef.current.style.opacity = 1;
      mapRef.current.style.pointerEvents = 'auto';
    }
  }, [noData]);

  return <div ref={mapRef} id="map" className='w-full h-full' />;
}

export default observer(MapView);
