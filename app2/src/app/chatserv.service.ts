import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
// import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Storage, ref, getDownloadURL, uploadString } from '@angular/fire/storage';
import { map, switchMap } from 'rxjs/operators';
// import type firebase from 'firebase';
import 'firebase/firestore';
import { Database } from '@angular/fire/database';
import { getFirestore, collection, FieldValue } from 'firebase/firestore';
import { initializeApp, getApp } from 'firebase/app';


export interface User {
  uid: string;
  email: string;
}

export interface Message {
  // createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ChatservService {
  currentUser: User = null;
  firebase: any;

  constructor(
    private auth: Auth,
    private firestore: Firestore      ) {
        this.auth.onAuthStateChanged(user => {
          console.log('Changed: ', user);
          this.currentUser = user;
        });
      }

      addChatMessage(msg) {
        const firebaseApp = getApp();
        const db = getFirestore(firebaseApp);
        const user = this.auth.currentUser;

        return this.firebase.firestore().collection('messages').add({
          msg,
          from: this.currentUser.uid,
          createdAt: this.firebase.serverTimestamp()
        });

}

getChatMessages() {
  let users = [];
  return this.getUsers().pipe(
    switchMap(res => {
      users = res;
      return this.firebase.firestore().collection('messages').valueChanges({ idField: 'id' }) as Observable<Message[]>;
    }),
    map(messages => {
      // Get the real name for each user
      for (const m of messages) {
        m.fromName = this.getUserForMsg(m.from, users);
        m.myMsg = this.currentUser.uid === m.from;
      }
      console.log('toate mesajele: ', messages);
      return messages;
    })
  );
}

private getUsers() {
  return this.firebase.firestore().collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
}

private getUserForMsg(msgFromId, users: User[]): string {
  for (const usr of users) {
    if (usr.uid === msgFromId) {
      return usr.email;
    }
  }
  return 'Deleted';
}
}
