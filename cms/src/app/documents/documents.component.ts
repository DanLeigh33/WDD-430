import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit{
  selectedDocument: Document;

  constructor(private docService: DocumentService) {

  }

  ngOnInit(): void {
    this.docService.selectedDocumentEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
  }
}

