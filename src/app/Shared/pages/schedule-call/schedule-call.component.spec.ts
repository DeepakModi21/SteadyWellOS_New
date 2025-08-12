import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCallComponent } from './schedule-call.component';

describe('ScheduleCallComponent', () => {
  let component: ScheduleCallComponent;
  let fixture: ComponentFixture<ScheduleCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
