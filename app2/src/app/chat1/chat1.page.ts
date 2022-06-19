import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatservService, Message } from '../chatserv.service';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat1',
  templateUrl: './chat1.page.html',
  styleUrls: ['./chat1.page.scss'],
})
export class Chat1Page implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: Observable<Message[]>;
  newMsg = '';

  constructor(
    private chatser: ChatservService,
    private router: Router
  ) { }

  ngOnInit() {
    this.messages = this.chatser.getChatMessages();
  }

  sendMessage() {
    this.chatser.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

}
