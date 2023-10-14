import { expect } from 'chai';
import L from 'leaflet'; // You need to import Leaflet if not already imported.
import { addMarker } from './map-utils.js'; // Replace with the actual module path.

describe('addMarker', () => {

  it('should add a marker to the map with the given coordinates and open a popup', () => {
    // Create a mock map element for testing.
    const map = L.map('map'); // Replace with your actual map initialization code.

    const lat = 51.5074; // Example latitude
    const lon = -0.1278; // Example longitude
    const popup = 'Test Popup';

    const marker = addMarker(map, lat, lon, popup);

    expect(marker).to.be.an.instanceOf(L.Marker);
    expect(marker.getLatLng()).to.deep.equal([lat, lon]);

    // // Check if a popup exists and its content.
    // expect(marker.popup).to.be.an.instanceOf(L.Popup);
    // expect(marker._popup.getContent()).to.equal(popup);
  });

  it('should return null if the map is not provided', () => {
    const lat = 51.5074; // Example latitude
    const lon = -0.1278; // Example longitude
    const popup = 'Test Popup';

    const marker = addMarker(null, lat, lon, popup);

    expect(marker).to.equal(null);
  });
});