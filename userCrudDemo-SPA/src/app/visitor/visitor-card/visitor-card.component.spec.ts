import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCardComponent } from './visitor-card.component';

describe('VisitorCardComponent', () => {
  let component: VisitorCardComponent;
  let fixture: ComponentFixture<VisitorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
