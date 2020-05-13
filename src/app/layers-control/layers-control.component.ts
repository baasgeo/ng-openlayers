import {Component} from '@angular/core';
import {LayerType, SourceType} from 'ng-openlayers-lib';

@Component({
    selector: 'app-layers-control',
    templateUrl: './layers-control.component.html'
})
export class LayersControlComponent {

    map = {
        center: [-10997148, 4569099],
        zoom: 4
    };

    layers: any = [
        {
            title: 'OSM',
            visible: true
        },
        {
            title: 'NE1_HR_LC_SR_W_DR',
            type: LayerType.TILE,
            opacity: 0.8,
            visible: true,
            extent: [-13884991, 2870341, -7455066, 6338219],
            sourceOptions: {
                sourceType: SourceType.TILEWMS,
                url: '//ahocevar.com/geoserver/wms',
              hidpi: true,
                params: {'LAYERS': 'ne:NE1_HR_LC_SR_W_DR', 'TILED': true}
            }
        }

    ];

    constructor() {
    }

    addLayer() {
        this.layers.push({
            title: 'topp:states',
            opacity: 0.8,
            type: LayerType.IMAGE,
            visible: true,
            extent: [-13884991, 2870341, -7455066, 6338219],
            sourceOptions: {
                url: '//ahocevar.com/geoserver/wms',
              hidpi: true,
                params: {'LAYERS': 'topp:states'},
                ratio: 1,
                serverType: 'geoserver'
            }
        });
    }

    closeLayer(layer: string) {
        this.layers.pop();
    }

}
