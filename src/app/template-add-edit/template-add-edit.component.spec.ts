import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddEditComponent } from './template-add-edit.component';

describe('TemplateAddEditComponent', () => {
  let component: TemplateAddEditComponent;
  let fixture: ComponentFixture<TemplateAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateAddEditComponent]
    });
    fixture = TestBed.createComponent(TemplateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
