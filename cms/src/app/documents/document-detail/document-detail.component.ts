import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/win-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
  document: Document;
  nativeWindow: any;

  constructor(private docService: DocumentService,
    private windowRefService: WindRefService, 
    private router: Router,
    private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.document = this.docService.getDocument(params['id']);
      }
    )

    this.nativeWindow = this.windowRefService.getNativeWindow()
  }

  onView() {
    if (this.document.url){
      this.nativeWindow.open(this.document.url)
    }
  }

  onDelete() {
    this.docService.deleteDocument(this.document);
    this.router.navigate(['..'], {relativeTo: this.route});
 }
}
