import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
     contact: Contact;

    constructor(private contactService: ContactService,
      private route: ActivatedRoute,
      private router: Router) {

      }
    
    ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
            this.contact = this.contactService.getContact(params['id']);
        }
       )
    }

    onDelete() {
      this.contactService.deleteContact(this.contact)
      this.router.navigate(['..'], {relativeTo: this.route});
    }
}
