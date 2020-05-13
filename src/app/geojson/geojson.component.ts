import {Component} from '@angular/core';
import {GeoJSON} from 'ol/format';
import {LayerType, SourceType} from 'ng-openlayers-lib';

@Component({
    selector: 'app-simple',
    templateUrl: './geojson.component.html'
})
export class GeojsonComponent {
    map = {
        center: [0, 0],
        zoom: 5,
        rotation: 0,
        maxZoom: 10,
        minZoom: 0,
        layers: [
            {
                properties: {
                    title: 'osm',
                },
                layerType: LayerType.TILE,
                opacity: 0.8,
                visible: true,
                sourceOptions: {
                    sourceType: SourceType.OSM
                }
            },
            {
                properties: {
                    title: 'geojson',
                    renderMode: 'image'
                },
                layerType: LayerType.VECTOR,
                opacity: 1,
                visible: true,
                sourceOptions: {
                    sourceType: SourceType.VECTOR,
                    url: 'assets/cluster.json',
                    format: new GeoJSON()
                }
            },
            {
                properties: {
                    title: 'loader',
                    renderMode: 'image'
                },
                layerType: LayerType.VECTOR,
                opacity: 1,
                visible: true,
                sourceOptions: {
                    sourceType: SourceType.VECTOR,
                    loader: function(extent, resolution, projection) {
                        const proj = projection.getCode();
                        const url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                            'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                            'outputFormat=application/json&srsname=' + proj + '&' +
                            'bbox=' + extent.join(',') + ',' + proj;
                        const xhr = new XMLHttpRequest();
                        xhr.open('GET', url);
                        const onError = function() {
                            this.removeLoadedExtent(extent);
                        };
                        xhr.onerror = onError;
                        xhr.onload = () => {
                            if (xhr.status === 200) {
                                this.addFeatures(
                                    this.getFormat().readFeatures(xhr.responseText));
                            } else {
                                onError();
                            }
                        };
                        xhr.send();
                    },
                    format: new GeoJSON()
                }
            }
        ]
    };

    test() {
        this.map.layers[1].opacity = 0.5;
        this.map.layers[1].properties = {
            title: 'geojson2',
            renderMode: 'vector'
        };
        this.map.layers[1].sourceOptions['feature'] = [];
    }

}
