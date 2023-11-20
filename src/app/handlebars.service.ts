import { Injectable } from '@angular/core';
import * as Handlebars from 'handlebars';

@Injectable({
  providedIn: 'root',
})
export class HandlebarsService {
  compile(template: string): (context: any) => string {
    return Handlebars.compile(template);
  }
}