import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact[] =[];
   maxDocumentId: number;

   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new EventEmitter<Contact[]>();

   contactListChangedEvent = new Subject<Contact[]>();

   constructor(private http: HttpClient) {
      this.maxDocumentId = this.getMaxId();
   }

   getContacts() {
      this.http.get('https://cmswfs-63f40-default-rtdb.firebaseio.com/contacts.json').subscribe(
         // success method
         (contacts: Contact[] ) => {
            this.contacts = contacts;
            this.maxDocumentId = this.getMaxId()
            this.contacts.sort()
            console.log(this.contacts)
            this.contactListChangedEvent.next(this.contacts.slice())
         },
            // error method
         (error: any) => {
            console.log(error)
       })
   }

   storeContacts(contacts: Contact[]) {
      let stringCon = JSON.stringify(contacts)
      this.http.put('https://cmswfs-63f40-default-rtdb.firebaseio.com/contacts.json', stringCon,
      {
         headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
      .subscribe(response => {
         console.log(response)
         this.contactListChangedEvent.next(this.contacts.slice())
      })
   }

   getContact(id: string): Contact {
      console.log(this.contacts.length)
      for (var i = 0; i < this.contacts.length; i++) {
      if (id == this.contacts[i].id) {
        return this.contacts[i]
      }
      }
    return null;
   }

   getMaxId(): number {

      var maxId = 0;

      for (var i= 0; i < this.contacts.length; i++) {
         var currentId = parseInt(this.contacts[i].id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }
      return maxId;
}

   addContact(newContact: Contact) {
      console.log('add contact called');
      if (!newContact) {
         return
      }

      this.maxDocumentId++
      newContact.id = String(this.maxDocumentId);
      this.contacts.push(newContact);
      console.log(this.contacts);

      this.storeContacts(this.contacts);
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
      this.storeContacts(this.contacts);
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
      this.storeContacts(this.contacts);

   }
}