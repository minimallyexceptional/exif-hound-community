
import { writable } from "svelte/store";
import type { Store, ExifImage, MapImage } from "./types.ts";
import { removeFromArray } from "./lib/utils";

const Store: Store = {
    currentPage: "MAP",
    selectedImage: null,
    exifImages: [],
    mapImages: [],
    imagePanelOpen: false,
    exifPanelOpen: false,
    toolbarOpen: true,
    filePickerOpen: false
};

const { subscribe, set, update } = writable(Store);

export default function createStore() {
    return {
        subscribe,
        changePage: (page: "MAP" | "DATA" | "LAB") => update((oldState: any) => {
            return Object.assign(oldState, { currentPage: page });
        }),
        selectImage: (image: ExifImage) => update((oldState: any) => {
            return Object.assign(oldState, { selectedImage: image });;
        }),
        deSelectImage: () => update((oldState: any) => {
            return Object.assign(oldState, { selectedImage: null });;
        }),
        toggleImageSelector: () => update((oldState: any) => {
            return Object.assign(oldState, { imageSelectorOpen: !oldState.imageSelectorOpen });
        }),
        toggleExifPanel: () => update((oldState: any) => {
            return Object.assign(oldState, { exifPanel: !oldState.exifPanel });
        }),
        toggleToolbar: () => update((oldState: any) => {
            return Object.assign(oldState, { toolbarOpen: !oldState.toolbarOpen });
        }),
        toggleFilePickerStatus: () => update((oldState: any) => {
            return Object.assign(oldState, { filePickerOpen: !oldState.filePickerOpen });
        }),
        loadExifImage: (image: ExifImage) => update((oldState: any) => {
            return Object.assign(oldState, { exifImages: [image, ...oldState.exifImages] });
        }),
        loadMutipleExifImages: (images: ExifImage[]) => update((oldState: any) => {
            return Object.assign(oldState, { exifImages: [...images, ...oldState.exifImages] });
        }),
        removeExifImage: (image: ExifImage) => update((oldState: any) => {
            let newArray = removeFromArray(image, oldState.exifImages);
            return Object.assign(oldState, { exifImages: newArray });
        }),
        clearExifImages: () => update((oldState: any) => {
            return Object.assign(oldState, { exifImages: [] });
        }),
        loadMapImage: (image: MapImage ) => update((oldState: any) => {
            return Object.assign(oldState, { mapImages: [image, ...oldState.mapImages] });
        }),
        loadMutipleMapImages: (images: MapImage[]) => update((oldState: any) => {
            return Object.assign(oldState, { mapImages: [...images, ...oldState.mapImages] });
        }),
        removeMapImage: (image: MapImage) => update((oldState: any) => {
            let newArray = removeFromArray(image, oldState.mapData);
            return Object.assign(oldState, { mapImages: newArray });
        }),
        clearMapImages: () => update((oldState: any) => {
            return Object.assign(oldState, { mapImages: [] });
        }),
    }

}
