import {Component, computed, effect, EventEmitter, Input, Output, signal} from '@angular/core';
import {
  circle,
  FeatureGroup,
  featureGroup,
  latLng,
  polygon,
  TileLayer,
  tileLayer,
  icon,
  Control, Polygon
} from "leaflet";
import "leaflet-draw"
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';

import {DrawEvents} from "leaflet"
// import "leaflet-draw"


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    LeafletDrawModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  drawnItems: FeatureGroup = featureGroup();

  @Input() themeLayerURL = signal<string>('')
  @Output() drawnFilter: EventEmitter<Polygon> = new EventEmitter<Polygon>()

  themeLayer = computed(() => tileLayer(this.themeLayerURL(), {
    maxZoom: 18,
    attribution: 'Swift Geoint'
  }))

  e = effect(() => {
    this.themeLayer().setUrl(this.themeLayerURL())
    console.log(this.themeLayer(), this.themeLayerURL())
  });

  googlesat: TileLayer = tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    attribution: '...',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  })

  osmBase: TileLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '...'
  })

  options = {
    layers: [this.googlesat, this.themeLayer(), this.drawnItems],
    zoom: 7,
    center: latLng(6.879966, 7.726909)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': this.osmBase,
      'Google Sat': this.googlesat
    },
    overlays: {
      'AOI': this.drawnItems,
      "NDVI": this.themeLayer(),

      // 'Big Circle': circle([46.95, -122], {radius: 5000}),
      // 'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }



  drawOptions: Control.DrawConstructorOptions = {
    draw: {
      marker: false as const,
      polyline: false as const,
      circle: false as const,
      rectangle: false as const,
      circlemarker: false as const
    },
    edit: {
      featureGroup: this.drawnItems
    }
  };

  public onDrawCreated(e: any) {
    console.log('adding')
    this.drawnItems.clearLayers()
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
    const poly:Polygon = (e as DrawEvents.Created).layer as Polygon
    this.drawnFilter.emit(poly)
  }


}
