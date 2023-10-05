import { expect } from 'chai';
import ExifImageFactory from './exifImageFactory.js';
import ExifImage from '../types/ExifImage.js';

describe('createImage', () => {
  let exifImageFactory;

  beforeEach(() => {
    exifImageFactory = new ExifImageFactory();
  });

  it('should create an instance of ExifImage', async () => {
    const image = await exifImageFactory.createImage(null, {});
    expect(image).to.be.an.instanceOf(ExifImage);
  });

  it('should initialize ExifImage properties', async () => {
    const image = await exifImageFactory.createImage(null, {});
    expect(image.Id).to.be.a('string');
    expect(image.ImageElement).to.be.null;
    expect(image.ImageData).to.be.null;
    expect(image.Thumbnail).to.be.null;
    expect(image.ThumbnailData).to.be.null;
    // Add more property assertions as needed
  });

  describe('parseLatitudeString', () => {
    let exifImageFactory;
  
    beforeEach(() => {
      exifImageFactory = new ExifImageFactory();
    });
  
    it('should return formatted latitude string when GPSLatitude exists', () => {
      const exifDataObject = {
        GPSLatitude: [42, 30, 0],
        GPSLatitudeRef: 'N',
      };
  
      const formattedLatitude = exifImageFactory.parseLatitudeString(exifDataObject);
      
      // Expect the formatted latitude to match the expected format
      expect(formattedLatitude).to.equal('42:30:0N');
    });
  
    it('should return null when GPSLatitude is not present', () => {
      const exifDataObject = {};
  
      const formattedLatitude = exifImageFactory.parseLatitudeString(exifDataObject);
      
      // Expect the result to be null when GPSLatitude is missing
      expect(formattedLatitude).to.be.null;
    });
  
    // Add more test cases as needed
  });

  describe('parseLongitudeString', () => {
        let exifImageFactory;
    
        beforeEach(() => {
        exifImageFactory = new ExifImageFactory();
        });
    
        it('should return formatted longitude string when GPSLongitude exists', () => {
        const exifDataObject = {
            GPSLongitude: [42, 30, 0],
            GPSLongitudeRef: 'N',
        };
    
        const formattedLongitude = exifImageFactory.parseLongitudeString(exifDataObject);
        
        // Expect the formatted latitude to match the expected format
        expect(formattedLongitude).to.equal('42:30:0N');
        });
    
        it('should return null when GPSLatitude is not present', () => {
        const exifDataObject = {};
    
        const formattedLongitude = exifImageFactory.parseLongitudeString(exifDataObject);
        
        // Expect the result to be null when GPSLatitude is missing
        expect(formattedLongitude).to.be.null;
        });
    // Add more test cases as needed
    });

    describe('parseLatitude', () => {
        let exifImageFactory;
      
        beforeEach(() => {
          exifImageFactory = new ExifImageFactory();
        });

        it('should return latitude when both latitude and longitude are provided', () => {
            const lat = '42:30:0N';
            const lon = '75:30:0W';

            const parsedLatitude = exifImageFactory.parseLatitude(lat, lon);
        
            expect(parsedLatitude).to.equal(42.5);
          });

        it('should return null when latitude is missing', () => {
          const lat = null;
          const lon = '75:30:0W';
      
          const parsedLatitude = exifImageFactory.parseLatitude(lat, lon);
          
          // Expect the result to be null when latitude is missing
          expect(parsedLatitude).to.be.null;
        });
      
        it('should return null when longitude is missing', () => {
          const lat = '42:30:0N';
          const lon = null;
      
          const parsedLatitude = exifImageFactory.parseLatitude(lat, lon);
          
          // Expect the result to be null when longitude is missing
          expect(parsedLatitude).to.be.null;
        });
      
        it('should return null when both latitude and longitude are missing', () => {
          const lat = null;
          const lon = null;
      
          const parsedLatitude = exifImageFactory.parseLatitude(lat, lon);
          
          // Expect the result to be null when both latitude and longitude are missing
          expect(parsedLatitude).to.be.null;
        });
    });

    describe('ExifImageFactory - parseLongitude', () => {
        let exifImageFactory;
      
        beforeEach(() => {
          exifImageFactory = new ExifImageFactory();
        });
      
        it('should return longitude when both latitude and longitude are provided', () => {
          const lat = '42:30:0N';
          const lon = '75:30:0W';
      
          const parsedLongitude = exifImageFactory.parseLongitude(lat, lon);
      
          expect(parsedLongitude).to.equal(-75.5);
        });
      
        it('should return null when latitude is missing', () => {
          const lat = null;
          const lon = '75:30:0W';
      
          const parsedLongitude = exifImageFactory.parseLongitude(lat, lon);
      
          // Expect the result to be null when latitude is missing
          expect(parsedLongitude).to.be.null;
        });
      
        it('should return null when longitude is missing', () => {
          const lat = '42:30:0N';
          const lon = null;
      
          const parsedLongitude = exifImageFactory.parseLongitude(lat, lon);
      
          // Expect the result to be null when longitude is missing
          expect(parsedLongitude).to.be.null;
        });
      
        it('should return null when both latitude and longitude are missing', () => {
          const lat = null;
          const lon = null;
      
          const parsedLongitude = exifImageFactory.parseLongitude(lat, lon);
      
          // Expect the result to be null when both latitude and longitude are missing
          expect(parsedLongitude).to.be.null;
        });
      
        // Add more test cases as needed
    }); 

});