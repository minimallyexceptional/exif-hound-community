import Coordinates from '../entities/Coordinates';

export default class GPSFormatter {
    formatCoordaniteArray(coordArray: number[], coordRef: any) {
        return `${coordArray[0]}:${coordArray[1]}:${coordArray[2]}${coordRef}`
    }

    // formatPositionFromCoordanteArrays(coordArrayLat: number[], coordRefLat: number[], coordArrayLon: number[], coordRefLon: number[]) {
    //     return new Coordinates(
    //         this.formatCoordaniteArray(coordArrayLat, coordRefLat),
    //         this.formatCoordaniteArray(coordArrayLon, coordRefLon)
    //     );
    // }

    formatPosition(latString: string, lonString: string) {
        return new Coordinates(`${latString} ${lonString}`);
    }
}