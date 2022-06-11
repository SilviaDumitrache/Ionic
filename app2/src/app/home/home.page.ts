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

  //logout function
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
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

  goSmartMed(){

  }

  goProgramare(){

  }

  goChat(){

  }

  goProfilMed(){
  }

  // goProfil(){
  //   this.router.navigateByUrl('profil');
  // }

}
