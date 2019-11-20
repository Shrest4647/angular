import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBillComponent } from './monthly-bill.component';

describe('MonthlyBillComponent', () => {
  let component: MonthlyBillComponent;
  let fixture: ComponentFixture<MonthlyBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
