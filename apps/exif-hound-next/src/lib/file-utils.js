import ExifHound from 'exif-hound-core';

export function getExifHound() {
  return new ExifHound();
};


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

async function loadImage(hound, store, imageBuffer, name) {
    try {
        // Parse EXIF data from the image with ExifHound
        const exifData = await hound.parseExifData(imageBuffer, name);

        // Handle EXIF data or perform any other processing here
        // For example, you can access properties like exifData.GPSLatitude, exifData.GPSLongitude, etc.
        store.addImage(exifData);

        // Return the image buffer or exif data as needed
        return { imageBuffer, exifData };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export async function loadImages(event, store) {
    const fileList = event.target.files;
    
    const hound = new ExifHound();
    const files = fileListToArray(fileList);
    
    try {
        if (files.length > 1) {
            console.log('Loading multiple files ', files);

            return Promise.all(files.map(file => load(file).then(imageBuffer => loadImage(hound, store, imageBuffer, file.name))));
        } else {
            const imageBuffer = await load(files[0]);
            return loadImage(hound, store, imageBuffer);
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}