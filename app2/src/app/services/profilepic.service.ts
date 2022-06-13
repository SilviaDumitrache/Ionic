import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';



@Injectable({
  providedIn: 'root',
})
export class ProfilepicService {
  firstName: string;
  lastName: string;
  tel: number;
  address: string;


  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
  ) { }

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, {idField: 'id'});
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
      });
      return true;
    } catch(e) {
      return null;
    }
  }



  //function to upload first Name
  // async updateFirstName() {
  //   const user = this.auth.currentUser;
  //   const userDocRef = doc(this.firestore, `users/${user.uid}`);

  //   if (user) {
  //     return (await this.auth.)
  //   }

  // }

  // this.updateProfileForm = new FormGroup({
  //   'firstName': new FormControl(this.contact.firstName, Validators.required),
  //   'lastName': new FormControl(this.contact.lastName, Validators.required),
  //   'email': new FormControl(this.contact.email),
  //   'phone': new FormControl(this.contact.phone, Validators.required),
  //   'category': new FormControl(this.contact.category, Validators.required)
  // });
}
