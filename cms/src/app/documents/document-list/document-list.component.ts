import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  private subscription: Subscription;
  
  constructor(private docService: DocumentService) {

  }

  ngOnInit(): void {
    this.docService.getDocuments();

    this.docService.documentChangedEvent.subscribe(
      (doc: Document[]) => {
        this.documents = doc;
      }
    )

    this.subscription = this.docService.documentListChangedEvent.subscribe(
    (documentList: Document[]) => {
      this.documents = documentList;
    }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
