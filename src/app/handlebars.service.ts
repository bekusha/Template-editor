import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Handlebars from 'handlebars';

@Injectable({
  providedIn: 'root',
})
export class HandlebarsService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  compile(template: string): (context: any) => SafeHtml {
    const compiled = Handlebars.compile(template);
    return (context: any) => this.sanitizer.bypassSecurityTrustHtml(compiled(context));
  }

  loadTemplate(templateUrl: string): Promise<string> {
    return this.http.get(templateUrl, { responseType: 'text' }).toPromise();
  }
}
