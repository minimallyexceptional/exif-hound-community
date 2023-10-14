import ExifHound from 'exif-hound-core';
import createStore from '../state';
import type { ExifImage } from '../types';
import { UUID } from './utils';


const Store = createStore();

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

async function loadImage(hound, imageBuffer, name): Promise<any> {
    try {
        // Parse EXIF data from the image with ExifHound
        const exifData = await hound.parseExifData(imageBuffer, name);

        // Return the image buffer or exif data as needed
        if (exifData && imageBuffer) {
            const newImage: ExifImage = {
                id: UUID(),
                dateAdded: `${Date.now()}`,
                name: name,
                imageData: {
                    imageBuffer,
                    exif: exifData || null
                },
                position: {
                    lat: exifData.GPSLatitude || null,
                    long: exifData.GPSLongitude || null,
                }
            }

            return newImage;
        } else {
            console.error('No exif data found');
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export async function loadImages(event): Promise<any> {
    const fileList = event.target.files;
    
    const hound = new ExifHound();
    const files = fileListToArray(fileList);
    
    try {
        if (files.length > 1) {
            
            return Promise.all(
                files.map(file => load(file)
                .then(imageBuffer => loadImage(hound, imageBuffer, file.name))
            ));
        
        } else {
            const imageBuffer = await load(files[0]);
            return loadImage(hound, imageBuffer, files[0].name);
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}