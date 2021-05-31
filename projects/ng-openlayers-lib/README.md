## Installation

To install this library, run:

```bash
npm install ng-openlayers-lib --save
```

Import this library in your NgModule:
```json
imports: [
    NgOpenlayersModule
]
```

## Example

Here is a "minimal" map example that fetches tiles from OpenStreetMap and center the map:

```html
<ol-map olView
        [zoom]="4"
        [center]="[-10997148, 4569099]">
  <ol-layer></ol-layer>
</ol-map>
```

## Documentation

The API is documented in `documentation/`

## Development

To compile to module to dist output directory:

```bash
ng build --configuration production ng-openlayers-lib
cd dist/ng-openlayers-lib && npm pack
```

Live example (reload on code changes):

```bash
npm install
cd projects/ng-openlayers-lib && npm install
ng serve
```

Live example will be viewable at locahost:4200

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request and enjoy! :D

## License

Apache-2.0 - Baas geo-information, Bart Baas <info@baasgeo.com> Copyright 2017 Baasgeo
