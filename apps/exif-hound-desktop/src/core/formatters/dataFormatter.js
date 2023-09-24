export default class DataFormatter {
    blobToDataUrl (blob) {
        return `data:image/gif;base64,${new Buffer( blob, 'url' ).toString('base64')}`;
    }
}