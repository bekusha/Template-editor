import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { HandlebarsTemplateDetailComponent } from './handlebars-template-detail/handlebars-template-detail.component';


const routes: Routes = [
  { path: '', component: TemplatesListComponent },
  { path: 'templates/:id', component: HandlebarsTemplateDetailComponent },
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports:[RouterModule]
})
export class AppRoutingModule { }
