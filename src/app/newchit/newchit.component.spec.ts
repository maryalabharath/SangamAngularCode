import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewchitComponent } from './newchit.component';

describe('NewchitComponent', () => {
  let component: NewchitComponent;
  let fixture: ComponentFixture<NewchitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewchitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewchitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
