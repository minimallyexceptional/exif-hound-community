import EXIFImageFactory from './factories/exifImageFactory';
import EXIF from 'exif-js';
import piexif from 'piexifjs';

export default class ExifHound {
    private ImageElement: HTMLImageElement | null = null;
    private exifData: any = null;
    private imageFactory: EXIFImageFactory;

    constructor() {
        this.imageFactory = new EXIFImageFactory();
    }

    public getExifData(dataUrl: string, callback: (exifDataObject: any) => void): void {
        console.log('GOT EXIF REQUEST');

        return EXIF.getData(dataUrl, () => {
            const exifDataObject = EXIF.getAllTags(dataUrl);
            callback(exifDataObject);
        });

        const arrayBuffer = base64ToArrayBuffer(dataUrl.split(',')[1]);
        const parser = new ExifParser(arrayBuffer);
        const exifData = parser.parse();
        console.log(exifData);
    }

    // public loadMultipleImages(event: Event) {
    //     const target = event.target as HTMLInputElement;
    //     if (!target.files || target.files.length === 0) {
    //         throw new Error('Please upload proper image files!');
    //     }

    //     for (let i = 0; i < target.files.length; i++) {
    //         loadImage(
    //             target.files[i],
    //             (img: any, data: any) => {
    //                 this.ImageElement = img;
    //                 this.exifData = data.exif;

    //                 if (data.exif) {
    //                     EXIF.getData(img, () => {
    //                         const imageFactory = new EXIFImageFactory();
    //                         const newDataObject = EXIF.getAllTags(img);
    //                         const exifImage = imageFactory.createImage(img, newDataObject);

    //                         // Assuming 'addImage' is a method of the 'store' object
    //                         this.store.addImage(exifImage);
    //                     });
    //                 } else {
    //                     alert('Image Does Not Contain EXIF data');
    //                 }
    //             },
    //             { meta: true, noRevoke: true, orientation: 1 } as LoadImageOptions // Options
    //         );
    //     }
    // }
}
