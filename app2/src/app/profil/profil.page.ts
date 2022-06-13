import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('/home');
  };

  goToGoogleMaps() {}


  // updateUsername() {
  //   this.user.updateProfile({
  //     displayName: this.username;
  //   })
  // }
}
