import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimmersOverviewComponent } from './swimmers-overview.component';

describe('SwimmersOverviewComponent', () => {
  let component: SwimmersOverviewComponent;
  let fixture: ComponentFixture<SwimmersOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwimmersOverviewComponent]
    });
    fixture = TestBed.createComponent(SwimmersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
