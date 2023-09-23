export default interface ExifImage {
    name: string, 
    path: string,
    exifData: { 
        size: string, 
        date: string,
        tags: Array<string>,
        latitude: number,
        longitude: number 
    }
}