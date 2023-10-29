import { Buffer } from 'buffer';
import { createCanvas } from 'canvas';

export default class DataFormatter {

  blobToDataUrl(blob) {
    if (!(blob instanceof Blob)) return null;
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = Buffer.from(reader.result);
        const dataUrl = `data:image/gif;base64,${buffer.toString('base64')}`;
        resolve(dataUrl);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  }

  bufferArrayToDataUrl(bufferArray, mimeType = 'application/octet-stream') {
    const buffer = Buffer.from(bufferArray);

    // Encode the buffer as base64
    const base64 = buffer.toString('base64');
  
    // Construct the data URL
    const dataUrl = `data:${mimeType};base64,${base64}`;
  
    return dataUrl;
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