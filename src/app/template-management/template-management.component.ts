import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template.service';
import { HandlebarsService } from '../handlebars.service';
import { Template } from '../model/template.model';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.css']
})
export class TemplateManagementComponent implements OnInit {
  templates: Template[] = [];
  compiledTemplates: { [key: string]: (() => string) } = {};

  constructor(
    private templateService: TemplateService,
    private handlebarsService: HandlebarsService
  ) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates() {
    this.templateService.getAllTemplates().subscribe((data) => {
      this.templates = data;
      this.compileTemplates();
    });
  }

  compileTemplates() {
    this.templates.forEach((template) => {
      this.compiledTemplates[template.id] = () => this.handlebarsService.compile(template.name)({});
    });
  }

  renderTemplate(templateId: string) {
    if (this.compiledTemplates[templateId]) {
      console.log(this.compiledTemplates[templateId]())
      return this.compiledTemplates[templateId]() || '';
    } else {
      return '';
    }
  }
}
