import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { LoginPageModule } from './login/login.module';

//function to redirect non-authenticated users to the login page
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

//function to redirect authenticated users to the Dashboard page (home)
// const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)},

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},

  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)},

  { path: 'forgot', loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotPageModule)},

  { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilPageModule)},  {
    path: 'medical-info',
    loadChildren: () => import('./medical-info/medical-info.module').then( m => m.MedicalInfoPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'secret',
    loadChildren: () => import('./secret/secret.module').then( m => m.SecretPageModule)
  },
  {
    path: 'chat1',
    loadChildren: () => import('./chat1/chat1.module').then( m => m.Chat1PageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'comm',
    loadChildren: () => import('./comm/comm.module').then( m => m.CommPageModule)
  },



  // {
  //   path: '',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  //   // ...canActivate(redirectLoggedInToHome)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  //   // ...canActivate(redirectUnauthorizedToLogin)
  // },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  //   // ...canActivate(redirectLoggedInToHome)
  // },
  // {
  //   path: 'profil',
  //   loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  // },
  // {
  //   path: 'forgot',
  //   loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  // },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
