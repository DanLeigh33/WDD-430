import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit{
  selectedContact: Contact;

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        console.log('here');
        this.selectedContact = contact;
      }
    );
  }
}
