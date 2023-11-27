// handlebars-template-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TemplateService } from '../template.service';
import * as Handlebars from 'handlebars';

@Component({
  selector: 'app-handlebars-template-detail',
  templateUrl: './handlebars-template-detail.component.html',
  styleUrls: ['./handlebars-template-detail.component.css'],
})
export class HandlebarsTemplateDetailComponent implements OnInit {
  templateId!: string;
  compiledHtml!: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.templateId = id !== null ? id : ''; 
    this.loadTemplate();
  }

  loadTemplate() {
    this.templateService.findOne(this.templateId).subscribe((template) => {
      const templateSource = template; 
      const compiledHtml = Handlebars.compile(templateSource)({});
      this.compiledHtml = this.sanitizer.bypassSecurityTrustHtml(compiledHtml);
    });
  }

  goBack() {
    this.router.navigate(['/templates']);
  }
}
