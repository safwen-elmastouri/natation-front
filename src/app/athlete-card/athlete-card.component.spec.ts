import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteCardComponent } from './athlete-card.component';

describe('AthleteCardComponent', () => {
  let component: AthleteCardComponent;
  let fixture: ComponentFixture<AthleteCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AthleteCardComponent]
    });
    fixture = TestBed.createComponent(AthleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
