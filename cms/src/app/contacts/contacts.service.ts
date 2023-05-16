import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact[];

   contactSelectedEvent = new EventEmitter<Contact>();

   constructor() {
      this.contacts = MOCKCONTACTS;
   }

   getContacts() {
    return this.contacts.slice();
   }

   getContact(id: string): Contact {

   for (var i = 0; i < this.contacts.length; i++) {
    if (id == this.contacts[i].id) {
        return this.contacts[i]
    }
   }
    return null;
   }
}