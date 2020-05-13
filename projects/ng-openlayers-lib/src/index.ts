/*
 * Public API Surface of ng-openlayers
 */
import {NgModule} from '@angular/core';
import {InteractionsDirective} from './lib/interactions.directive';
import {LayerType} from './lib/models';
import {MapComponent} from './lib/map.component';
import {OverlayComponent} from './lib/overlay.component';
import {ControlsDirective} from './lib/controls.directive';
import {LayersDirective} from './lib/layers.directive';
import {ViewDirective} from './lib/view.directive';
import {MapService} from './lib/map.service';
import {ContentComponent} from './lib/content.component';
import {LayerComponent} from './lib/layer.component';

export * from './lib/util';
export {MapService} from './lib/map.service';

export {ContentComponent} from './lib/content.component';
export {ControlsDirective} from './lib/controls.directive';
export {LayersDirective} from './lib/layers.directive';
export {LayerComponent} from './lib/layer.component';
export {LayerType, SourceType} from './lib/models';
export {MapComponent} from './lib/map.component';
export {OverlayComponent} from './lib/overlay.component';
export {ViewDirective} from './lib/view.directive';

const declarations = [
  ContentComponent,
  ControlsDirective,
  LayersDirective,
  LayerComponent,
  InteractionsDirective,
  MapComponent,
  OverlayComponent,
  ViewDirective
];

@NgModule({
  imports: [],
  declarations: [...declarations],
  exports: [...declarations]
})
export class NgOpenlayersModule {
}
