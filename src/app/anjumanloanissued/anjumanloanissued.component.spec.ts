import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnjumanloanissuedComponent } from './anjumanloanissued.component';

describe('AnjumanloanissuedComponent', () => {
  let component: AnjumanloanissuedComponent;
  let fixture: ComponentFixture<AnjumanloanissuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnjumanloanissuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnjumanloanissuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
