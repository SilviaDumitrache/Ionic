import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  validators: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController,

  ) { }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }

  // async register() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();
  //   const user = await this.authService.register(this.credentials.value);
  //   await loading.dismiss();

  // if (user) {
  //   this.router.navigateByUrl('/home', {replaceUrl: true});
  // }  else {
  //   this.showAlert('Crearea unui nou cont a esuat.', 'Va rugam, incercati din nou.');
  // }
  // }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

  if (user) {
    this.router.navigateByUrl('/home', {replaceUrl: true});
  }  else {
    this.showAlert('Logarea a esuat.', 'Va rugam, incercati din nou.');
  }}

  async showAlert(header, message) {
    const alert = await this.alertController.create ({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async goToRegisterPage() {
    this.router.navigateByUrl('/register');
  };

  async goToForgotPage() {
    this.router.navigateByUrl('/forgot');
  };

}
