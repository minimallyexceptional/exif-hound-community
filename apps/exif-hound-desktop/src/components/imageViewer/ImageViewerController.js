import OpenSeadragon from 'openseadragon';

export default class ImageViewerController {
    constructor() {
        this.viewer = null;
        this.tileSource = null;
    }

    init (mountLocation, imageUrl) {
        this.buildNewTileSource({
            type: 'blob',
            url:  imageUrl
        });

        this.viewer = new OpenSeadragon({
            id: mountLocation,
            tileSources: this.tileSource,
            showNavigationControl: false
        });

        this.setMaxZoomLevel(100);
        this.setMinZoomLevel(1);

        return this.viewer;
    }

    buildNewTileSource (tileSourceObject) { 
        this.tileSource = tileSourceObject
    }

    setCurrentImage(imageUrl) {
        if (this.viewer) {
            this.viewer.world.removeAll();
            this.viewer.addSimpleImage({url: imageUrl });
        }
    }

    setMaxZoomLevel(zoomLevel) {
        this.viewer.viewport.maxZoomLevel = zoomLevel;
    }

    setMinZoomLevel(zoomLevel) {
        this.viewer.viewport.minZoomLevel = zoomLevel;
    }

}