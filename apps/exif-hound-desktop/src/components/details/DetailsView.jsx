import React from 'react';
import { useApplicationState } from '../../context/ApplicationState';
import { FaCopy } from 'react-icons/fa';
import { observer } from 'mobx-react';

// import './DetailsView.css';

import DetailsViewController from './DetailsViewController';

const DetailsView = () => {
    const controller = new DetailsViewController();

    const detailValueRef = React.createRef();
    const store = useApplicationState();

    const clickBack = () => {
        store.setCurrentPage(1);
        store.setSelectedImage(null);
    }

    const clickCopy = (currentValue) => {
        navigator.clipboard.writeText(currentValue);
        toast(`${currentValue} copied to clipboard`, {
            className: 'exif-hound-toast',
            bodyClassName: "exif-hound-toast-body",
            progressClassName: 'exif-hound-toast-progress-bar'
        });
    }
    
    const renderCopyIcon = (currentItem, currentValue) => {
        return (
            <FaCopy className={'details-group-value-copy-button'}  onClick={() => clickCopy(currentItem, currentValue)}/>
        )
    }

    const renderDetailItems = (detailsArray) => {
        return detailsArray.map(group => {
            return (
                <div className={'details-group w-full h-auto card-dark'}>
                    
                    <div className="details-header-wrap">
                        <h1 className="details-header text-white tracking-wide font-bold mb-2">{group[0]}</h1>
                    </div>

                    <div className="details-group-content flex flex-col">
                        {group[1].map(item => {
                            if (item !== undefined && item !== null) {
                                return (
                                    <p className='flex mb-0.5'>
                                        <span className="details-group-detail text-white font-medium mr-4">{`${item[0]}`}</span>
                                        <span ref={detailValueRef} className="details-group-value mr-4 font-light"> 
                                            {`${item[1] || 'N/A'}`}
                                        </span>
                                        {renderCopyIcon(item[0], item[1])}
                                    </p>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )
        })
    }

    const renderThumbnail = (sourceImage) => {
        if (sourceImage) {
            return (
                <div className={'details-group flex flex-col mb-4'}>
                    <div className="details-header-wrap">
                        <h1 className="details-header text-white font-bold mb-2">Thumbnail</h1>
                    </div>
                    <div className="details-group-content">
                        <img className="details-thumbnail h-[150px]" src={sourceImage} />
                    </div>
                </div>
            )
        }
    }

    return (
        <div id="details-panel" className='h-full w-full bg-black text-white p-10'>
            <div className="details-button-bar">
                <button className={'details-button btn'} onClick={clickBack}>Back</button>
            </div>
            <div className="details-content h-[100vh] overflow-scroll">
                {renderThumbnail(store.selectedImage.ImageData)}
                {renderDetailItems(controller.formatDetailsArray(store.selectedImage))}
            </div>
        </div>
    )
}

export default observer(DetailsView);