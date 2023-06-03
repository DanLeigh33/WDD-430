import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],

})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private subscription: Subscription;

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    
    this.contactService.contactChangedEvent.subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    )

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contact: Contact[]) => {
        this.contacts = contact
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
