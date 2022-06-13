import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalInfoPageRoutingModule } from './medical-info-routing.module';

import { MedicalInfoPage } from './medical-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalInfoPageRoutingModule
  ],
  declarations: [MedicalInfoPage]
})
export class MedicalInfoPageModule {}
