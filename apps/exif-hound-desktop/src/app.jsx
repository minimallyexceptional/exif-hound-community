import React, { useEffect, useState } from 'react';
import { useApplicationState } from './context/ApplicationState';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react';

import './app.css';

import SplashPage from './pages/SplashPage';
import MapPage from './pages/MapPage';

const App = (props) => {
    const appStore = useApplicationState();

    useEffect(() => {
        setTimeout(() => {
            appStore.setCurrentPage(1);
        }, 1000);
    }, []);

    const routePages = (pageENUM) => {
        switch(pageENUM) {
            case 0: 
                return <SplashPage />
            case 1:
                return <MapPage />
        }
    }

    return (
        <div>
            <ToastContainer />
            {routePages(appStore.currentPage)}
        </div>
    );
}

export default observer(App);