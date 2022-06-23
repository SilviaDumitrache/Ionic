import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommPage } from './comm.page';

const routes: Routes = [
  {
    path: '',
    component: CommPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommPageRoutingModule {}
