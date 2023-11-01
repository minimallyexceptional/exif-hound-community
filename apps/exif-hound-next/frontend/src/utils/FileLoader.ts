function bufferToBase64(buffer: ArrayBuffer): string {
    const uintArray = new Uint8Array(buffer);
    let binary = '';
    
    uintArray.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return btoa(binary);
  };

function fileListToArray(fileList) {
    const fileArray = [];
  
    for (let i = 0; i < fileList.length; i++) {
      fileArray.push(fileList[i]);
    }
  
    return fileArray;
}

async function load(file): Promise<ImageDTO[]> {
    try {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onload = (event) => {
                resolve([{
                    data: event.target.result,
                    name: file.name,
                    ext: file.type.split('/')[1]
                }]);
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

type ImageDTO = {
    data: any
    name: string
    ext: string
}

async function loadImage(imageBuffer, file): Promise<ImageDTO> {
    try {
        console.log("LOADING IMAGE ", imageBuffer)
        return {
            data: bufferToBase64(imageBuffer[0].data),
            name: file.name,
            ext: file.type.split('/')[1]
        };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export default async function loadImages(fileList): Promise<ImageDTO[]> {
    // const hound = new ExifHound();
    const files = fileListToArray(fileList);
    
    try {
        if (files.length > 1) {
            return Promise.all(files.map(file => load(file).then(imageBuffer => loadImage(imageBuffer, file))));
        } else {
            console.log('FILES ', files[0]);
            const file = files[0];
            let dto = await load(file).then(imageBuffer => loadImage(imageBuffer, file))

            return [ dto ];
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}