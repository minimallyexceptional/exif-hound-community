import Coordinates from 'coordinate-parser';

export default class GPSFormatter {

    formatCoordaniteArray(coordArray, coordRef) {
        return `${coordArray[0]}:${coordArray[1]}:${coordArray[2]}${coordRef}`
    }

    formatPosition(latString, lonString) {
        return new Coordinates(`${latString} ${lonString}`);
    }
}