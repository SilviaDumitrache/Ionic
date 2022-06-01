import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToLogin(){
    this.router.navigate(['login'])
  }
}
