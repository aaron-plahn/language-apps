import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListControlPanelComponent } from './list-control-panel.component';

describe('ListControlPanelComponent', () => {
  let component: ListControlPanelComponent;
  let fixture: ComponentFixture<ListControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
