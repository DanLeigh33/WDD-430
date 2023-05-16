import {EventEmitter, Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
   documents: Document[];
   selectedDocumentEvent = new EventEmitter<Document>();

   constructor() {
      this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
    return this.documents.slice();
   }

   getDocument(id: string) {
    for (var i = 0; i < this.documents.length; i++) {
        if (id == this.documents[i].id) {
            return this.documents[i]
        }
       }
        return null;
       }


}