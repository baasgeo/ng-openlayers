import {Component} from '@angular/core';
import {defaultLayers} from 'ng-openlayers-lib';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html'
})
export class EventsComponent {
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

        this.messages.push(JSON.stringify(event, (key, val) => {
            if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
                return Object.keys(val);
            } else {
                return val;
            }
        }));
    }

}
