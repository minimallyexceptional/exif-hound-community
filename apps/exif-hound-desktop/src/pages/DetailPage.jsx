import React from 'react';
import { observer } from 'mobx-react';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { useApplicationState } from '../context/ApplicationState';

import MapView from '../components/map/MapView'
import DetailsView from '../components/details/DetailsView';

const DetailPage = () => {

    const store = useApplicationState();

    const navigateToNextImage = () => {
        let currentIndex = store.images.indexOf(store.selectedImage);
        let maxIndex = store.images.length;

        if (currentIndex + 1 < maxIndex && maxIndex > 1) {
            store.setSelectedImage(store.images[currentIndex + 1]);
        } else if (currentIndex + 1 === maxIndex) {
            store.setSelectedImage(store.images[0]);
        }
    }

    const navigateToPreviousImage = () => {
        let currentIndex = store.images.indexOf(store.selectedImage);
        let maxIndex = store.images.length;

        if (currentIndex - 1 > -1) {
            store.setSelectedImage(store.images[currentIndex - 1]);
        } else if (currentIndex === 0) {
            store.setSelectedImage(store.images[maxIndex - 1]);
        }
    }

    const renderSelectedImage = (selectedImage) => {
        if (selectedImage) {
            return <ImageViewer selectedImage={store.selectedImage.ImageElement.src} />;
        }
    }

    const renderMapView = (selectedImage) => {
        if (selectedImage) {
            return <MapView 
                popup={false} 
                initalMarker={[39.7589, -84.1916]}
                currentMarker={[store.selectedImage.GPSLatitude, store.selectedImage.GPSLongitude]} 
                multiMarker={false} 
            />
        }
    }

    return (
        <div className='flex h-full w-full'>
            <div className="exif-details-container w-full">
                <DetailsView store={store}/>
            </div>
        </div>
    );
}

export default observer(DetailPage);