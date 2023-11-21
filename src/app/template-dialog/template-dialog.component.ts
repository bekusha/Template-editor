// template-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TemplateService } from '../template.service';
import { Template } from '../model/template.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HandlebarsService } from '../handlebars.service';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css'],
})
export class TemplateDialogComponent {
  jsonData:any ;
  safeHtmlData: SafeHtml;


  constructor(
    public dialogRef: MatDialogRef<TemplateDialogComponent>,
    private templateService: TemplateService 
  ) {}
 
 
  saveTemplate() {
    const templateData = JSON.parse(this.jsonData); 
    const { name, content } = templateData;
  
    const template: Template = {
      name: name,
      content: content,
    };
  
    this.templateService.createTemplate(template).subscribe({
      next: (createdTemplate) => {
        console.log('Template created:', createdTemplate);
        this.dialogRef.close({ jsonData: createdTemplate });
      },
      error: (error) => {
        console.error('Error creating template:', error);
        // Handle errors as needed
      },
      complete: () => {
        console.log('Save template request completed.');
      },
    });
  }
  
  
  

  closeDialog(){
    this.dialogRef.close();
  }
}
