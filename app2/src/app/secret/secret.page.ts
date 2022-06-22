import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, query, where, getDocs } from 'firebase/firestore';


@Component({
  selector: 'app-secret',
  templateUrl: './secret.page.html',
  styleUrls: ['./secret.page.scss'],
})
export class SecretPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('home');
  }

  listPacienti() {

  }


}
