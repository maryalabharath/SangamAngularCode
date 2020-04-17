import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermemeberComponent } from './registermemeber.component';

describe('RegistermemeberComponent', () => {
  let component: RegistermemeberComponent;
  let fixture: ComponentFixture<RegistermemeberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistermemeberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistermemeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
