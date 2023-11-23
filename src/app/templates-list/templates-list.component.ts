import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '../template.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplateDialogComponent } from '../template-dialog/template-dialog.component';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css'],
})
export class TemplatesListComponent implements OnInit {
  templates: any[] = [];
  filteredTemplates: any[] = [];
  searchTerm: string = '';
  

  constructor(private router: Router, private templateService: TemplateService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAndFilterTemplates();
  }


  loadAndFilterTemplates() {
    this.templateService.getAllTemplates().subscribe({
  next: (data) => {
    this.templates = data;
    this.filterTemplates();
  },
  error: (error) => {
    console.error('Error loading templates:', error);
  }
});
  
  }

  editTemplate(id: string) {
    const templateToEdit = this.templates.find((template) => template._id === id);

    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        mode: 'edit',
        templateData: templateToEdit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAndFilterTemplates(); 
    });
  }

  deleteTemplate(id: string) {
    this.templateService.deleteTemplate(id).subscribe(
      () => {
        this.loadAndFilterTemplates();
        console.log('Template deleted successfully');
      },
      (error) => {
        console.error('Error deleting template:', error);
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
      data: {
        mode: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.jsonData !== undefined) {
        console.log('Dialog result:', result.jsonData);
        this.loadAndFilterTemplates();
      } else {
        console.log('Dialog closed without saving');
      }
    });
  }

  searchTemplates() {
    this.filterTemplates();
  }

  filterTemplates() {
    if (this.searchTerm.trim() === '') {
      this.filteredTemplates = this.templates.slice();
    } else {
      this.filteredTemplates = this.templates
        .filter((template) => template.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
