import ExifHound from 'exif-hound-core';

function fileListToArray(fileList) {
    const fileArray = [];
  
    for (let i = 0; i < fileList.length; i++) {
      fileArray.push(fileList[i]);
    }
  
    return fileArray;
}

async function load(file) {
    try {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onload = (event) => {
                resolve(event.target.result);
            };
            fileReader.onerror = (event) => {
                reject(event);
            };
            fileReader.readAsArrayBuffer(file);
        });
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function loadImage(hound, store, imageBuffer) {
    try {
        // Parse EXIF data from the image with ExifHound
        const exifData = await hound.parseExifData(imageBuffer);

        store.addImage(exifData);

        // Return the image buffer or exif data as needed
        return { imageBuffer, exifData };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export default async function loadImages(fileList, store) {
    const hound = new ExifHound();
    const files = fileListToArray(fileList);
    
    try {
        if (files.length > 1) {
            return Promise.all(files.map(file => load(file).then(imageBuffer => loadImage(hound, store, imageBuffer))));
        } else {
            const imageBuffer = await load(files[0]);
            return loadImage(hound, store, imageBuffer);
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}