import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDescriptionsComponent } from './app-descriptions.component';

describe('AppDescriptionsComponent', () => {
  let component: AppDescriptionsComponent;
  let fixture: ComponentFixture<AppDescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDescriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
