import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditDialogComponent } from './template-edit-dialog.component';

describe('TemplateEditDialogComponent', () => {
  let component: TemplateEditDialogComponent;
  let fixture: ComponentFixture<TemplateEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateEditDialogComponent]
    });
    fixture = TestBed.createComponent(TemplateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
