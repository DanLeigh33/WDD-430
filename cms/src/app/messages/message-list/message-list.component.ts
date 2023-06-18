import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [MessageService]
})
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private messService: MessageService) {

  }

  ngOnInit(): void {
    this.messService.getMessages();
    this.messService.messageChangeEvent.subscribe(
      (message: Message[]) => {
        this.messages = message;
      }
    )
  }

  //onAddMessage(message: Message) {
    //this.messages.push(message);
    //(addMessageEvent)="onAddMessage($event)" goes in html app-message-edit
  //}


}
