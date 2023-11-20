// templates-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '../template.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplateDialogComponent } from '../template-dialog/template-dialog.component';
import { TemplateEditDialogComponent } from '../template-edit-dialog/template-edit-dialog.component';
@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css'],
})
export class TemplatesListComponent implements OnInit {
  templates: any[] = [];

  constructor(private router: Router, private templateService: TemplateService, private dialog: MatDialog) {}



  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates() {
    this.templateService.getAllTemplates().subscribe((data) => {
      this.templates = data;
    });
  }

  editTemplate(id: string) {
    const dialogRef = this.dialog.open(TemplateEditDialogComponent, {
      width: '400px',
      data: { templateId: id }, 
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.jsonData !== undefined) {
        console.log('Dialog result:', result.jsonData);
        this.loadTemplates(); 
      } else {
        console.log('Dialog closed without saving');
      }
    });
  }
  deleteTemplate(id: string) {
    this.templateService.deleteTemplate(id).subscribe(
      () => {
        console.log('Template deleted successfully');
        // Notify TemplateEditDialogComponent and any other component that needs to reload templates
        
      },
      (error) => {
        console.error('Error deleting template:', error);
        // Handle the error as needed
      }
    );
  }

  viewTemplate(id: string) {
    this.router.navigate(['/templates', id]);
  }

  addNewTemplate() {
    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.jsonData !== undefined) {
        console.log('Dialog result:', result.jsonData);
         
        this.templateService.createTemplate(result.jsonData)
        this.templateService.getAllTemplates()
        this.loadTemplates();
        
      } else {
        console.log('Dialog closed without saving');
        
      }
    });
  }

}
