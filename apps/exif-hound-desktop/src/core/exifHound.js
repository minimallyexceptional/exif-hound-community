import loadImage from 'blueimp-load-image';

import EXIFImageFactory from './factories/exifImageFactory';
import EXIF from 'exif-js';

export default class EXIFHound {
    constructor(store) {
        this.ImageElement = null;
        this.exifData = null;

        this.imageFactory = new EXIFImageFactory();
        this.store = store;

        this.loadImage = this.loadImage.bind(this);
    }

    loadImage(event, callback) {
        let loadingImage = loadImage(
            event.target.files[0],
            (img, data) => {
                this.ImageElement = img;
                this.exifData = data.exif;
                
                if (data.exif) {
                    EXIF.getData(img, function() {
                        let newDataObject = EXIF.getAllTags(this);
                        callback(img, newDataObject);
                    });
                } else {
                    alert('Image Does Not Contain EXIF data');
                }
            },
            { meta: true, noRevoke: true } // Options
        );

        if (loadingImage) {
            return;
        } else {
            throw new Error('Please upload a proper image file!');
        }

    }

    loadMultipleImages(event) {

        var uploadedImages = [];

        for (let i = 0; i < event.target.files.length; i++) {
            let loadingImage = loadImage(
                event.target.files[i],
                (img, data) => {
                    this.ImageElement = img;
                    this.exifData = data.exif;
                    
                    if (data.exif) {
                        EXIF.getData(img, function() {
                            let imageFactory = new EXIFImageFactory();
                            
                            let newDataObject = EXIF.getAllTags(img);
                           
                            let exifImage = imageFactory.createImage(img, newDataObject);
                            
                            this.store.addImage(exifImage);
                        }.bind(this));
                    } else {
                        alert('Image Does Not Contain EXIF data');
                    }
                },
                { meta: true, noRevoke: true } // Options
            );
    
            if (!loadingImage) {
                throw new Error('Please upload a proper image file!');
            }
        }
    }
}