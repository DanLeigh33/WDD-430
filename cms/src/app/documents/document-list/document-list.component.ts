import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document("1", "Approval Notice", "A notice of approval regarding...", "www.something.com", []),
    new Document("1", "Dismissal Notice", "A notice of dismissal regarding...", "www.something.com", []),
    new Document("1", "Late Notice", "A notice of late retrieval regarding...", "www.something.com", []),
    new Document("1", "Class Slip", "A slip notifying the present staff of a series of absences...", "www.something.com", []),
    new Document("1", "Secondary Placements", "All placements regarding last week Saturdays meets...", "www.something.com", [])
  ];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
