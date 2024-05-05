import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-65.3049935, -26.832835);

ngAfterViewInit(): void {

  if ( !this.divMap ) throw 'El elemento divMap no esta definido';

  this.map = new Map({
    container: this.divMap.nativeElement, // element container
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.lngLat, // starting position [lng, lat]
    zoom: this.zoom, // starting zoom
  });

  const marker = new Marker({
    color: 'red',
  })
  .setLngLat( this.lngLat)
  .addTo(this.map);

}

}
