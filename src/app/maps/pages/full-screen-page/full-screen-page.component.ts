import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

@ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento divMap no esta definido';

    const map = new Map({
      container: this.divMap.nativeElement, // element container
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-65.3049935, -26.832835], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
