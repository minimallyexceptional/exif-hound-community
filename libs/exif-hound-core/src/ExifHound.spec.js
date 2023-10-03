const { expect } = require('chai');
const sinon = require('sinon');
const ExifHound = require('./ExifHound.js'); // Replace with the correct path to your ExifHound class
const exifr = require('exifr');

let exifHound;
let sandBox;
let exifrStub;

describe('ExifHound.parseExifData', () => {
  before(() => {
    // Initialize the ExifHound instance or set up any necessary configuration
    // You can pass any required parameters to the constructor here
    exifHound = new ExifHound();
  });

  beforeEach(() => {
    // Stub the behavior of exifr.parse
    sandBox = sinon.createSandbox();
    exifrStub = sandBox.stub(exifr, 'parse');
    exifrStub.resetHistory(); // Reset the history of the stub
    exifrStub.reset(); // Reset the behavior of the stub
  });

  afterEach(() => {
    // Restore the original behavior of exifr.parse after each test case
    sandBox.restore();
  });

  it('should resolve with EXIF data when parsing is successful', async () => {
    const img = {}; // You can provide a sample image or an empty object
    const mockExifData = {
      Make: 'Canon',
      Model: 'EOS 5D Mark IV',
    };

    // Update the stubbed behavior of exifr.parse for this test case
    exifrStub.resolves(mockExifData);

    // Call the parseExifData method
    const result = await exifHound.parseExifData(img);

    // Expectations
    expect(result).to.deep.equal(mockExifData); // Ensure it resolves with the mocked EXIF data
    sinon.assert.calledOnce(exifrStub); // Ensure exifr.parse was called once with the image
  });

  it('should reject with an error when parsing fails', async () => {
    const img = {}; // You can provide a sample image or an empty object
    const mockError = new Error('Failed to parse EXIF data');

    // Update the stubbed behavior of exifr.parse for this test case
    exifrStub.rejects(mockError);

    // Call the parseExifData method
    try {
      await exifHound.parseExifData(img);
      // If parsing is successful, this should not be executed
      throw new Error('Test should have failed');
    } catch (error) {
      // Expectations
      expect(error).to.equal(mockError); // Ensure it rejects with the mocked error
      sinon.assert.calledOnce(exifrStub); // Ensure exifr.parse was called once with the image
    }
  });
});
