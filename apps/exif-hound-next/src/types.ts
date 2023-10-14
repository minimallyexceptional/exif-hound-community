export interface ExifImage {
    id: string | number,
    dateAdded: string,
    name: string,
    imageData: {
        imageBuffer: Buffer,
        exif: any | null,
    },
    position: {
        lat: any | null,
        long: any | null,
    }
}

export interface MapImage {
    id: string,
    lat: string,
    long: string,
    imagePopup: string
}

export interface Store {
    currentPage: "MAP" | "DATA" | "LAB",
    selectedImage: ExifImage | null,
    exifImages: ExifImage[] | [],
    mapImages: MapImage[] | [],
    imagePanelOpen: boolean
    exifPanelOpen: boolean
    toolbarOpen: boolean
    filePickerOpen: boolean
}

