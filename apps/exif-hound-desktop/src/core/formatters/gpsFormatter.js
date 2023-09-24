import * as Coordinates from 'coordinate-parser';


export default class GPSFormatter {
    formatCoordaniteArray(coordArray, coordRef) {
        return `${coordArray[0]}:${coordArray[1]}:${coordArray[2]}${coordRef}`
    }

    formatPositionFromCoordanteArrays(coordArrayLat, coordRefLat, coordArrayLon, coordRefLon) {
        return new Coordinates(
            this.formatCoordaniteArray(coordArrayLat, coordRefLat),
            this.formatCoordaniteArray(coordArrayLon, coordRefLon)
        );
    }

    formatPosition(latString, lonString) {
        return new Coordinates(`${latString} ${lonString}`);
    }
}