import { Buffer } from 'buffer';
export default class DataFormatter {

  blobToDataUrl(blob) {
    if (blob instanceof Blob) {
      const buffer = Buffer.from(blob, 'base64');
      return `data:image/gif;base64,${buffer.toString('base64')}`;
    }

    return null;
  }

  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(blob);
    });
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

  async bufferArrayToImage(bufferArray, mimeType) {
    // Convert the Buffer array to a Uint8Array
    const uint8Array = new Uint8Array(bufferArray);
  
    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: mimeType });
  
    // Create a data URL from the Blob
    const dataUrl = URL.createObjectURL(blob);
  
    // Create an Image element
    const img = new Image();
  
    // Set the src attribute to the data URL
    img.src = dataUrl;
  
    return img;
  }

}