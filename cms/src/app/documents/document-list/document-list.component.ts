import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[];
  
  constructor(private docService: DocumentService) {

  }

  ngOnInit(): void {
    this.documents = this.docService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.docService.selectedDocumentEvent.emit(document);
  }
}
