
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
  sanitizer: any;

  constructor(
    private http: HttpClient,
    
  ) {}

  getAllTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.apiUrl}/list`);
  }

  createTemplate(template: Template): Observable<Template> {
    console.log("Template Service",template )
    return this.http.post<any>(`${this.apiUrl}/create`, template);
  }

  updateTemplate(template: any): Observable<any> {
    const id = template._id;
    return this.http.put<any>(`${this.apiUrl}/${id}`, template);
  }
  

  deleteTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findOne(id: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${id}/html`, { responseType: 'text' });
  }

  

 
}
