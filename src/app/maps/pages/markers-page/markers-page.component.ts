import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { CommonModule } from '@angular/common';

interface MarkerColor {
  color: string;
  marker?: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerColor[] = [];
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

    this.readFromLocalStorage();
  }

  createMarker() {

    if (! this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color: string = 'red') {

    if (! this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat( lngLat )
    .addTo(this.map);

    this.markers.push( { color, marker } );

    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker( i: number ) {

    this.markers[i].marker?.remove();
    this.markers.splice(i, 1);

  }

  flyTo( marker: Marker ) {

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });

  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {

      return {
        color: color,
        lngLat: marker!.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color,  lngLat}) => {

      const [lng, lat] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );
    });

  }


}
