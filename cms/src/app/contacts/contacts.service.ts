import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
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
      this.http.get('http://localhost:3000/contacts').subscribe(
         // success method
         (contacts: Contact[] ) => {
            this.contacts = contacts['contacts'];
            this.maxDocumentId = this.getMaxId()
            this.contacts.sort()
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

      for (var i = 0; i < this.contacts.length; i++) {
      if (id == this.contacts[i]._id) {
        return this.contacts[i]
      }
      }
    return null;
   }

   getDetailContact(id: string): Contact {

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

addContact(contact: Contact) {
   if (!contact) {
    return;
   }

  
   contact.id = '';

   const headers = new HttpHeaders({'Content-Type': 'application/json'});

   // add to database
   this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
   contact,
   { headers: headers })
   .subscribe(
      (responseData) => {
        
         this.contacts.push(responseData.contact);
         this.contacts.sort()
         this.contactListChangedEvent.next(this.contacts.slice())
    }
  );
}


updateContact(originalContact: Contact, newContact: Contact) {
if (!originalContact || !newContact) {
  return;
}

const pos = this.contacts.findIndex(d => d.id === originalContact.id);

if (pos < 0) {
  return;
}

// set the id of the new Document to the id of the old Document
newContact.id = originalContact.id;
newContact._id = originalContact._id;

const headers = new HttpHeaders({'Content-Type': 'application/json'});

// update database
this.http.put('http://localhost:3000/contacts/' + originalContact.id,
  newContact, { headers: headers })
  .subscribe(
    (response: Response) => {
      this.contacts[pos] = newContact;
      this.contacts.sort()
      this.contactListChangedEvent.next(this.contacts.slice())
    }
  );
}



deleteContact(contact: Contact) {

if (!contact) {
  return;
}

const pos = this.contacts.findIndex(d => d.id === contact.id);

if (pos < 0) {
  return;
}

// delete from database
this.http.delete('http://localhost:3000/contacts/' + contact.id)
  .subscribe(
    (response: Response) => {
      this.contacts.splice(pos, 1);
      this.contacts.sort()
      this.contactListChangedEvent.next(this.contacts.slice())
    }
  );
}
}