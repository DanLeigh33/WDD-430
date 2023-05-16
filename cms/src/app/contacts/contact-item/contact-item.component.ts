import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],

})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    
  }

  onSelected() {
    this.contactService.contactSelectedEvent.emit(this.contact);
  }
}
