import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnjumanviewmemberComponent } from './anjumanviewmember.component';

describe('AnjumanviewmemberComponent', () => {
  let component: AnjumanviewmemberComponent;
  let fixture: ComponentFixture<AnjumanviewmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnjumanviewmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnjumanviewmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
