import { observer } from "mobx-react";

const Thumbnail = ({ sourceImage }) => { 
    if (sourceImage) {
        return (
            <div className={'details-group flex flex-col mt-10 mb-4'}>
                <div className="details-header-wrap">
                    <h1 className="details-header text-white font-bold mb-2">Thumbnail</h1>
                </div>
                <div className="details-group-content">
                    <img className="details-thumbnail h-[150px]" src={sourceImage} />
                </div>
            </div>
        )
    }

    return null;
}
 
export default  observer(Thumbnail);