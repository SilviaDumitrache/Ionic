import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { error } from 'console';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut, getAuth, ActionCodeSettings } from 'firebase/auth';
// import * as firebase from 'firebase';


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

  // async resetPass(email) {
  //   const user = await sendPasswordResetEmail(this.auth, email)
  //   .then( () => {
  //     //password reset email is sent
  //   })
  //   // eslint-disable-next-line @typescript-eslint/no-shadow
  //   .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       //sth
  //   });
  // }

  //reset password function
  // forgotPass(email: string): Promise<void> {
    // try {
    //   const user = sendPasswordResetEmail(this.auth, email);
    //   return user;
    // } catch (e) {
    //   return null;
    // }

    // return this.auth.sendPasswordResetEmail(email);

    // return sendPasswordResetEmail(this.auth, 'user@example.com', actionCodeSettings);

}
