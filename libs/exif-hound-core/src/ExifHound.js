import ExifImageFactory from './factories/exifImageFactory.js';
import exifr from 'exifr';

export default class ExifHound {
    constructor() {
        this.ImageElement = null;
        this.exifData = null;
        this.imageFactory = new ExifImageFactory();
    }

    parseExifData(img) {
        return new Promise((resolve, reject) => {
            exifr.parse(img).then((newDataObject) => {
              this.ImageElement = img;
              this.exifData = newDataObject;
              let exifImage = this.imageFactory.createImage(img, this.exifData);
        
              resolve(exifImage);
            }).catch((error) => {
              reject(error);
            });
        });
    }
}