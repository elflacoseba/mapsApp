import { AfterViewInit, Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZWxmbGFjb3NlYmEiLCJhIjoiY2x2dHRhNmRiMWMxMDJxcWloeTgwMnQzNCJ9.QP17T_yhIzQqmH0oG12V5A';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-65.3049935, -26.832835], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
