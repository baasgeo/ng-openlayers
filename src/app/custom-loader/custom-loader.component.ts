import {Component} from '@angular/core';
import {LayerType, SourceType} from 'ng-openlayers-lib';

const customLoader = (image, src) => {
  fetch(src, {
    method: 'get',
    // headers: {'Authorization': value}
  }).then(response => {
    if (response.ok) {
      return response.blob();
    }
    throw new Error('Network response was not ok.');
  }).then(blob => {
    image.getImage().src = URL.createObjectURL(blob);
  }).catch(error => {
    console.log('There has been a problem with your fetch operation: ', error.message);
  });
};

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html'
})
export class CustomLoaderComponent {

  map = {
    center: [-10997148, 4569099],
    zoom: 4
  };

  layers = [
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
        url: 'https://ahocevar.com/geoserver/wms',
        hidpi: true,
        tileLoadFunction: customLoader,
        params: {'LAYERS': 'ne:NE1_HR_LC_SR_W_DR', 'TILED': true}
      }
    },
    {
      title: 'topp:states',
      opacity: 0.8,
      type: LayerType.IMAGE,
      visible: true,
      extent: [-13884991, 2870341, -7455066, 6338219],
      sourceOptions: {
        url: 'https://ahocevar.com/geoserver/wms',
        hidpi: true,
        params: {'LAYERS': 'topp:states'},
        ratio: 1,
        serverType: 'geoserver'
      }
    },

  ];

  constructor() {
  }

}
