import React from 'react';
import { observer } from 'mobx-react';

import MapView from '../components/map/MapView'
import SidebarView from '../components/sidebar/SidebarView';

const MapPage = (props) => {
    return (
        <div className='flex min-w-full max-h-full'>
            <div className="sidebar-container h-screen">
                <SidebarView />
            </div>
            <div className="map-container w-screen h-screen bg-slate-600">
                <MapView popup={true} initalMarker={[39.7589, -84.1916]} multiMarker/>
            </div>
        </div>
    );
}

export default observer(MapPage);