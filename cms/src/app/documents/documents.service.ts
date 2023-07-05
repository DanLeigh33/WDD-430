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
      this.http.get('http://localhost:3000/documents').subscribe(
         
         // success method
         (document: Document[] ) => {
            this.documents = document['document'];
            this.maxDocumentId = this.getMaxId()
            console.log(this.documents)
            this.documents.sort()
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

   addDocument(document: Document) {
      if (!document) {
       return;
      }

      // make sure id of the new Document is empty
      document.id = '';

      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      // add to database
      this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
         (responseData) => {
            // add new document to documents
            this.documents.push(responseData.document);
            this.documents.sort()
            this.documentListChangedEvent.next(this.documents.slice())
       }
     );
 }

   
updateDocument(originalDocument: Document, newDocument: Document) {
   if (!originalDocument || !newDocument) {
     return;
   }

   const pos = this.documents.findIndex(d => d.id === originalDocument.id);

   if (pos < 0) {
     return;
   }

   // set the id of the new Document to the id of the old Document
   newDocument.id = originalDocument.id;
   newDocument._id = originalDocument._id;

   const headers = new HttpHeaders({'Content-Type': 'application/json'});

   // update database
   this.http.put('http://localhost:3000/documents/' + originalDocument.id,
     newDocument, { headers: headers })
     .subscribe(
       (response: Response) => {
         this.documents[pos] = newDocument;
         this.documents.sort()
         this.documentListChangedEvent.next(this.documents.slice())
       }
     );
 }

   
   
deleteDocument(document: Document) {

   if (!document) {
     return;
   }

   const pos = this.documents.findIndex(d => d.id === document.id);

   if (pos < 0) {
     return;
   }

   // delete from database
   this.http.delete('http://localhost:3000/documents/' + document.id)
     .subscribe(
       (response: Response) => {
         this.documents.splice(pos, 1);
         this.documents.sort()
         this.documentListChangedEvent.next(this.documents.slice())
       }
     );
 }


}