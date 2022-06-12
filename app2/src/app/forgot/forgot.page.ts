import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { sendPasswordResetEmail, getAuth } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { error } from 'console';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  cred: FormGroup;
  validators: FormGroup;
  // email: '';

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    // private fireAuth: AngularFireAuth,


  ) { }

  get email() {
    return this.cred.get('email');
  }

  ngOnInit() {
    this.cred = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  //try2
  async reset() {
    const loading = await this.loadingController.create();
    await loading.present();
    const userEmail = await this.auth.reset(this.cred.value);
    await loading.dismiss();

    if (this.cred) {
      this.router.navigateByUrl('/login');
      this.showAlert('Resetare cu success.', 'Un email pentru resetarea parolei a fost trimis la asresa introdusa.');
    } else {
      this.showAlert('Resetarea parolei a esuat.', 'Va rugamincercati din nou.');
    }

    // this.auth.reset(this.cred.value.email).then (
    //   async () => {
    //     const alert = await this.alertController.create({
    //       message: 'Verificati inboxul pentru resetarea parolei.',
    //       buttons:[{text:'OK', role:'cancel', handler: ()=>{
    //         this.router.navigateByUrl('login');
    //       },},],
    //     });
    //     await alert.present();
        // this.router.navigateByUrl('login');
      // },

      // eslint-disable-next-line @typescript-eslint/no-shadow
      // async error => {
    //     const errorAlert = await this.alertController.create({
    //       message:error.message,
    //       buttons:[{text:'OK', role:'cancel'}],
    //     });
    //     await errorAlert.present();
    //   }
    // );
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
  //   const user = await this.auth.forgotPass(this.credentials.value);
  //   await loading.dismiss();

  //   if (user) {
  //     this.showAlert('Email-ul pentru resetarea parolei a fost trimis.', 'Urmati instructiunile din email pentru resetarea parolei.');
  //     this.router.navigateByUrl('/login', {replaceUrl: true});
  //   } else {
  //     this.showAlert('Email-ul nu este asociat niciunui cont.', 'Va rugam, incercati din nou.');
  //   }
  // }


  recoverPass() {}

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
