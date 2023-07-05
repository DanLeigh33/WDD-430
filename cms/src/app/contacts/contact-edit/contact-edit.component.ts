import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contacts.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit{
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  invalid: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe (
      (params: Params) => {
        id = params['id'];
        if (!id) {
          this.editMode = false;
          return
         }

        this.originalContact = this.contactService.getDetailContact(id);

        if (!this.originalContact){
          return
        }
        
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
      
        
        if (this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
    }) 
  }

  onSubmit(form: NgForm){
    let value = form.value // get values from form’s fields
    let  newContact = new Contact('01', value.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts)
    if (this.editMode == true) {
     this.contactService.updateContact(this.originalContact, newContact);
     this.editMode = false;
    }
    else{
     this.contactService.addContact(newContact)
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
    this.editMode = false;
  }

  
  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      this.invalid = true;
      return;
      
    }
    this.invalid = false;
    this.groupContacts.push(selectedContact);
  }

  
  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
  }

  
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
       return;
    }
    this.groupContacts.splice(index, 1);
  }


}