import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { Message } from "./message.model";
import {EventEmitter, Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messages: Message[] = [];
    maxMessagesId: number;

    messageChangeEvent = new EventEmitter<Message[]>();

    constructor(private http: HttpClient) {
        this.maxMessagesId = this.getMaxId();
    }

    getMessages() {
         this.http.get('https://cmswfs-63f40-default-rtdb.firebaseio.com/messages.json').subscribe(
         // success method
         (messages: Message[] ) => {
            this.messages = messages;
            this.maxMessagesId = this.getMaxId()
            this.messages.sort()
            this.messageChangeEvent.emit(this.messages.slice())
         },
            // error method
         (error: any) => {
            console.log(error)
       })
       }

    storeMessages(messages: Message[]) {
        let stringMes = JSON.stringify(messages)
        this.http.put('https://cmswfs-63f40-default-rtdb.firebaseio.com/messages.json', stringMes,
        {
           headers: new HttpHeaders({'Content-Type': 'application/json'})
        })
        .subscribe(response => {
           console.log(response)
           this.messageChangeEvent.emit(this.messages.slice())
        })
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
        this.storeMessages(this.messages);
    }

    getMaxId(): number {

        var maxId = 0;
  
        for (var i= 0; i < this.messages.length; i++) {
           var currentId = parseInt(this.messages[i].id);
           if (currentId > maxId) {
              maxId = currentId;
           }
        }
        return maxId
  }
    

}