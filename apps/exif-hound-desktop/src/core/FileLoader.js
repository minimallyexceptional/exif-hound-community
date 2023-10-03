import  ExifHound from 'exif-hound-core';

export default class FileLoader {
    constructor(store) {
        this._fileReader = new FileReader();
        this.ImageElement = null;
        this.exifData = null;
        this.hound = new ExifHound();
        this.store = store;
    }

    async load(file) {
        try {
            return new Promise((resolve, reject) => {
                this._fileReader.onload = (event) => {
                    resolve(event.target.result);
                };
                this._fileReader.onerror = (event) => {
                    reject(event);
                };
                this._fileReader.readAsArrayBuffer(file);
            });
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async loadMultipleImages(files) {
        try {
            if (files.length > 1) {
                return Promise.all(files.map(file => this.load(file)));
            } else {
                return this.load(files[0])
                .then((imageBuffer) => {
                    return this.loadImage(imageBuffer);
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async loadImage(imageBuffer) {
        try {
            // Parse EXIF data from the image with ExifHound
            const exifData = await this.hound.parseExifData(imageBuffer);
        
            // Handle EXIF data or perform any other processing here
            // For example, you can access properties like exifData.GPSLatitude, exifData.GPSLongitude, etc.
            this.store.addImage(exifData);

            // Return the image buffer or exif data as needed
            return { imageBuffer, exifData };
        
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }
    
}