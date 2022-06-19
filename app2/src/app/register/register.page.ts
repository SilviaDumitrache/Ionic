import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;
  validators: FormGroup;
  // credentials: Payload = {
  //   id: 0,
  //   name: '',
  //   email:
  // }

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,

  ) { }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  // get firstName() {
  //   return this.credentials.get('firstName');
  // }

  // get lastName() {
  //   return this.credentials.get('lastName');
  // }


  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      // firstName: ['', [Validators.required,Validators.maxLength(20)]],
      // lastName: ['', [Validators.required,Validators.maxLength(15)]],
      // gender: ['', [Validators.required]],
    });
  }

  //register a new user
  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

  if (user) {
    // this.router.navigateByUrl('/home', {replaceUrl: true});
    // this.showAlert('Cont creat cu success', 'Mergeti la pagina de logare');
    this.router.navigateByUrl('/login', {replaceUrl: true});
    this.showAlert('Cont creat cu success', 'Mergeti la pagina de logare');
  }  else {
    // comment and un-comment for presentation
    this.showAlert('Crearea unui nou cont a esuat.', 'Va rugam, incercati din nou.');
  }
  }

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
