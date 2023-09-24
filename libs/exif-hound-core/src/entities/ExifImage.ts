import ExifData from '../types/ExifData';

export default class ExifImage implements ExifData {
    public ImageElement: HTMLImageElement | null;
    public ImageData: string | null;
    public Thumbnail: any | null;
    public ThumbnailData: string | null;
    public DateTimeOriginal: string | null;
    public DateTime: string | null;
    public DateTimeDigitized: string | null;
    public GPSLatitude: number | null;
    public GPSLongitude: number | null;
    public GPSDateStamp: string | null;
    public GPSMapDatum: string | null;
    public GPSSatellites: string | null;
    public GPSImgDirectionRef: string | null;
    public Make: string | null;
    public Model: string | null;
    public Software: string | null;
    public ImageDescription: string | null;
    public Flash: string | null;
    public FlashpixVersion: string | null;
    public FocalLength: string | null;
    public FocalLengthIn35mmFilm: string | null;
    public GainControl: string | null;
    public ISOSpeedRatings: string | null;
    public FileSource: string | null;
    public LightSource: string | null;
    
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