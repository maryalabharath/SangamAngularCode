import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnjumanmemregistrationComponent } from './anjumanmemregistration.component';

describe('AnjumanmemregistrationComponent', () => {
  let component: AnjumanmemregistrationComponent;
  let fixture: ComponentFixture<AnjumanmemregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnjumanmemregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnjumanmemregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
