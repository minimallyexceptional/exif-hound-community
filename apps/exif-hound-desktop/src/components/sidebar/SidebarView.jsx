import React, { useEffect, useState } from 'react';
import { useApplicationState } from '../../context/ApplicationState';
import { FaInfoCircle, FaImages, FaTrash } from 'react-icons/fa';
import { observer } from 'mobx-react';


import './SidebarView.css';
import EXIFHound from '../../core/exifHound';


const SidebarView = (props) => {

    let inputRef = React.createRef();
    let store = useApplicationState();
    
    const hound = new EXIFHound(store);

    useEffect(() => {
    }, [store.images.length])

    const clickImage = () => {
        inputRef.current.click();
    }

    const loadImage = (e) => {
        hound.loadMultipleImages(e);
    }

    const setSelectedImage = (imageObject) => {
        store.setSelectedImage(imageObject);
    }

    const navigateToSelectedImage = (imageObject) => {
        store.setSelectedImage(imageObject);
        store.setCurrentPage(2);
    }

    const navigateToImageComparison = (imageObject) => {
        alert('Thumbnail Comparison Feature Coming Soon!');
    }

    const removeImage = (imageObject) => {
        let imageIndex = store.images.indexOf(imageObject);
        store.images.splice(imageIndex, 1);
    } 

    const renderSidebarItems = (imageArray) => {
        return imageArray.map((image, index) => {
            return (
                <div
                    className="sidebar-item"
                    key={`${image.DateTimeOriginal}-${index}-key`}
                >
                    <div 
                        className="image-thumbnail" 
                        onDoubleClick={() => navigateToSelectedImage(image)}
                        onClick={() => setSelectedImage(image)}
                    >
                        <img src={image.ImageData} alt="" />
                    </div>

                    <div className="image-data">
                        <div className="image-datapoint">
                            <span className="image-detail">Time</span> 
                            <span className="image-value">{image.DateTimeOriginal || 'N/A'}</span>
                        </div>

                        <div className="image-datapoint">
                            <span className="image-detail">Latitude</span> 
                            <span className="image-value">{image.GPSLatitude || 'N/A'}</span>
                        </div>

                        <div className="image-datapoint">
                            <span className="image-detail">Longitude</span> 
                            <span className="image-value">{image.GPSLongitude || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="image-toolbar">
                        <button 
                            className="image-toolbar-button"
                            onClick={() => navigateToSelectedImage(image)}
                        >
                            <FaInfoCircle />
                        </button>
                        <button 
                            className="image-toolbar-button"
                            onClick={() => navigateToImageComparison(image)}
                        >
                            <FaImages />
                        </button>
                        <button 
                            className="image-toolbar-button"
                            onClick={() => removeImage(image)}
                        >
                            <FaTrash />
                        </button>
                    </div>

                </div>
            )
        })
    }

    return (
        <div id="sidebar" className='min-w-[500px]'>
            <div className="sidebar-button-bar">
                <input ref={inputRef} type="file" onChange={loadImage} style={{ display: 'none' }} multiple />
                <button className={'sidebar-button'} onClick={clickImage}>Add Images</button>
            </div>
            <div className="sidebar-content">
                {renderSidebarItems(store.images)}
            </div>
        </div>
    )
}

export default observer(SidebarView);