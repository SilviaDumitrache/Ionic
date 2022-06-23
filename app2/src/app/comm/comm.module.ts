import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommPageRoutingModule } from './comm-routing.module';

import { CommPage } from './comm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommPageRoutingModule
  ],
  declarations: [CommPage]
})
export class CommPageModule {}
