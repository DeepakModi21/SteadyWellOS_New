import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentFollowUpsComponent } from './urgent-follow-ups.component';

describe('UrgentFollowUpsComponent', () => {
  let component: UrgentFollowUpsComponent;
  let fixture: ComponentFixture<UrgentFollowUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrgentFollowUpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentFollowUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
