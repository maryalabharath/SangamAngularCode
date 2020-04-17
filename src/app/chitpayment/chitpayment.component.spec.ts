import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitpaymentComponent } from './chitpayment.component';

describe('ChitpaymentComponent', () => {
  let component: ChitpaymentComponent;
  let fixture: ComponentFixture<ChitpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
