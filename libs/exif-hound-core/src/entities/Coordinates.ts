export default class Coordinates {
    private  rawCoordinate: string;
    private  latitude: number | null = null;
    private  longitude: number | null = null;

    constructor(coordinateString: string) {
        this.rawCoordinate = coordinateString;
        this.parseCoordinates();
    }

    private parseCoordinates() {
        // Regular expression to match the format "40:7:22.8N 74:7:22.8W"
        const regex = /(\d+:\d+:\d+\.\d+[NS])\s+(\d+:\d+:\d+\.\d+[EW])/i;
        const match = this.rawCoordinate.match(regex);

        if (match) {
            this.latitude = this.convertCoordinateStringToNumber(match[1]);
            this.longitude = this.convertCoordinateStringToNumber(match[2]);
        }
    }

    private convertCoordinateStringToNumber(coordinateString: string): number {
        const parts = coordinateString.split(/[:.]/);
        if (parts.length === 4) {
            const degrees = parseFloat(parts[0]);
            const minutes = parseFloat(parts[1]);
            const seconds = parseFloat(parts[2]);
            const direction = parts[3].toUpperCase();

            let result = degrees + minutes / 60 + seconds / 3600;
            if (direction === 'S' || direction === 'W') {
                result = -result;
            }
            return result;
        }
        return 0; // Invalid format
    }

    getLatitude(): number | null {
        return this.latitude;
    }

    getLongitude(): number | null {
        return this.longitude;
    }
}
