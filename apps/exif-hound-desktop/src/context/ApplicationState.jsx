import React, { createContext, useContext } from 'react';
import { makeObservable, action, observable } from 'mobx';

// Create the ApplicationState class
class ApplicationState {
  constructor() {
    makeObservable(this, {
      // Observables
      currentPage: observable,
      selectedImage: observable,
      images: observable,

      // Actions
      addImage: action,
      setCurrentPage: action,
      setSelectedImage: action,
    });
  }

  currentPage = 0;
  setCurrentPage = (pageENUM) => {
    this.currentPage = pageENUM;
  };

  selectedImage = null;
  setSelectedImage = (imageObject) => {
    this.selectedImage = imageObject;
  };

  images = [];
  addImage = (imageObject) => {
    this.images.push(imageObject);
  };
}

// Create a context for the store
const ApplicationStateContext = createContext();

// Create a provider component for the store
export function ApplicationStateProvider({ children }) {
  const store = new ApplicationState();

  return (
    <ApplicationStateContext.Provider value={store}>
      {children}
    </ApplicationStateContext.Provider>
  );
}

// Create a custom hook to access the store
export function useApplicationState() {
  return useContext(ApplicationStateContext);
}