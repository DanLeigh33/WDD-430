import {EventEmitter, Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
   documents: Document[];
   maxDocumentId: number;

   selectedDocumentEvent = new EventEmitter<Document>();
   documentChangedEvent = new EventEmitter<Document[]>();
   documentListChangedEvent = new Subject<Document[]>();


   constructor() {
      this.documents = MOCKDOCUMENTS;
      this.maxDocumentId = this.getMaxId();
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

   deleteDocument(document: Document) {
      if (!document) {
         return;
        }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
         return;
        }
      this.documents.splice(pos, 1);
      this.documentChangedEvent.emit(this.documents.slice());
     }

     
   getMaxId(): number {

      var maxId = 0;

      for (var i= 0; i < this.documents.length; i++) {
         var currentId = parseInt(this.documents[i].id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }
      return maxId
}

   addDocument(newDocument: Document) {

      if (!newDocument) {
         return;
      }

      this.maxDocumentId++
      newDocument.id = String(this.maxDocumentId);
      this.documents.push(newDocument);

      var documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
   }

   updateDocument(originalDocument: Document, newDocument: Document) {
      if (!originalDocument  || !newDocument) {
         return
      }

      var pos = this.documents.indexOf(originalDocument)
      if (pos < 0) {
         return
      } 

      newDocument.id = originalDocument.id
      this.documents[pos] = newDocument
      var documentsListClone = this.documents.slice()
      this.documentListChangedEvent.next(documentsListClone)
   }

   
   deleteDocument1(document: Document) {

      if (!document) {
         return;
        }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
         return;
        }
      this.documents.splice(pos, 1);
      var documentsListClone = this.documents.slice()
      this.documentListChangedEvent.next(documentsListClone);

   }


}