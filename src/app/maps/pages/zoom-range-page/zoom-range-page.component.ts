import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit{

    @ViewChild('map') divMap?: ElementRef;

    public zoom: number = 10;
    public map?: Map;

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento divMap no esta definido';

    this.map = new Map({
      container: this.divMap.nativeElement, // element container
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-65.3049935, -26.832835], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners() {

    if ( !this.map ) throw 'El mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {

      if (this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18);
    });

  }

  zoomIn(): void {
    this.map?.zoomIn();
  }

  zoomOut(): void {
    this.map?.zoomOut();
  }

  zoomChanges(value: string): void {
    this.zoom = Number(value);

    this.map?.zoomTo( this.zoom );
  }

}
