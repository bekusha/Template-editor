import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TemplateService } from '../template.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import * as Handlebars from 'handlebars';
import { TemplatePreviewComponent } from '../template-preview/template-preview.component';
import { Template } from '../model/template.model';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css'],
})
export class TemplateDialogComponent implements OnInit{
  jsonData: string;
  htmlSource: string;
  safeHtmlData: SafeHtml;
  name: string;
  template: Template = {};
  editMode = false;
  id:string;

  constructor(
    public dialogRef: MatDialogRef<TemplateDialogComponent>,
    private templateService: TemplateService,
    private _sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.template) {
      this.editMode = true;
      this.name = data.template.name;
      this.jsonData = data.template.jsonData;
      this.htmlSource = data.template.htmlSource;
      this.template = { ...data.template }; 
      
    }
  }
  

  ngOnInit(): void {
    this.templateService.getAllTemplates()
    this.sharedService.templateListUpdated$.subscribe(() => {
      
    });
  }

  
  saveTemplate(htmlSource: string, name: string) {
    if (this.editMode) {
      this.template.name = name;
      this.template.htmlSource = htmlSource;
      
      this.templateService.updateTemplate(this.template).subscribe(
        (response) => {
          this.dialogRef.close();
          this.sharedService.triggerTemplateListUpdate();
        },
        (error) => {
          console.error('Error updating template:', error);
        }
      );
    } else {
      this.template.name = name;
      this.template.htmlSource = htmlSource;
      this.templateService.createTemplate(this.template).subscribe({
        next: (createdTemplate) => {
          console.log('Template created:', createdTemplate);
            this.dialogRef.close();
            this.sharedService.triggerTemplateListUpdate();
        },
        error: (error) => {
          console.error('Error creating template:', error);
        }
      });
    }
  }
  
  
  


 previewTemplate() {
  const templateData = JSON.parse(this.jsonData);
  const compiledTemplate = Handlebars.compile(this.htmlSource)(templateData);
  this.safeHtmlData = this._sanitizer.bypassSecurityTrustHtml(compiledTemplate);
  const dialogRef = this.dialog.open(TemplatePreviewComponent, {
    data: { previewHtml: this.safeHtmlData, jsonData: templateData },
    width: '100%',
    height: '100%',
  });
}


  closeDialog() {
    this.dialogRef.close();
  }

  saveName(name: string) {
    this.name = name;
  }

  saveHtmlSource() {
    // Add any additional logic if needed
  }

  saveJsonData() {
    // Add any additional logic if needed
  }
}
