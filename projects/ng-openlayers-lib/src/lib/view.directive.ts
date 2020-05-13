import {
  AfterViewInit, ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import View from 'ol/View';
import {Coordinate, Extent} from './models';
import {MapComponent} from './map.component';
import {ProjectionLike} from 'ol/proj';

const animateDuration = 500;

@Directive({
  selector: 'ol-map > [olView]'
})
export class ViewDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  private timerCenterId: any;
  private timerZoomId: any;
  private timerRotationId: any;
  private view: View;

  @Output() centerChange: EventEmitter<Coordinate> = new EventEmitter<Coordinate>();
  @Output() rotationChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() zoomChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() constrainRotation: boolean | number;
  @Input() constrainResolution: boolean;
  @Input() enableRotation: boolean;
  @Input() extent: Extent;
  @Input() maxResolution: number;
  @Input() minResolution: number;
  @Input() maxZoom: number;
  @Input() minZoom: number;
  @Input() multiWorld: boolean;
  @Input() resolution: number;
  @Input() resolutions: number[];
  @Input() rotation: number;
  @Input() zoom: number;
  @Input() zoomFactor: number;
  @Input() center: Coordinate;
  @Input() projection: ProjectionLike;

  constructor(protected changeDetectorRef: ChangeDetectorRef,
              protected mapComponent: MapComponent) {
    this.changeDetectorRef.detach();
  }

  ngOnInit() {
    this.view = new View(this);
    const map = this.mapComponent.getMap();
    if (map) {
      map.setView(this.view);
      map.updateSize();
    }
  }

  ngAfterViewInit() {
    const map = this.mapComponent.getMap();
    if (map) {
      // register view events
      this.view.on('change:center', this.emitCenterChange);
      this.view.on('change:resolution', this.emitZoomChange);
      this.view.on('change:rotation', this.emitRotationChange);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const properties: { [index: string]: any } = {};
    if (!this.view) {
      return;
    }

    for (const key in changes) {
      if (key === 'zoom') {
        this.view.animate({zoom: changes[key].currentValue, duration: animateDuration});
      } else if (key === 'center') {
        this.view.animate({center: changes[key].currentValue, duration: animateDuration});
      } else {
        properties[key] = changes[key].currentValue;
      }
    }
    this.view.setProperties(properties, false);
  }

  ngOnDestroy() {
    this.view.un('change:center', this.emitCenterChange);
    this.view.un('change:resolution', this.emitZoomChange);
    this.view.un('change:rotation', this.emitRotationChange);
  }

  getView(): View {
    return this.view;
  }

  // Only arrow function works with addEventListener
  private emitCenterChange = (e: any) => {
    clearTimeout(this.timerCenterId);
    this.timerCenterId = setTimeout(() => this.centerChange.emit(e.target.get(e.key)), animateDuration + 10);
  }

  private emitZoomChange = (e: any) => {
    clearTimeout(this.timerZoomId);
    this.timerZoomId = setTimeout(() => this.zoomChange.emit(this.view.getZoom()), animateDuration + 10);
  }

  private emitRotationChange = (e: any) => {
    clearTimeout(this.timerRotationId);
    this.timerRotationId = setTimeout(() => this.rotationChange.emit(e.target.get(e.key)), animateDuration + 10);
  }

}
