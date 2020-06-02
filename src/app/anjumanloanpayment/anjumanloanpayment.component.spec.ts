import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnjumanloanpaymentComponent } from './anjumanloanpayment.component';

describe('AnjumanloanpaymentComponent', () => {
  let component: AnjumanloanpaymentComponent;
  let fixture: ComponentFixture<AnjumanloanpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnjumanloanpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnjumanloanpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
