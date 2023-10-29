import { expect } from 'chai';
import DataFormatter from './dataFormatter.js';
import sinon from 'sinon';

// Create a simulated DOM environment
import { JSDOM } from 'jsdom';

// Create a simulated DOM environment
const { window } = new JSDOM('<!DOCTYPE html>');
global.document = window.document;
global.Image = window.Image;
global.URL = {
  createObjectURL: sinon.stub(),
};

describe('DataFormatter', () => {
  let dataFormatter;

  beforeEach(() => {
    dataFormatter = new DataFormatter();

    const dom = new JSDOM();
    global.document = dom.window.document;
    global.Image = dom.window.Image;
  });

  describe('blobToDataUrl', () => {
    it('should convert a Blob to a data URL', () => {
      const blob = new Blob(['test data'], { type: 'text/plain' });

      dataFormatter.blobToDataUrl(blob)
        .then((dataUrl) => {
          expect(dataUrl).to.be.a('string');
          expect(dataUrl.startsWith('data:text/plain;base64,')).to.be.true;
        });
    });

    it('should return null for non-Blob inputs', () => {
      const input = 'not a Blob';
      const dataUrl = dataFormatter.blobToDataUrl(input);
      expect(dataUrl).to.be.null;
    });
  });

  describe('bufferArrayToImage', () => {
    it('should convert a Buffer array to an Image URL', async () => {
      // Stub the URL.createObjectURL method
      global.URL.createObjectURL.returns('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDA...');

      const bufferArray = [0x48, 0x65, 0x6C, 0x6C, 0x6F];
      const mimeType = 'image/jpeg';

      const result = await dataFormatter.bufferArrayToImage(bufferArray, mimeType);

      expect(result).to.be.a('HTMLImageElement');
      expect(result.src).to.equal('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDA...');
    });
  });

});