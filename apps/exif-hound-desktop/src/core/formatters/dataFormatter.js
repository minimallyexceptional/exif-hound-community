export default class DataFormatter {
    blobToDataUrl (blob) {
        return `data:image/gif;base64,${new Buffer( blob, 'url' ).toString('base64')}`;
    }

    async imageToBlob(img) {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 1);
        });
    }
}