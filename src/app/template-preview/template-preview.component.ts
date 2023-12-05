import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateService } from '../template.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { Template } from '../model/template.model';


@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.css'],
})
export class TemplatePreviewComponent {
  previewHtml: SafeHtml;
  // safeHtmlData: any;
  

  constructor(
    public dialogRef: MatDialogRef<TemplatePreviewComponent>,
    // private templateService: TemplateService,
  
    private _sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: { previewHtml: string, safe: Template } 
  ) {
    this.previewHtml = this._sanitizer.bypassSecurityTrustHtml(data.previewHtml) as string;
  }

  

  closePreview() {
    this.dialogRef.close();
  }

 
}
