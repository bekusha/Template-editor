import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '../template.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplateDialogComponent } from '../template-dialog/template-dialog.component';
import { Template } from '../model/template.model';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css'],
})
export class TemplatesListComponent implements OnInit {
  templates: any[] = [];
  filteredTemplates: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private templateService: TemplateService, private dialog: MatDialog, private clipboard: Clipboard) {}

  ngOnInit(): void {
    this.loadAndFilterTemplates();
  }

  copyApiLink(templateId: string){
    const apiLink = `http://localhost:3000/templates/${templateId}/html`;
    this.clipboard.copy(apiLink)
  }

  loadAndFilterTemplates() {
    this.templateService.getAllTemplates().subscribe({
      next: (data) => {
        this.templates = data;
        this.filterTemplates();
      },
      error: (error) => {
        console.error('Error loading templates:', error);
      },
    });
  }

  editTemplate(template: Template, id:string): void {
    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      data: { template, editMode:true, id }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      
      console.log('The dialog was closed', result);
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
    this.router.navigate(['/', id]);
  }

  addNewTemplate() {
    const dialogRef = this.dialog.open(TemplateDialogComponent, {
      width: '100%',
      disableClose: true,
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const jsonData = result?.jsonData ?? undefined;

      if (jsonData !== undefined) {
        console.log('Dialog result:', jsonData);
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
