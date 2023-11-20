import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes } from '@angular/router';


import { TemplateManagementComponent } from './template-management/template-management.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { HandlebarsTemplateDetailComponent } from './handlebars-template-detail/handlebars-template-detail.component';


const routes: Routes = [
  { path: 'templates', component: TemplatesListComponent },
  { path: 'templates/:id', component: HandlebarsTemplateDetailComponent },
  { path: '', redirectTo: '/templates', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
