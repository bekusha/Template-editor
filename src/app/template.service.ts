// template.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Template } from './model/template.model';

export interface TemplateResponse {
  templates: Template[];
}

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private apiUrl = 'https://templates-api3.onrender.com/templates'; 
  

  constructor(private http: HttpClient) {}

  getAllTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.apiUrl}/list`);
  }

  createTemplate(template: Template): Observable<any> {
   console.log('template from service',template)
    return this.http.post<Template>(`${this.apiUrl}`, template);
  }

  updateTemplate(id: string, template: Template): Observable<Template> {
    console.log(template)
    return this.http.put<Template>(`${this.apiUrl}/${id}`, template);
  }

  deleteTemplate(id: string): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  findOne(id: string): Observable<string> {
    const template = this.http.get(`${this.apiUrl}/${id}/html`, { responseType: 'text' });
    return template;
  }

 
}
