import { expect } from 'chai';
import ExifImage from './ExifImage.js';

describe('ExifImage', () => {
  let exifImage;

  beforeEach(() => {
    exifImage = new ExifImage();
  });

  it('should initialize with default values', () => {
    expect(exifImage.ImageElement).to.be.null;
    expect(exifImage.ImageData).to.be.null;
    expect(exifImage.Thumbnail).to.be.null;
    expect(exifImage.ThumbnailData).to.be.null;

    expect(exifImage.DateTimeOriginal).to.be.null;
    expect(exifImage.DateTime).to.be.null;
    expect(exifImage.DateTimeDigitized).to.be.null;

    expect(exifImage.GPSLatitude).to.be.null;
    expect(exifImage.GPSLongitude).to.be.null;
    expect(exifImage.GPSDateStamp).to.be.null;
    expect(exifImage.GPSMapDatum).to.be.null;
    expect(exifImage.GPSSatellites).to.be.null;
    expect(exifImage.GPSImgDirectionRef).to.be.null;

    expect(exifImage.Make).to.be.null;
    expect(exifImage.Model).to.be.null;
    expect(exifImage.Software).to.be.null;

    expect(exifImage.ImageDescription).to.be.null;
    expect(exifImage.Flash).to.be.null;
    expect(exifImage.FlashpixVersion).to.be.null;
    expect(exifImage.FocalLength).to.be.null;
    expect(exifImage.FocalLengthIn35mmFilm).to.be.null;
    expect(exifImage.GainControl).to.be.null;
    expect(exifImage.ISOSpeedRatings).to.be.null;
    expect(exifImage.FileSource).to.be.null;
    expect(exifImage.LightSource).to.be.null;
  });

});