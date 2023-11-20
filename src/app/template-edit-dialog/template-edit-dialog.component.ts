import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TemplateService } from '../template.service';
import { TemplatesListComponent } from '../templates-list/templates-list.component';
import { Template } from '../model/template.model';
@Component({
  selector: 'app-template-edit-dialog',
  templateUrl: './template-edit-dialog.component.html',
  styleUrls: ['./template-edit-dialog.component.css']
})
export class TemplateEditDialogComponent {
  editedTemplate: Template;
  

  constructor(
    private templateService: TemplateService,
    public dialogRef: MatDialogRef<TemplateEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { templateId: string, name: string, content: string }
  ) {
    this.editedTemplate = { name: data.name, content: data.content 
    };
  }

  onSave(): void {
    this.templateService.updateTemplate(this.data.templateId, this.editedTemplate)
      .subscribe(
        () => {
          console.log('Template updated successfully');
          this.dialogRef.close();
          
          
        },
        (error) => {
          console.error('Error updating template:', error);
          // Handle the error as needed
        }
      );
  }
}
