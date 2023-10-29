import React from 'react';
import { useApplicationState } from '../../context/ApplicationState';
import { observer } from 'mobx-react';
import DetailsViewController from './controllers/DetailsViewController';
import DetailsCard from './components/DetailCard';
import Thumbnail from './components/Thumbnail';


const DetailsView = () => {
    const controller = new DetailsViewController();

    const detailValueRef = React.createRef();
    const store = useApplicationState();
    const detailArray = controller.formatDetailsArray(store.selectedImage, detailValueRef);

    const clickBack = () => {
        store.setCurrentPage(1);
        store.setSelectedImage(null);
    }

    return (
        <div id="details-panel" className='h-full w-full bg-black text-white p-10'>
            <div className="details-button-bar">
                <button className={'details-button btn'} onClick={clickBack}>Back</button>
            </div>
            <div className="details-content flex flex-wrap h-auto overflow-scroll">
                <Thumbnail sourceImage={store.selectedImage.ImageData} />
                <DetailsCard detailArray={detailArray} detailValueRef={detailValueRef} />
            </div>
        </div>
    )
}

export default observer(DetailsView);