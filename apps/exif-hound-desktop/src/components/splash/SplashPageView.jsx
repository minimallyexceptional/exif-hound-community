import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useApplicationState } from '../../context/ApplicationState';

import './SplashPageView.css';

const SplashPageView  = (props) => {
    const currentPage = useApplicationState().currentPage;

    if (currentPage === 0) {
        return (
            <div id="splash-page">
                <div id="logo" />
                <div id="background" />
            </div>
        )
    }

    return <h1>POO</h1>;
}

export default observer(SplashPageView);