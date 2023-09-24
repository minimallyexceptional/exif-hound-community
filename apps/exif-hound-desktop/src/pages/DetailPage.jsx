import React from 'react';
import { observer } from 'mobx-react';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import MapView from '../components/map/MapView'
import DetailsView from '../components/details/DetailsView';
import ImageViewer from '../components/imageViewer/ImageViewer';

const DetailPage = (props) => {

    const navigateToNextImage = (store) => {
        let currentIndex = store.images.indexOf(store.selectedImage);
        let maxIndex = store.images.length;

        if (currentIndex + 1 < maxIndex && maxIndex > 1) {
            store.setSelectedImage(store.images[currentIndex + 1]);
        } else if (currentIndex + 1 === maxIndex) {
            store.setSelectedImage(store.images[0]);
        }
    }

    const navigateToPreviousImage = (store) => {
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
            return <ImageViewer selectedImage={props.store.selectedImage.ImageElement.src} />;
        }
    }

    const renderMapView = (selectedImage) => {
        if (selectedImage) {
            return <MapView 
                store={props.store} 
                popup={false} 
                initalMarker={[39.7589, -84.1916]}
                currentMarker={[props.store.selectedImage.GPSLatitude, props.store.selectedImage.GPSLongitude]} 
                multiMarker={false} 
            />
        }
    }

    return (
        <React.Fragment>
            <div className="exif-details-container">
                <DetailsView store={props.store}/>
            </div>
            <div className="side-split-container">
                <div className="side-split-section-image">
                    {renderSelectedImage(props.store.selectedImage)}
                </div>
                <div className="side-split-section-navigation">
                    <div className="navigation-button-section">
                        <button 
                            className="navigation-button"
                            onClick={() => navigateToPreviousImage(props.store)}
                        >
                            <FaChevronCircleLeft/>
                        </button>
                        <span className="navigation-progress">
                            {`${props.store.images.indexOf(props.store.selectedImage)}/${props.store.images.length}`}
                        </span>
                        <button 
                            className="navigation-button"
                            onClick={() => navigateToNextImage(props.store)}
                        >
                            <FaChevronCircleRight/>
                        </button>
                    </div>
                </div>
                <div className="side-split-section-map">
                    {renderMapView(props.store.selectedImage)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default observer(DetailPage);