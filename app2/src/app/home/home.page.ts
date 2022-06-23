import { Component, OnInit } from '@angular/core';
import { ProfilepicService } from '../services/profilepic.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as firebase from 'firebase/app';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getFirestore} from '@angular/fire/firestore';
import { onSnapshot, where, query, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  profile = null;
  userinf = null;
  isMed = true; //declaram mai intai variabila isMed ca false

  constructor(
    private profilepicService: ProfilepicService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: Auth,
    private firestore: Firestore


  ) {
    this.profilepicService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });

  }

  ngOnInit() {
    // const user = this.auth.currentUser;

    // if (user) {

    // }

      // firebase.auth.onAuthStateChanged(user => {
      //   if (user) {
      //     this.firestore.collection('users').orderBy('isMed')
      //     .then(userProfileSnapshot => {
      //       this.isMed = userProfileSnapshot.data().isMed;
      //     });
      //   }
      // });
  }

  // this.ProfilepicService.getUserInfo().subscribe((data) =>{
  //   this.info = userinf;
  // })

  //logout function
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }



  goSmartMed(){

  }

  goComm(){
    this.router.navigateByUrl('/comm');

  }

  goChat(){
    this.router.navigateByUrl('chat');
  }

  // goProfilMed(){
  // }

  // goProfil(){
  //   this.router.navigateByUrl('profil');
  // }

  async goProfileMed() {
    this.router.navigateByUrl('/medical-info');
  };

  goLocatie() {
    this.router.navigateByUrl('/location');
  }

  async checkMed() {
    const user = this.auth.currentUser;

    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);

    if(user){
      const q = query(collection(db, 'users'), where ('isMed', '==', true));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    }

  }

  goSecret(){
    this.router.navigateByUrl('/secret');
  }

}
