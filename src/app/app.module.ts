import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NgOpenlayersModule} from 'ng-openlayers-lib';
import {CustomLoaderComponent} from './custom-loader/custom-loader.component';
import {Epsg21781Component} from './epsg21781/epsg21781.component';
import {OsmWithControlsComponent} from './osm-with-controls/osm-with-controls.component';
import {LayersControlComponent} from './layers-control/layers-control.component';
import {EventsComponent} from './events/events.component';
import {Epsg28992Component} from './epsg28992/epsg28992.component';
import {SimpleComponent} from './simple/simple.component';
import {GeojsonComponent} from './geojson/geojson.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'simple',
        pathMatch: 'full',
    },
    {
        path: 'simple',
        component: SimpleComponent
    },
    {
        path: 'controls',
        component: OsmWithControlsComponent
    },
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'geojson',
        component: GeojsonComponent
    },
    {
        path: 'epsg21781',
        component: Epsg21781Component
    },
    {
        path: 'epsg28992',
        component: Epsg28992Component
    },
    {
        path: 'layers-control',
        component: LayersControlComponent
    },
    {
        path: 'custom-loader',
        component: CustomLoaderComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        CustomLoaderComponent,
        Epsg21781Component,
        Epsg28992Component,
        EventsComponent,
        GeojsonComponent,
        OsmWithControlsComponent,
        LayersControlComponent,
        SimpleComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        NgOpenlayersModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
