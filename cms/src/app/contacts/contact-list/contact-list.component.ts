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
  term: string;

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contactService.getContacts();
  

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contact: Contact[]) => {
        this.contacts = contact
      }
    )
  }

  search(value: string) {

    this.term = value;
    
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
