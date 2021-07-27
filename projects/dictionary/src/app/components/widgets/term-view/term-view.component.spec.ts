import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermViewComponent } from './term-view.component';

describe('TermViewComponent', () => {
  let component: TermViewComponent;
  let fixture: ComponentFixture<TermViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
