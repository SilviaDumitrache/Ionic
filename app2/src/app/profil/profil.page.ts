import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { ProfilService } from '../services/profil.service';

import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ProfilepicService } from '../services/profilepic.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit{
  profile = null;
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
    private auth: Auth,
    private loadingController: LoadingController,
    private profilepicService: ProfilepicService,
    private alertController: AlertController

    )
    {
    //   this.profileService.getuserInfo().subscribe((data) => {
    //   this.profile = data;
    // });



   }

   get firstName() {
    return this.credentials.get('firstName');
  }

  get lastName() {
    return this.credentials.get('lastName');
  }

  get age() {
    return this.credentials.get('age');
  }

  get address() {
    return this.credentials.get('address');
  }

  get tel() {
    return this.credentials.get('tel');
  }

  // get imageUrl() {
  //   return this.credentials.get('imageUrl');
  // }

  ngOnInit() {
    this.credentials = this.fb.group({
      firstName: ['', Validators.required, Validators.maxLength(15)],
      lastName: ['', Validators.required, Validators.maxLength(15)],
      age: ['', Validators.required, Validators.minLength(2)],
      address: ['', Validators.required, Validators.maxLength(25)],
      tel: ['', Validators.required, Validators.maxLength(10)],
      // imageUrl: ['']
    });
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

  //function to upload profile data to firebase
  async addData(): Promise<void> {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const user = this.auth.currentUser;
    const currentUserDoc = doc(db, `users/${user.uid}`);
    // const path = 'uploads/'

    // const profileCollection = collection(db, `users/${user.uid}/profil`);
    // `users/${user.uid}`

    updateDoc(currentUserDoc, this.credentials.value);
    console.log(this.credentials.value);
    const alert = await this.alertCtrl.create({
          header: 'Operatiune incheiata.',
          message: 'Profilul a fost modificat cu success.',
          buttons: ['OK'],
        });

  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, //set to photos, but can be changed to Camera/Prompt
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.profilepicService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Incarcarea imaginii a esuat',
          message: 'A aparut o problema in timpul incarcarii imaginii.',
          buttons: ['OK'],
        });
        await alert.present();

      }
    }
  }

}
