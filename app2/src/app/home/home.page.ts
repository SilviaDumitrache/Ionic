import { Component } from '@angular/core';
import { ProfilepicService } from '../services/profilepic.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;
  userinf = null;

  constructor(
    private profilepicService: ProfilepicService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController

  ) {
    this.profilepicService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });

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

  goProgramare(){

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

}
