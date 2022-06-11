import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { sendPasswordResetEmail, getAuth } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  credentials: FormGroup;
  validators: FormGroup;
  email: '';

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    // private authService: AuthService,
    private router: Router,
    // private fireAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private auth: AuthService,
  ) { }

  // get email() {
  //   return this.credentials.get('email');
  // }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

//   async openLoader() {
//     const loading = await this.loadingController.create({
//       message: 'Please Wait ...',
//       duration: 2000
//     });
//     await loading.present();
//   }
//   async closeLoading() {
//     return await this.loadingController.dismiss();
//   }

//   recover() {
//     this.auth.
//     // sendPasswordResetEmail(this.email)
// .then(data => {
//         console.log(data);
//         // this.presentToast('Password reset email sent',  'bottom', 1000); // this is toastController
//         this.router.navigateByUrl('/login');
//       })
//       .catch(err => {
//         console.log(` failed ${err}`);
//         // this.error = err.message;
//       });
//   }

  // async presentToast(message, position, duration) {
  //   const toast = await this.toastCtrl.create({
  //     message,
  //     duration,
  //     position
  //   });
  //   toast.present();
  // }

  // async recoverPass(){
  //   const loading = await this.loadingController.create();
  //   await loading.present();
  //   const user = await this.auth.forgotPass(this.email);
  //   await loading.dismiss();

  //   if (this.user) {
  //     this.showAlert('Email-ul pentru resetarea parolei a fost trimis.', 'Urmati instructiunile din email pentru resetarea parolei.');
  //   } else {
  //     this.showAlert('Email-ul nu este asociat niciunui cont.', 'Va rugam, incercati din nou.');
  //   }
  // }

  async showAlert(header, message) {
    const alert = await this.alertController.create ({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.router.navigateByUrl('/login');
  };
}
