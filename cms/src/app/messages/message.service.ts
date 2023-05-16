import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { Message } from "./message.model";
import {EventEmitter} from "@angular/core";

export class MessageService {
    messages: Message[];
    messageChangeEvent = new EventEmitter<Message[]>();

    constructor() {
        this.messages = MOCKMESSAGES
    }

    getMessages() {
        return this.messages.slice();
       }
    
    getMessage(id: string) {
        for (var i = 0; i < this.messages.length; i++) {
            if (id == this.messages[i].id) {
                return this.messages[i]
            }
           }
            return null;
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.messageChangeEvent.emit(this.messages.slice());
    }
    

}