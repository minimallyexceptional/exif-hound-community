import React from 'react';
import { observer } from 'mobx-react';

import MapView from '../components/map/MapView'
import SidebarView from '../components/sidebar/SidebarView';
import ImageTray from '../components/imageTray/ImageTray';
const MapPage = (props) => {
    return (
        <div className='flex min-w-full max-h-full'>
            <div className="sidebar-container h-screen flex">
                <SidebarView />
                <ImageTray />
            </div>
            <div className="map-container">
                <MapView popup={true} initalMarker={[39.7589, -84.1916]} multiMarker/>
            </div>
        </div>
    );
}

export default observer(MapPage);