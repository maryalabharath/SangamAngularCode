import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingchitpaymentComponent } from './pendingchitpayment.component';

describe('PendingchitpaymentComponent', () => {
  let component: PendingchitpaymentComponent;
  let fixture: ComponentFixture<PendingchitpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingchitpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingchitpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
