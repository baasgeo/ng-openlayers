import {Component, ViewChild} from '@angular/core';
import {defaultLayers, OverlayComponent} from 'ng-openlayers-lib';
import {inAndOut} from 'ol/easing';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html'
})
export class EventsComponent {

    @ViewChild(OverlayComponent) overlay: OverlayComponent;

    panIntoViewOptions = {margin: 20, animation: {duration: 1000, easing: inAndOut}};

    map = {
        center: [0, 0],
        zoom: 2,
        rotation: 0,
        layers: defaultLayers()
    };

    messages = [];
    popupCoordinate;

    logEvent(event) {
        this.popupCoordinate = event.coordinate;
        if (this.overlay) {
            this.overlay.panIntoView(this.panIntoViewOptions);
        }

        this.messages.push(JSON.stringify(event, (key, val) => {
            if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
                return Object.keys(val);
            } else {
                return val;
            }
        }));
    }

}
