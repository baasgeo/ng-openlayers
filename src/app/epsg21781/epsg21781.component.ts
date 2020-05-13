import {Component} from '@angular/core';
import Projection from 'ol/proj/Projection';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import {ImageWMS, TileWMS} from 'ol/source';

@Component({
  selector: 'app-epsg21781',
  templateUrl: './epsg21781.component.html'
})
export class Epsg21781Component {
  center = [660000, 190000];
  zoom = 9;
  projection = new Projection({
    code: 'EPSG:21781',
    units: 'm'
  });
  layers = [
    new ImageLayer({
      source: new ImageWMS({
        params: {LAYERS: 'ch.bafu.schutzgebiete-paerke_nationaler_bedeutung'},
        serverType: 'mapserver',
        url: '//wms.geo.admin.ch/'
      })
    }),
    new TileLayer({
      opacity: 0.5,
      source: new TileWMS({
        params: {
          LAYERS: 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
          FORMAT: 'image/jpeg'
        },
        url: '//wms.geo.admin.ch/'
      })
    })
  ];

  constructor() {
  }

}
