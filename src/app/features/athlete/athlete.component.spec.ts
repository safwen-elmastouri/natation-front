import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteComponent } from './athlete.component';

describe('AthleteComponent', () => {
  let component: AthleteComponent;
  let fixture: ComponentFixture<AthleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
