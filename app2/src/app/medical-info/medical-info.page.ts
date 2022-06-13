import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.page.html',
  styleUrls: ['./medical-info.page.scss'],
})
export class MedicalInfoPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('/home');
  };
}
