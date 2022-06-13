import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { error } from 'console';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut, getAuth, ActionCodeSettings } from 'firebase/auth';
// import * as firebase from 'firebase';

export interface User{
  firstName: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

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

  async reset({email}) {
      try {
        const user = await sendPasswordResetEmail(this.auth, email);
        return user;
      } catch (e) {
        return null;
      }
    };


  //function to sign out from the application
  logout() {
    return signOut(this.auth);
  }

  setUser(user: User){
    return this.user = user;
  }

  getUserUid(): string{
    return this.user.uid;
  }
}
