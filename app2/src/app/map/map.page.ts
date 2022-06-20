import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Coordinates } from '@ionic-native/geolocation';
// import {} from 'googlemaps';
// import {googlemaps} from 'googlemaps';
import { google } from 'google-maps';
import { LocationPageModule } from '../location/location.module';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('gmap', {static:true}) gmapElement: any;
  map: google.maps.Map;
  notification$;
  google: google;

  constructor(
    private router: Router,
    // private google: google
  ) { this.loadMap(); }

  ngOnInit() {

  }

  async loadMap() {
    const currentCoords =await this.getCurrentLocation();
    console.log('user current location', currentCoords);
    const mapProp= {
      center: new google.maps.LatLng(
        currentCoords.latitude,
        currentCoords.longitude
      ),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      MapTypeControl: false
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  getCurrentLocation(): Promise<Coordinates> {
    return new Promise(resolve=>
      navigator.geolocation.getCurrentPosition(success => resolve(success.coords))
      );
  }

  goBack() {
    this.router.navigateByUrl('/location');
  }

}
