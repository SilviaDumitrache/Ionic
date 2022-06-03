import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  //function to register a new user in the database
  async register({email, password}) {
    try {
          const user = await createUserWithEmailAndPassword(this.auth, email, password);
          return user;
        } catch (e) {
          return null;
        }}

  //function to login a user, if the credential are inserted in the database
  async login({email, password}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  };

  //function to sign out from the application
  logout() {
    return signOut(this.auth);
  }

  //function to change the password
  // async changePass(email) {
  //   try {
  //   } catch (e){
  //     return null;
  //   }
  // }
}