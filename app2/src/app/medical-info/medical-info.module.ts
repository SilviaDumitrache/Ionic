import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalInfoPageRoutingModule } from './medical-info-routing.module';

import { MedicalInfoPage } from './medical-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MedicalInfoPage]
})
export class MedicalInfoPageModule {}
