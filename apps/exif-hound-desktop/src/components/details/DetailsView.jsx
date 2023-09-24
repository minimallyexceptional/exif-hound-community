import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';

import './DetailsView.css';

import DetailsViewController from './DetailsViewController';

const DetailsView = (props) => {
    const controller = new DetailsViewController();

    const detailValueRef = React.createRef();

    toast.configure({ 
        autoClose: 80,
        draggable: false,
    });

    const clickBack = () => {
        props.store.setCurrentPage(1);
        props.store.setSelectedImage(null);
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
                <div
                    className={'details-group'}
                >
                    <div className="details-header-wrap">
                        <h1 className="details-header">{group[0]}</h1>
                    </div>
                    <div className="details-group-content">
                        {group[1].map(item => {
                            if (item !== undefined && item !== null) {
                                return (
                                    <p>
                                        <span className="details-group-detail">{`${item[0]}`}</span>
                                        <span ref={detailValueRef} className="details-group-value">{`${item[1] || 'N/A'}`}</span>{renderCopyIcon(item[0], item[1])}
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
                <div className={'details-group'}>
                    <div className="details-header-wrap">
                        <h1 className="details-header">Thumbnail</h1>
                    </div>
                    <div className="details-group-content">
                        <img className="details-thumbnail" src={sourceImage} />
                    </div>
                </div>
            )
        }
    }

    return (
        <div id="details-panel">
            <div className="details-button-bar">
                <button className={'details-button'} onClick={clickBack}>Back</button>
            </div>
            <div className="details-content">
                {renderThumbnail(props.store.selectedImage.ThumbnailData)}
                {renderDetailItems(controller.formatDetailsArray(props.store.selectedImage))}
            </div>
        </div>
    )
}

export default observer(DetailsView);