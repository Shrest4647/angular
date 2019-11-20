import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBIllComponent } from './view-bill.component';

describe('ViewBIllComponent', () => {
  let component: ViewBIllComponent;
  let fixture: ComponentFixture<ViewBIllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBIllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBIllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
