import React from 'react';
import { observer } from 'mobx-react';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { useApplicationState } from '../context/ApplicationState';

import MapView from '../components/map/MapView'
import DetailsView from '../components/details/DetailsView';
import ImageViewer from '../components/imageViewer/ImageViewer';

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
        <React.Fragment>
            <div className="exif-details-container">
                <DetailsView store={store}/>
            </div>
            <div className="side-split-container">
                <div className="side-split-section-image">
                    {renderSelectedImage(store.selectedImage)}
                </div>
                <div className="side-split-section-navigation">
                    <div className="navigation-button-section">
                        <button 
                            className="navigation-button"
                            onClick={() => navigateToPreviousImage(store)}
                        >
                            <FaChevronCircleLeft/>
                        </button>
                        <span className="navigation-progress">
                            {`${store.images.indexOf(store.selectedImage)}/${store.images.length}`}
                        </span>
                        <button 
                            className="navigation-button"
                            onClick={() => navigateToNextImage()}
                        >
                            <FaChevronCircleRight/>
                        </button>
                    </div>
                </div>
                <div className="side-split-section-map">
                    {renderMapView(store.selectedImage)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default observer(DetailPage);