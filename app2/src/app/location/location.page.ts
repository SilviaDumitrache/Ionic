/* eslint-disable guard-for-in */
import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage{
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: string;


  constructor(
    private geo: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router
  ) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  options = {
    timeout: 10000,
    enableHighAccurancy: true,
    maximumAge: 3600
  };

  //preluarea coordonatelor utilizatorului de la dispozitivul pe care ruleaza aplicatia
  getCoords() {
    this.geo.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      // this.getAddress(this.latitude, this.longitude);
    }).catch((e) => {
      console.log('A aparut o eroare la determinarea coordonatelor', e);
    });
  }

  //optiuni pentru geocoder
  // eslint-disable-next-line @typescript-eslint/member-ordering
  // nativeGeocoderOptions: NativeGeocoderOptions = {
  //   useLocale: true,
  //   maxResults: 5
  // };

  //functie pentru obtinerea adresei, pe baza coordonatelor de latitudine si longitudine
  // getAddress(lat, long) {
  //   this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
  //   .then((res: NativeGeocoderResult[]) => {
  //     this.address = this.pretifyAddress(res[0]);
  //   })
  //   .catch((error: any) => {
  //     alert('Eroare la obtinerea coordonatelor' + JSON.stringify(error));
  //   });
  // }

  // pretifyAddress(address){
    // eslint-disable-next-line prefer-const
    // let obj = [];
    // let data ='';
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line prefer-const
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line prefer-const
    // for (let key in address) {
    //   obj.push(address[key]);
    // }
    // obj.reverse();
    // eslint-disable-next-line prefer-const
  //   for (let val in obj) {
  //     if(obj[val].length)
  //     {data += obj[val]+', ';}
  //   }
  //   return address.slice(0, -2);
  // }


  // ngOnInit() {
  // }

  goBack() {
    this.router.navigateByUrl('/home');
  }

}
