export default interface ExifData {
    // Image Values
    ImageElement: HTMLImageElement | null;
    ImageData: string | null;
    Thumbnail: any | null;
    ThumbnailData: string | null;

    // Time and Date
    DateTimeOriginal: string | null;
    DateTime: string | null;
    DateTimeDigitized: string | null;

    // GPS
    GPSLatitude: number | null;
    GPSLongitude: number | null;
    GPSDateStamp: string | null;
    GPSMapDatum: string | null;
    GPSSatellites: string | null;
    GPSImgDirectionRef: string | null;

    // Camera
    Make: string | null;
    Model: string | null;
    Software: string | null;

    // Picture
    ImageDescription: string | null;
    Flash: string | null;
    FlashpixVersion: string | null;
    FocalLength: string | null;
    FocalLengthIn35mmFilm: string | null;
    GainControl: string | null;
    ISOSpeedRatings: string | null;
    FileSource: string | null;
    LightSource: string | null;
}