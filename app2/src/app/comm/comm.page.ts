/* eslint-disable id-blacklist */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '@ionic-native/contacts';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ToastController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
// import { SMS } from '@ionic-native';
@Component({
  selector: 'app-comm',
  templateUrl: './comm.page.html',
  styleUrls: ['./comm.page.scss'],
})
export class CommPage implements OnInit {
  contactNumber: void;
  contactName: string;
  telNumber='0768657944';
  telInsotitor='0761890465';

  constructor(
    private router: Router,
    // private contacts: Contacts,
    private callNumber: CallNumber,
    private sms: SMS,
    private toastCtrl: ToastController


      ) { }

      // getListOfContacts(phoneNumbers) {
      //   let mobilestring = '';
      //   phoneNumbers.forEach((number) => {
      //     if (mobilestring) {mobilestring += ' | ';}
      //     mobilestring += number.value;
      //   });
      // }

      // pickMedContact() {
      //   this.contacts.pickContact().then((contact) => {
      //     console.log('Selected contacts: ' + JSON.stringify(contact));
      //     this.contactName = contact.displayName;
      //     this.contactNumber = this.getListOfContacts(contact.phoneNumbers);
      //   });
      // }


      //apelarea unui nr din interfata grafica
    // callMed(number) {
    //   this.callNumber.callNumber(number, true)
    //   .then(res => console.log('Apelul a fost initiat', res))
    //   .catch(err => console.log('Eroare la apelare', err));
    // }


callMed() {
  this.callNumber.callNumber(this.telNumber, true);
}

      callIns() {
        this.callNumber.callNumber(this.telNumber, true);
      }

      // sendSMS(contacts: Contact)

      //trimiterea unei alerte prin sms
      // alertSMS() {
      //   this.sms.send(this.telNumber,'Alerta din aplicatia IONIC!');
      // }


      async alertSMS() {
          await this.sms.send(this.telNumber, 'Alerta din aplicatia IONIC!');

      }

  ngOnInit() {
    // this.callNumber.callNumber(this.telNumber, true);
  }

  goBack() {
    this.router.navigateByUrl('/home');
  };

  goChat() {
    this.router.navigateByUrl('/chat1');
  }

}

