import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { doc, Firestore, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ProfilepicService } from '../services/profilepic.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { getApp } from 'firebase/app';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.page.html',
  styleUrls: ['./medical-info.page.scss'],
})
export class MedicalInfoPage implements OnInit {
  profile = null;
  infoMed: FormGroup;
  validators: FormGroup;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private auth: Auth,
    private loadingController: LoadingController,
    private profilepicService: ProfilepicService,

  ) { }

  get afectiuniParinti() {
    return this.infoMed.get('afectiuniParinti');
  }

  get afectiuniFrati() {
    return this.infoMed.get('afectiuniFrati');
  }

  get afectiuniProprii() {
    return this.infoMed.get('afectiuniProprii');
  }

  get deCatTimp() {
    return this.infoMed.get('deCatTimp');
  }

  get mediuToxic() {
    return this.infoMed.get('mediuToxic');
  }

  get consumAlcool() {
    return this.infoMed.get('consumAlcool');
  }

  get consumTutun() {
    return this.infoMed.get('consumTutun');
  }

  get alergiiAlimentare() {
    return this.infoMed.get('alergiiAlimentare');
  }

  get alergiiMedicamentoase() {
    return this.infoMed.get('alergiiMedicamentoase');
  }


  ngOnInit() {
    this.infoMed = this.fb.group({
      //antecedente hetero-colaterale
      afectiuniParinti: ['', Validators.required, Validators.maxLength(30)],
      afectiuniFrati: ['', Validators.required, Validators.maxLength(30)],

      //antecedente personale patologice
      afectiuniProprii: ['', Validators.required, Validators.maxLength(30)],
      deCatTimp: ['', Validators.required, Validators.maxLength(2)],

      //conditii de viata
      mediuToxic: ['', Validators.required],

      //comportament
      consumAlcool: ['', Validators.required],
      consumTutun: ['', Validators.required],

      //alergii
      alergiiAlimentare: ['', Validators.required, Validators.maxLength(30)],
      alergiiMedicamentoase: ['', Validators.required, Validators.maxLength(30)],

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

  //functia care incarca in Firebase informatiile medicale introduse de utilizator
async addData(): Promise<void> {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);
    const user = this.auth.currentUser;
    const currentUserDoc = doc(db, `users/${user.uid}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    updateDoc(currentUserDoc, this.infoMed.value);
    console.log(this.infoMed.value);
    const alert = await this.alertCtrl.create({
          header: 'Operatiune incheiata.',
          message: 'Profilul a fost modificat cu success.',
          buttons: ['OK'],
        });
}
}
