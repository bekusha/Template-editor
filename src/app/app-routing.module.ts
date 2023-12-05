import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesListComponent } from './templates-list/templates-list.component';



const routes: Routes = [
  { path: '', component: TemplatesListComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports:[RouterModule]
})
export class AppRoutingModule { }
