import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { ProfilService } from '../services/profil.service';

import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';




@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit{
  profile = null;
  firstName = '';
  credentials: FormGroup;
  validators: FormGroup;


  // profile = {} as Profile;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthService,
    private profileService: ProfilService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private auth: Auth )
    {
    //   this.profileService.getuserInfo().subscribe((data) => {
    //   this.profile = data;
    // });

    this.credentials = this.fb.group({
      firstName: ['', Validators.maxLength(15)],
      lastName: ['', Validators.maxLength(15)],
      age: ['', Validators.minLength(2)],
      address: ['', Validators.maxLength(25)],
      tel: ['', Validators.maxLength(10)]
    });

   }
  ngOnInit() {

  }


  async showAlert(header, message) {
    const alert = await this.alertCtrl.create ({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();}

  goBack() {
    this.router.navigateByUrl('/home');
  };

  goToGoogleMaps() {

  }

  addData(): void {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const user = this.auth.currentUser;

    const profileCollection = collection(db, `users`);
    // `users/${user.uid}`

    addDoc(profileCollection, this.credentials.value);


    //add
  }


  // updateUsername() {
  //   this.user.updateProfile({
  //     displayName: this.username;
  //   })
  // }

  // async updateProfile() {
  //   if (user) {
  //     const loading = await this.loadingCtrl.create();
  //     await loading.present();

  //     const result = await this.profileService.uploadInfo(this.firstName);
  //     loading.dismiss();

  //     if (!result) {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Editarea numelui a esuat.',
  //         message: 'A aparut o problema in timpul editarii profilului.',
  //         buttons: ['OK'],
  //       });
  //       await alert.present();
  //     }
  //   }

  // }


}
