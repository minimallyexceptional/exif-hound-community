import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import MapViewController from './MapViewController';
import { useApplicationState } from '../../context/ApplicationState';

const controller = new MapViewController();

const MapView = (props) => {
  const [noData, setNoData] = useState(false);
  const mapRef = useRef(null);
  const store = useApplicationState();

  useEffect(() => {
    const { initalMarker } = props;
    if (initalMarker[0] && initalMarker[1]) {
      controller.initalizeMap('map', ...initalMarker, 12);
    }
  
    // Add a cleanup function to remove the map when the component unmounts
    return () => {
      controller.removeMap();
    };
  }, [props.initalMarker]);

  useEffect(() => {
    const { multiMarker, currentMarker } = props;
    controller.reInitalizeMap();

    if (multiMarker) {
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
    } else if (currentMarker[0] && currentMarker[1]) {
      controller.addMarkerToMap(...currentMarker, true, 16);
    }
  }, [props.multiMarker, props.currentMarker, store.images]);

  useEffect(() => {
    const selectedImage = store.selectedImage;

    if (selectedImage && selectedImage.GPSLatitude && selectedImage.GPSLongitude) {
      setNoData(false);
      controller.setView(selectedImage.GPSLatitude, selectedImage.GPSLongitude, 16);
    }

    if (selectedImage && selectedImage.GPSLatitude && selectedImage.GPSLongitude && !props.multiMarker) {
      setNoData(false);
      controller.reInitalizeMap();
      controller.addMarkerToMap(selectedImage.GPSLatitude, selectedImage.GPSLongitude, true, 16);
    } else if (selectedImage && !selectedImage.GPSLatitude && !selectedImage.GPSLongitude && !props.multiMarker) {
      setNoData(true);
      controller.reInitalizeMap();
    }
  }, [store.selectedImage, props.multiMarker]);

  useEffect(() => {
    if (noData === true) {
      mapRef.current.style.opacity = 0.2;
      mapRef.current.style.pointerEvents = 'none';
    } else {
      mapRef.current.style.opacity = 1;
      mapRef.current.style.pointerEvents = 'auto';
    }
  }, [noData]);

  return <div ref={mapRef} id="map" className='w-full min-h-screen'></div>;
};

export default observer(MapView);