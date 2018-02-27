import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BballComponent } from './bball.component';

describe('BballComponent', () => {
  let component: BballComponent;
  let fixture: ComponentFixture<BballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
