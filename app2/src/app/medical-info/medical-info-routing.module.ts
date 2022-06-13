import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalInfoPage } from './medical-info.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalInfoPageRoutingModule {}
