import {Component} from '@angular/core';
import {defaultLayers} from 'ng-openlayers-lib';

@Component({
  selector: 'app-osm-with-controls',
  templateUrl: './osm-with-controls.component.html'
})
export class OsmWithControlsComponent {

  controls = [
    {name: 'attribution', checked: false},
    {name: 'fullscreen', checked: true},
    {name: 'mouseposition'},
    {name: 'rotate'},
    {name: 'zoom', checked: true},
    {name: 'scaleline'},
    {name: 'zoom'},
    {name: 'zoomslider'},
    {name: 'zoomsliderError'},
    {name: 'zoomtoextent', checked: true}
  ];

  map = {
    center: [-10997148, 4569099],
    zoom: 4,
    rotation: 0,
    maxZoom: 10,
    minZoom: 2,
    layers: defaultLayers()
  };

  mapControls = [];

  constructor() {
    this.mapControls = this.controls.filter(control => control.checked);
  }

  btnSwitchCenter() {
    this.map.center.includes(0) ? this.map.center = [828862.6645485563, 5933916.615134273] : this.map.center = [0, 0];
  }

  btnZoomIn() {
    ++this.map.zoom;
  }

  bthZoomOut() {
    --this.map.zoom;
  }

  updateControls() {
    setTimeout(() => this.mapControls = this.controls.filter(control => control.checked));
  }
}
