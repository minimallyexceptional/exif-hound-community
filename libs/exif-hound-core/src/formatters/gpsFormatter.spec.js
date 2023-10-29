import assert from 'assert';
import GPSFormatter from './gpsFormatter.js';

describe('GPSFormatter', () => {
  const gpsFormatter = new GPSFormatter();

  describe('formatCoordaniteArray', () => {

    it('should format coordinate array with reference', () => {
      const coordArray = [34, 12, 30];
      const coordRef = 'N';

      const formattedCoord = gpsFormatter.formatCoordaniteArray(coordArray, coordRef);

      assert.strictEqual(formattedCoord, '34:12:30N');
    });

    it('should format coordinate array with reference (negative values)', () => {
      const coordArray = [-34, 12, 30];
      const coordRef = 'S';

      const formattedCoord = gpsFormatter.formatCoordaniteArray(coordArray, coordRef);

  
      assert.strictEqual(formattedCoord, '-34:12:30S');
    });
  });

  describe('formatPosition', () => {
    it('should format position from latitude and longitude strings', () => {
      const latString = '34:12:30N';
      const lonString = '118:23:45W';

      const formattedPosition = gpsFormatter.formatPosition(latString, lonString);

      assert.strictEqual(`${formattedPosition.getLatitude().toFixed(3)} ${formattedPosition.getLongitude().toFixed(3)}`, '34.208 -118.396');
    });
  });
});
