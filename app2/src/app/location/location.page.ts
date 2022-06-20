/* eslint-disable guard-for-in */
import { Component, NgZone, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { doc, getFirestore } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';
import { getApp } from 'firebase/app';
import * as firebase from 'firebase/app';
import { updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit{
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: string;
  coordonates: FormBuilder;


  constructor(
    private geo: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private auth: Auth
  ) { }

  ngOnInit() {}



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

      this.saveLocationToFirebase();

      // this.getAddress(this.latitude, this.longitude);

    }).catch((e) => {
      console.log('A aparut o eroare la determinarea coordonatelor', e);
    });
  }

  saveLocationToFirebase(){
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const user = this.auth.currentUser;
    const currentUserDoc = doc(db, `users/${user.uid}`);

   updateDoc(currentUserDoc, {
    latitude: this.latitude,
    longitude: this.longitude
   });
  }

  //navigate back to home page
  goBack() {
    this.router.navigateByUrl('/home');
  }

  ///navigate to the Google Maps page
  goMap(){

  }

}
