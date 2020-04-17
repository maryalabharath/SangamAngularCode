import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitpaymenthistoryComponent } from './chitpaymenthistory.component';

describe('ChitpaymenthistoryComponent', () => {
  let component: ChitpaymenthistoryComponent;
  let fixture: ComponentFixture<ChitpaymenthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitpaymenthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitpaymenthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
