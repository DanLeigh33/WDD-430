import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact[];
   maxDocumentId: number;

   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new EventEmitter<Contact[]>();

   contactListChangedEvent = new Subject<Contact[]>();

   constructor() {
      this.contacts = MOCKCONTACTS;
      this.maxDocumentId = this.getMaxId();
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

   deleteContact(contact: Contact) {
      if (!contact) {
         return;
        }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
        }
      this.contacts.splice(pos, 1);
      this.contactChangedEvent.emit(this.contacts.slice());
     }

   getMaxId(): number {

      var maxId = 0;

      for (var i= 0; i < this.contacts.length; i++) {
         var currentId = parseInt(this.contacts[i].id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }
      return maxId
}

   addContact(newContact: Contact) {
      if (!newContact) {
         return
      }

      this.maxDocumentId++
      newContact.id = String(this.maxDocumentId);
      this.contacts.push(newContact);

      var contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
   }

   updateContact(originalContact: Contact, newContact: Contact) {
      if (!originalContact  || !newContact) {
         return
      }

      var pos = this.contacts.indexOf(originalContact)
      if (pos < 0) {
         return
      } 

      newContact.id = originalContact.id
      this.contacts[pos] = newContact
      var contactsListClone = this.contacts.slice()
      this.contactListChangedEvent.next(contactsListClone)
   }

   
   deleteContact1(contact: Contact) {

      if (!contact) {
         return;
        }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
        }
      this.contacts.splice(pos, 1);
      var contactsListClone = this.contacts.slice()
      this.contactListChangedEvent.next(contactsListClone);

   }
}