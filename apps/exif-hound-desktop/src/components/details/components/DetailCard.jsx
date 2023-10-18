import { FaCopy } from 'react-icons/fa';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

const renderCopyIcon = (currentItem, currentValue) => {
    return (
        <FaCopy className={'details-group-value-copy-button'} onClick={() => clickCopy(currentItem, currentValue)} />
    )
}

const clickCopy = (currentValue) => {
    navigator.clipboard.writeText(currentValue);
    
    toast(`${currentValue} copied to clipboard`, {
        className: 'exif-hound-toast',
        bodyClassName: "exif-hound-toast-body",
        progressClassName: 'exif-hound-toast-progress-bar'
    });
}

const DetailsCard = ({ detailArray, detailValueRef }) => {
    return detailArray.map(group => {
        return (
            <div className={'details-group m-4 w-[350px] h-[100%] card-dark'} key={`${group[1]}`}>

                <div className="details-header-wrap">
                    <h1 className="details-header text-white tracking-wide font-bold mb-2">{group[0]}</h1>
                </div>

                <div className="details-group-content flex flex-col">
                    {group[1].map(item => {
                        if (item !== undefined && item !== null) {
                            return (
                                <p className='flex mb-0.5' key={`${Math.random()}-${item[0]}`}>
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
    });
}
 

export default observer(DetailsCard);