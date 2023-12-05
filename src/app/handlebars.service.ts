// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import * as Handlebars from 'handlebars';

// @Injectable({
//   providedIn: 'root',
// })
// export class HandlebarsService {
//   constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

//   compileWidthJsonAndHtml( jsonData: any, htmlSource: string): SafeHtml {
//     const compiled = Handlebars.compile(htmlSource);
//     const mergedTemplate = compiled(jsonData);
    
//     return this.sanitizer.bypassSecurityTrustHtml(mergedTemplate);
//   }

//   compile(template: string): (context: any) => SafeHtml {
//     const compiled = Handlebars.compile(template);
//     return (context: any) => this.sanitizer.bypassSecurityTrustHtml(compiled(context));
//   }
//   loadTemplate(templateUrl: string): Promise<string> {
//     return this.http.get(templateUrl, { responseType: 'text' }).toPromise();
//   }
// }
