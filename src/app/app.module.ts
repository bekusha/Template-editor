import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplatesListComponent } from './templates-list/templates-list.component';
// import { HandlebarsTemplateDetailComponent } from './handlebars-template-detail/handlebars-template-detail.component';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './safe-html.pipe';
@NgModule({
  declarations: [
    AppComponent,
    
    TemplatesListComponent,
    // 
    
    TemplateDialogComponent,
         TemplatePreviewComponent,
         SafeHtmlPipe,
    
   
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
