export default class DataFormatter {
    blobToDataUrl (blob: any) {
        return `data:image/gif;base64,${Buffer.from(blob).toString('base64')}`;
    }
}