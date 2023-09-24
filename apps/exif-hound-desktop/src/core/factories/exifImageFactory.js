import EXIFImage from '../types/exifImage'

import GPSFormatter from '../formatters/gpsFormatter';
import DataFormatter from "../formatters/dataFormatter";
import { blobToDataURL } from 'blob-util';

export default class EXIFImageFactory {
    constructor() {
        this.image = null;

        this.gpsFormatter = new GPSFormatter();
        this.dataFormatter = new DataFormatter();
    }
    createImage(ImageElement, exifDataObject) {
        this.image = new EXIFImage();
    
        // Parsed Values
        this.latitudeString = this.parseLatitudeString(exifDataObject);
        this.longitudeString = this.parseLongitudeString(exifDataObject);

        // Image Values
        this.image.ImageElement = ImageElement || null;
        this.image.ImageData = ImageElement.src || null;
        this.image.Thumbnail = exifDataObject.thumbnail || null;
        blobToDataURL(exifDataObject.thumbnail.blob).then(res => {
            this.image.ThumbnailData = res || null;
        })

        // Time and Date
        this.image.DateTimeOriginal = exifDataObject.DateTimeOriginal || null;
        this.image.DateTime = exifDataObject.DateTime || null;
        this.image.DateTimeDigitized = exifDataObject.DateTimeDigitized || null;

        // Meta
        this.image.ExifVersion = exifDataObject.ExifVersion || null;
        this.image.ExifIFDPointer = exifDataObject.ExifIFDPointer || null;

        // GPS
        this.image.GPSLatitude = this.parseLatitude(this.latitudeString, this.longitudeString) || null;
        this.image.GPSLongitude = this.parseLongitude(this.latitudeString, this.longitudeString) || null;
        this.image.GPSDateStamp = exifDataObject.GPSDateStamp || null;
        this.image.GPSMapDatum = exifDataObject.GPSMapDatum || null;
        this.image.GPSSatellites = exifDataObject.GPSSatellites || null;
        this.image.GPSImgDirectionRef = exifDataObject.GPSImgDirectionRef || null;


        // Camera Data
        this.image.Make = exifDataObject.Make || null;
        this.image.Model = exifDataObject.Model || null;
        this.image.Software = exifDataObject.Software || null;


        // Picture Data
        this.image.ImageDescription = exifDataObject.ImageDescription || null;
        this.image.Flash = exifDataObject.Flash || null;
        this.image.FlashpixVersion = exifDataObject.FlashpixVersion || null;
        this.image.FocalLength = exifDataObject.FocalLength || null;
        this.image.FocalLengthIn35mmFilm = exifDataObject.FocalLengthIn35mmFilm || null;
        this.image.GainControl = exifDataObject.GainControl || null;
        this.image.ISOSpeedRatings = exifDataObject.ISOSpeedRatings || null;
        this.image.FileSource = exifDataObject.FileSource || null;
        this.image.LightSource = exifDataObject.LightSource || null;

        this.image.ComponentsConfiguration = exifDataObject.ComponentsConfiguration || null;
        this.image.Contrast = exifDataObject.Contrast || null;
        this.image.CustomRendered = exifDataObject.CustomRendered || null;
        this.image.ExposureBias = exifDataObject.ExposureBias || null;
        this.image.ExposureMode = exifDataObject.ExposureMode || null;
        this.image.ExposureProgram = exifDataObject.ExposureProgram || null;
        this.image.ExposureTime = exifDataObject.ExposureTime || null;
        this.image.FNumber = exifDataObject.FNumber || null;
        this.image.MaxApertureValue = exifDataObject.MaxApertureValue || null;
        this.image.MeteringMode = exifDataObject.MeteringMode || null;
        this.image.PixelXDimension = exifDataObject.PixelXDimension || null;
        this.image.PixelYDimension = exifDataObject.PixelYDimension || null;
        this.image.ResolutionUnit = exifDataObject.ResolutionUnit || null;
        this.image.SceneCaptureType = exifDataObject.SceneCaptureType || null;
        this.image.SceneType = exifDataObject.SceneType || null;
        this.image.WhiteBalance = exifDataObject.WhiteBalance || null;
        this.image.XResolution = exifDataObject.XResolution || null;
        this.image.YResolution = exifDataObject.YResolution || null;
        this.image.YCbCrPositioning = exifDataObject.Orientation || null;
        this.image.Orientation = exifDataObject.Orientation || null;

        return this.image;
    }

    parseLatitudeString(exifDataObject) {
        if (exifDataObject.GPSLatitude) {
            return this.gpsFormatter.formatCoordaniteArray(
                [exifDataObject.GPSLatitude[0], 
                exifDataObject.GPSLatitude[1], 
                exifDataObject.GPSLatitude[2]], 
                exifDataObject.GPSLatitudeRef
            );
        } else {
            return null;
        }
    }

    parseLongitudeString(exifDataObject) {
        if (exifDataObject.GPSLongitude) {
            return this.gpsFormatter.formatCoordaniteArray([
                exifDataObject.GPSLongitude[0], 
                exifDataObject.GPSLongitude[1], 
                exifDataObject.GPSLongitude[2]], 
                exifDataObject.GPSLongitudeRef
            );
        } else {
            return null;
        }
    }

    parseLatitude(lat, lon) {
        if (lat && lon) {
            return this.gpsFormatter.formatPosition(lat, lon).getLatitude();
        } else {
            return null;
        }
    }

    parseLongitude(lat, lon) {
        if (lat && lon) {
            return this.gpsFormatter.formatPosition(lat, lon).getLongitude();
        } else {
            return null;
        }
    }
    

    parsePosition(lat, lon) {
        if (lat && lon) {
            return this.gpsFormatter.formatPosition(this.latitude, this.longitude);
        } else {
            return {
                latitude: null,
                longitude: null
            }
        }
    }
}