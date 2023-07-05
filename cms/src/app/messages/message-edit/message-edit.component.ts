import { Component, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  currentSender = '19';

  constructor(private messService: MessageService) {
    
  }

  onSendMessage() {
    const mSubject = this.subjectInputRef.nativeElement.value;
    const mMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('6', mSubject, mMsgText, this.currentSender);
    this.messService.addMessage(newMessage);
  }

  onClear() {
    this.msgTextInputRef.nativeElement.value = '';
    this.subjectInputRef.nativeElement.value = '';
  }
}
