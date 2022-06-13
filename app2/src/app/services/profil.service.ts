import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, getDownloadURL, uploadString } from '@angular/fire/storage';
import { stringify } from 'querystring';
import { initializeApp } from 'firebase/app';

export class INFO {
  firstName: string;
  lastName: string;
  varsta: string;
  adresa: string;
  tel: string;
  // locatie: GeoPoint; pt googlemaps
}

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(
    private router: Router,
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth
  ) { }

  // create(info: INFO) {
  //   return this.firestore.collection('pacienti').add(info);
  // }

  getuserInfo(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, {idField: 'id'});
  }

  async uploadInfo(firstName: string) {
    const user= this.auth.currentUser;
    const path = `uploads/${user.uid}/UserInfo`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, firstName, 'raw');
      const firstN = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        firstName,
      });
return true;
    } catch (e) {
      return null;
    }
  }
}
