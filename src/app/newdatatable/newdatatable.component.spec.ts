import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdatatableComponent } from './newdatatable.component';

describe('NewdatatableComponent', () => {
  let component: NewdatatableComponent;
  let fixture: ComponentFixture<NewdatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
