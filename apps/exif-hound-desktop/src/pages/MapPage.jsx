import React from 'react';
import { observer } from 'mobx-react';

import MapView from '../components/map/MapView'
import SidebarView from '../components/sidebar/SidebarView';

const MapPage = (props) => {
    return (
        <div className='flex full-w full-h'>
            <div className="sidebar-container">
                <SidebarView store={props.store} />
            </div>
            <div className="map-container w-full h-full bg-slate-600">
                <MapView store={props.store} popup={true} initalMarker={[39.7589, -84.1916]} multiMarker/>
            </div>
        </div>
    );
}

export default observer(MapPage);