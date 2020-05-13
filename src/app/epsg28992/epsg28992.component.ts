import {Component, OnInit} from '@angular/core';
import {LayerType, MapService, SourceType} from 'ng-openlayers-lib';

import TileGrid from 'ol/tilegrid/TileGrid';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

@Component({
    selector: 'app-epsg28992',
    templateUrl: './epsg28992.component.html'
})
export class Epsg28992Component implements OnInit {

    map = {
        center: [91155, 444906],
        zoom: 2,
        projection: 'EPSG:28992',
        layers: [
            {
                title: 'Actueel_ortho25',
                layerType: LayerType.TILE,
                preload: Infinity,
                sourceOptions: {
                    sourceType: SourceType.XYZ,
                    projection: 'EPSG:28992',
                    tileGrid: new TileGrid({
                        extent: [-285401.92, 22598.08, 595401.92, 903401.92],
                        resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210]
                    }),
                    url: '//geodata.nationaalgeoregister.nl/luchtfoto/rgb/tms/1.0.0/Actueel_ortho25/EPSG:28992/{z}/{x}/{-y}.jpeg'
                }
            },
            {
                title: 'brtachtergrondkaart',
                opacity: 0.6,
                layerType: LayerType.TILE,
                sourceOptions: {
                    sourceType: SourceType.WMTS,
                    url: '//geodata.nationaalgeoregister.nl/tiles/service/wmts?',
                    layer: 'brtachtergrondkaart',
                    matrixSet: 'EPSG:28992',
                    format: 'image/png',
                    projection: 'EPSG:28992',
                    tileGrid: new WMTSTileGrid({
                        origin: [-285401.92, 903402.0],
                        resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210],
                        matrixIds: this.createMatrix()
                    }),
                    style: 'default',
                    wrapX: false
                }
            },
            {
                title: 'demo:buurt_2012_v1',
                opacity: 0.8,
                layerType: LayerType.IMAGE,
                visible: true,
                extent: [10425, 306846, 278026, 621876],
                sourceOptions: {
                    url: '//baasgeo.mapgallery.info/geoserver/demo/wms',
                  hidpi: true,
                    params: {'LAYERS': 'demo:buurt_2012_v1'},
                    ratio: 1,
                    serverType: 'geoserver'
                }
            },
            {
                title: 'demo:waterschappen2010',
                layerType: LayerType.TILE,
                opacity: 0.8,
                visible: true,
                sourceOptions: {
                    sourceType: SourceType.TILEWMS,
                    url: '//baasgeo.mapgallery.info/geoserver/demo/wms',
                  hidpi: true,
                    params: {'LAYERS': 'demo:waterschappen2010', 'TILED': true}
                }
            }
        ]
    };

    epsg28992 = { // https://www.geocat.net/setting-up-geonetwork-with-dutch-pdok-tile-services/
        name: 'EPSG:28992',
        resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210],
        // As defined by, e.g., https://epsg.io/28992.js
        // projection: '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs',
        projection: '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.999908 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
        extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999],
        worldExtent: [-1.65729160235431, 48.0405018704265, 11.2902578747914, 55.9136415748388],
        origin: [-285401.92, 903402.0]
    };

    constructor(mapService: MapService) {
        mapService.addProj4(
            this.epsg28992.name,
            this.epsg28992.projection,
            this.epsg28992.extent
        );
    }

    ngOnInit() {
    }

    private createMatrix(matrixSize = 15, matrixSet = 'EPSG:28992') {

        const matrixIds = new Array(matrixSize - 1);
        for (let i = 0; i < matrixSize; ++i) {
            matrixIds[i] = matrixSet + ':' + i;
        }
        return matrixIds;
    }

}
