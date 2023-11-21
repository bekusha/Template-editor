import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { TemplateManagementComponent } from './template-management/template-management.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { HandlebarsTemplateDetailComponent } from './handlebars-template-detail/handlebars-template-detail.component';

import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { TemplateEditDialogComponent } from './template-edit-dialog/template-edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    // TemplateManagementComponent,
    TemplatesListComponent,
    HandlebarsTemplateDetailComponent,
    
    TemplateDialogComponent,
    TemplateEditDialogComponent,
   
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
