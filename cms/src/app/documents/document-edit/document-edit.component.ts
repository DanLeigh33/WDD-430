import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../documents.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;


    
constructor(
  private documentService: DocumentService,
  private router: Router,
  private route: ActivatedRoute) {

}

ngOnInit(): void {
  var id: string;
  this.route.params.subscribe (
    (params: Params) => {
       id = params['id']
       if (!id){
          this.editMode = false;
          return
      }
       this.originalDocument = this.documentService.getDocument(id)
  
       if (!this.originalDocument){
          return
       }
       this.editMode = true;
       this.document = JSON.parse(JSON.stringify(this.originalDocument))
  }) 
}

onSubmit(form: NgForm){
  let value = form.value // get values from form’s fields
  let  newDocument = new Document(value.id, value.name, value.description, value.url, value.group)
   if (this.editMode == true) {
    this.documentService.updateDocument(this.originalDocument, newDocument)
   }
   else{
    this.documentService.addDocument(newDocument)
   }

   this.router.navigate(['/documents']);
  }

onCancel() {
  this.router.navigate(['/documents']);
  }
}
