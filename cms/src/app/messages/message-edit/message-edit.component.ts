import { Component, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'D. Vyver';

  onSendMessage() {
    const mSubject = this.subjectInputRef.nativeElement.value;
    const mMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('5', mSubject, mMsgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.msgTextInputRef.nativeElement.value = '';
    this.subjectInputRef.nativeElement.value = '';
  }
}
