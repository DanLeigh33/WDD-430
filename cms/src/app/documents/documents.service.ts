import {EventEmitter, Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
   documents: Document[] = [];
   maxDocumentId: number;

   selectedDocumentEvent = new EventEmitter<Document>();
   documentChangedEvent = new EventEmitter<Document[]>();
   documentListChangedEvent = new Subject<Document[]>();


   constructor(private http: HttpClient) {
      this.maxDocumentId = this.getMaxId();
   }

   getDocuments() {
      this.http.get('https://cmswfs-63f40-default-rtdb.firebaseio.com/documents.json').subscribe(
         // success method
         (documents: Document[] ) => {
            this.documents = documents;
            this.maxDocumentId = this.getMaxId()
            this.documents.sort()
            console.log(this.documents)
            this.documentListChangedEvent.next(this.documents.slice())
         },
            // error method
         (error: any) => {
            console.log(error)
       })
   }

   storeDocuments(documents: Document[]) {
      let stringDoc = JSON.stringify(documents)
      this.http.put('https://cmswfs-63f40-default-rtdb.firebaseio.com/documents.json', stringDoc,
      {
         headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
      .subscribe(response => {
         console.log(response)
         this.documentListChangedEvent.next(this.documents.slice())
      })
   }

   getDocument(id: string) {
    for (var i = 0; i < this.documents.length; i++) {
        if (id == this.documents[i].id) {
            return this.documents[i]
        }
       }
        return null;
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

      this.storeDocuments(this.documents);
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
      this.storeDocuments(this.documents);
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
      this.storeDocuments(this.documents);

   }


}