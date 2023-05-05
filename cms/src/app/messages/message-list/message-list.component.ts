import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Pizza', 'The pizza is here.', 'Bro. Jackson'),
    new Message('1', 'Pizza', 'I will be there in a minute', 'Steven Max')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }


}
