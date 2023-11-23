import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateService } from '../template.service';
import {  SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css'],
})
export class TemplateDialogComponent {
  jsonData: string;
  safeHtmlData: SafeHtml;
  mode: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<TemplateDialogComponent>,
    private templateService: TemplateService,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;

    if (this.mode === 'edit') {
      this.jsonData = JSON.stringify(data.templateData, null, 2);
    } else if (this.mode === 'add') {
      this.jsonData = '';
    }
  }

  saveTemplate() {
    console.log(this.jsonData)
    try {
      const templateData = JSON.parse(this.jsonData);
      
      if (this.mode === 'edit') {
        this.templateService.updateTemplate(templateData._id, templateData).subscribe({
          next: (updatedTemplate) => {
            console.log('Template updated:', updatedTemplate);
            this.dialogRef.close({ jsonData: updatedTemplate });
          },
          error: (error) => {
            console.error('Error updating template:', error);
          },
          complete: () => {
            console.log('Update template request completed.');
          },
        });
      } else if (this.mode === 'add') {
        this.templateService.createTemplate(templateData).subscribe({
          next: (createdTemplate) => {
            console.log('Template created:', createdTemplate);
            this.dialogRef.close({ jsonData: createdTemplate });
          },
          error: (error) => {
            console.error('Error creating template:', error);
          },
          complete: () => {
            console.log('Save template request completed.');
          },
        });
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
