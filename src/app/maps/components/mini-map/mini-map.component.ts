import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})

export class MiniMapComponent {

  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?: [number, number];

  ngAfterViewInit() {

    if (!this.divMap) throw 'El elemento divMap no esta definido';

    const map = new Map({
      container: this.divMap.nativeElement, // element container
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat || [0, 0], // starting position [lng, lat] with default value
      zoom: 13, // starting zoom
      interactive: false // disable zoom and move
    });

    if (this.lngLat) {
      new Marker()
        .setLngLat(this.lngLat)
        .addTo(map);
    }

  }


}
