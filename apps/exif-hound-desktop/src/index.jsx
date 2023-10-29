import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'leaflet-css';

import App from './app';
import { ApplicationStateProvider } from './context/ApplicationState';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
        <ApplicationStateProvider>
            <App />
        </ApplicationStateProvider>
    </React.StrictMode>,
    rootElement
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ApplicationStateProvider>
            <App />
        </ApplicationStateProvider>
    </React.StrictMode>
  );
}