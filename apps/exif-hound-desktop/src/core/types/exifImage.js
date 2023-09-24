export default class EXIFImage {
    constructor() {
        // Image Values
        this.ImageElement = null;
        this.ImageData = null;
        this.Thumbnail = null;
        this.ThumbnailData = null;

        // Time and Date
        this.DateTimeOriginal = null;
        this.DateTime = null;
        this.DateTimeDigitized = null;

        // GPS
        this.GPSLatitude = null;
        this.GPSLongitude = null;
        this.GPSDateStamp = null;
        this.GPSMapDatum = null;
        this.GPSSatellites = null;
        this.GPSImgDirectionRef = null;

        // Camera
        this.Make = null;
        this.Model = null;
        this.Software = null;

        // Picture
        this.ImageDescription = null;
        this.Flash = null;
        this.FlashpixVersion = null;
        this.FocalLength = null;
        this.FocalLengthIn35mmFilm = null;
        this.GainControl = null;
        this.ISOSpeedRatings = null;
        this.FileSource = null;
        this.LightSource = null;
    }
}