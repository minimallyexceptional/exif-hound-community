const EXIFImageFactory = require('./factories/exifImageFactory');
const exifr = require('exifr'); 

class ExifHound {
    constructor(store) {
        this.ImageElement = null;
        this.exifData = null;

        this.imageFactory = new EXIFImageFactory();
        this.store = store;

        // this.loadImage = this.loadImage.bind(this);
    }

    // loadImage(event, callback) {
    //     let loadingImage = loadImage(
    //         event.target.files[0],
    //         (img, data) => {
    //             this.ImageElement = img;
    //             this.exifData = data.exif;
                
    //             if (data.exif) {

    //                 exifr.parse(img).then((newDataObject) => {
    //                     callback(img, newDataObject);
    //                 });

    //             } else {
    //                 alert('Image Does Not Contain EXIF data');
    //             }
    //         },
    //         { meta: true, noRevoke: true } // Options
    //     );

    //     if (loadingImage) {
    //         return;
    //     } else {
    //         throw new Error('Please upload a proper image file!');
    //     }

    // }

    // loadMultipleImages(event) {

    //     var uploadedImages = [];

    //     for (let i = 0; i < event.target.files.length; i++) {
    //         let loadingImage = loadImage(
    //             event.target.files[i],
    //             (img, data) => {
    //                 this.ImageElement = img;
    //                 this.exifData = data.exif;
                    
    //                 if (data.exif) {

    //                     exifr.parse(img).then((newDataObject) => {
    //                         let imageFactory = new EXIFImageFactory();
    //                         let exifImage = imageFactory.createImage(img, newDataObject);
    //                         this.store.addImage(exifImage);
    //                     });

    //                 } else {
    //                     alert('Image Does Not Contain EXIF data');
    //                 }
    //             },
    //             { meta: true, noRevoke: true } // Options
    //         );
    
    //         if (!loadingImage) {
    //             throw new Error('Please upload a proper image file!');
    //         }
    //     }
    // }

    parseExifData(img) {
        return new Promise((resolve, reject) => {
            exifr.parse(img).then((newDataObject) => {
              resolve(newDataObject);
            }).catch((error) => {
              reject(error);
            });
          });
    }
}

module.exports = ExifHound;